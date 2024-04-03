import { config } from 'dotenv'
config({ path: `.env` })

export const {
  JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  DB_URL,
  PORT
} = process.env
