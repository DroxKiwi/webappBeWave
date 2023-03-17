CREATE TABLE IF NOT EXISTS logs (
    log_id serial PRIMARY KEY,
    user_email varchar(256) NOT NULL,
    log_message varchar(256)
);