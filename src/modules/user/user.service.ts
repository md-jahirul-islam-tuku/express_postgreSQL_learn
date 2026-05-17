import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users(
      name,
      email,
      password,
      age
    )
    VALUES($1,$2,$3,$4)
    RETURNING id, name, email, age
    `,
    [name, email, hashedPassword, age],
  );
  return result;
};

const getAllUserFromDB = async () => {
  const result = await pool.query(`SELECT
      id,
      name,
      email,
      age,
      is_active,
      created_at,
      updated_at
    FROM users`);
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      email,
      age,
      is_active,
      created_at,
      updated_at
    FROM users
    WHERE id = $1
    `, [id]);
  return result;
};

const updateUserIntoDB = async (payload: IUser, id: string) => {
  const { name, password, age, is_active } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
      UPDATE users 
      SET 
      name=COALESCE($1,name),
      password=COALESCE($2,password),
      age=COALESCE($3,age),
      is_active=COALESCE($4,is_active)

      WHERE id=$5 RETURNING id, name, email, age, is_active
      `,
    [name, hashedPassword, age, is_active, id],
  );
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1
    `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
