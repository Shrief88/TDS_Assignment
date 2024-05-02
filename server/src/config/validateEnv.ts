import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str({ choices: ["development", "test", "production"] }),
  BASE_URL: str(),
  DATABASE_URL: str(),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
});

export default env;
