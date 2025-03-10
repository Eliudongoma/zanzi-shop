import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import dotenv from 'dotenv';
import path from 'path';

// Get directory name equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
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
  PORT: parseInt(getEnvVar("PORT", "3000"), 10),
  MONGO_URI: getEnvVar("MONGO_URI"),
};

export default config;
