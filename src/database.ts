import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client;

const { POSTGRES_HOST,
        POSTGRES_DB,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_TEST_DB,
        ENV
} = process.env;

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

console.log(`ENV = \x1b[35m${ENV}\x1b[0m`);

export default client;