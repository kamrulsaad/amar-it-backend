import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env'),
});

export default {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    client_url: process.env.CLIENT_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
};
