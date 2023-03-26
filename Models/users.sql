CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    pseudo varchar(80) UNIQUE NOT NULL,
    email varchar(256) UNIQUE NOT NULL,
    token varchar(80),
    salt varchar(80),
    hash varchar(80),
    role varchar(80) NOT NULL,
    preferences text[]
);