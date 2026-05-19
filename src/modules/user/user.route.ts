import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

const USER_ROLE = {
  admin: "admin",
  agent: "agent",
  user: "user",
} as const;

router.post("/", userController.createUser);

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.agent),
  userController.getAllUser,
);

router.get("/:id", userController.getSingleUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export const userRoute = router;
