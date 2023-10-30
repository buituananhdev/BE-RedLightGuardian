export { default as swaggerConfig } from './swagger.config.js'
import { config } from 'dotenv';
config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, JWT_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_EMAIL } = process.env

export const port = PORT || 3000;
export const dbHost = DB_HOST;
export const dbPort = DB_PORT;
export const dbUser = DB_USER;
export const dbPassword = DB_PASSWORD;
export const dbDatabase = DB_DATABASE;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const smtpHost = SMTP_HOST;
export const smtpUser = SMTP_USER;
export const smtpPass = SMTP_PASS;
export const smtpPort = SMTP_PORT;
export const smtpEmail = SMTP_EMAIL;

export const prefix = '/api';
export const specs = "/docs";