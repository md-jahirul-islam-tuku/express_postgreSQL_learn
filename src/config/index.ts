import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.CONNECTIONSTRING,
  port: process.env.PORT,
  jwt_secret: process.env.SECRET,
  refresh_secret: process.env.REFRESHSECRET,
  access_token_expire: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expire: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

export default config;
