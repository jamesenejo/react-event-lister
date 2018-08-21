import { config } from 'dotenv';

config();

const dbConfig = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        host: 'localhost',
        dialect: 'postgres'
    },
    test: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
        database: process.env.DB,
        host: 'localhost',
        dialect: 'postgres'
    },
    production: {
        use_env_variable: process.env.DATABASE_URL
    }
};

export default dbConfig;
