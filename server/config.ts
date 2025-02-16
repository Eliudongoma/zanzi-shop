import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
}

// Validate required environment variables
const getEnvVar = (key: keyof EnvConfig, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue!;
};

const config: EnvConfig = {
  PORT: parseInt(getEnvVar("PORT", "5000"), 10),
  MONGO_URI: getEnvVar("MONGO_URI"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
};

export default config;
