CREATE TABLE IF NOT EXISTS betatesters (
    betatesters_id serial PRIMARY KEY,
    user_id int,
    firstname varchar(80) NOT NULL,
    name varchar(80) NOT NULL,
    dob date NOT NULL,
    adress varchar(80) NOT NULL,
    phone int NOT NULL,
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
);