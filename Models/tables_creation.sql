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

CREATE TABLE IF NOT EXISTS logs (
    log_id serial PRIMARY KEY,
    user_id int NOT NULL,
    user_email varchar(256) NOT NULL,
    log_message varchar(256)
);

CREATE TABLE IF NOT EXISTS contacts (
    contact_id serial PRIMARY KEY,
    user_id int,
    type varchar(80),
    message varchar(500),
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS betatesters (
    betatester_id serial PRIMARY KEY,
    user_id int,
    firstname varchar(80) NOT NULL,
    name varchar(80) NOT NULL,
    dob date NOT NULL,
    adress varchar(80) NOT NULL,
    phone int NOT NULL,
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS media_platform(
    media_platform_id serial PRIMARY KEY,
    name varchar(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS images(
    image_id serial PRIMARY KEY,
    name varchar(256) NOT NULL,
    content varchar NOT NULL,
    format varchar(256)
);

CREATE TABLE IF NOT EXISTS external_medias(
    external_media_id serial PRIMARY KEY,
    url varchar(256) NOT NULL,
    media_platform_id int,
    FOREIGN KEY (media_platform_id)
        REFERENCES media_platform (media_platform_id)
);

CREATE TABLE IF NOT EXISTS artists (
    artist_id serial PRIMARY KEY,
    name varchar(256) NOT NULL,
    description varchar(500),
    image_id int,
    external_media_id int,
    FOREIGN KEY (image_id)
        REFERENCES images (image_id),
    FOREIGN KEY (external_media_id)
        REFERENCES external_medias (external_media_id)
);

CREATE TABLE IF NOT EXISTS cities (
    city_id serial PRIMARY KEY,
    name varchar(256) NOT NULL,
    postal_code int NOT NULL
);

CREATE TABLE IF NOT EXISTS places (
    place_id serial PRIMARY KEY,
    name varchar(256) NOT NULL,
    description varchar(500),
    adress varchar(256),
    image_id int,
    external_media_id int,
    city_id int,
    FOREIGN KEY (image_id)
        REFERENCES images (image_id),
    FOREIGN KEY (external_media_id)
        REFERENCES external_medias (external_media_id),
    FOREIGN KEY (city_id)
        REFERENCES cities (city_id)
);

CREATE TABLE IF NOT EXISTS events (
    event_id serial PRIMARY KEY,
    author_id int NOT NULL,
    name varchar(256) NOT NULL,
    description varchar(500),
    banner_id int,
    display_map boolean NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    price float,
    FOREIGN KEY (author_id)
        REFERENCES users (user_id),
    FOREIGN KEY (banner_id)
        REFERENCES images (image_id)
);

CREATE TABLE IF NOT EXISTS events_artists(
    event_artist_id serial PRIMARY KEY,
    event_id int NOT NULL,
    artist_id int NOT NULL,
    FOREIGN KEY (event_id)
        REFERENCES events (event_id),
    FOREIGN KEY (artist_id)
        REFERENCES artists (artist_id)
);

CREATE TABLE IF NOT EXISTS events_places(
    event_place_id serial PRIMARY KEY,
    event_id int NOT NULL,
    place_id int NOT NULL,
    FOREIGN KEY (event_id)
        REFERENCES events (event_id),
    FOREIGN KEY (place_id)
        REFERENCES places (place_id)
);

CREATE TABLE IF NOT EXISTS events_images(
    event_image_id serial PRIMARY KEY,
    event_id int NOT NULL,
    image_id int NOT NULL,
    FOREIGN KEY (event_id)
        REFERENCES events (event_id),
    FOREIGN KEY (image_id)
        REFERENCES images (image_id)
);

CREATE TABLE IF NOT EXISTS events_external_medias(
    events_external_media_id serial PRIMARY KEY,
    event_id int NOT NULL,
    external_media_id int NOT NULL,
    FOREIGN KEY (event_id)
        REFERENCES events (event_id),
    FOREIGN KEY (external_media_id)
        REFERENCES external_medias (external_media_id)
);