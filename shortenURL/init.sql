-- init.sql
CREATE TABLE IF NOT EXISTS urls
(
    id SERIAL PRIMARY KEY,
    original_url VARCHAR(255),
    short_url VARCHAR(255)
);
