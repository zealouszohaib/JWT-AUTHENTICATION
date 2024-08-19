CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE DATABASE Backend;

"INSERT INTO users (fuser_name,luser_name,org_name, user_email, user_password) VALUES ($1, $2, $3,$4,$5) RETURNING *",


CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fuser_name TEXT NOT NULL,
    luser_name TEXT NOT NULL,
    org_name  TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (fuser_name,luser_name,org_name, user_email, user_password) VALUES ('Bob','mod','tiba' ,'bob@email.com', 'bob');
INSERT INTO users (fuser_name,luser_name,org_name, user_email, user_password) VALUES ('zohaib','hanif','webox' ,'zohaib@email.com', 'zohaib');

--psql -U postgres
--\c jwttotorial
--\dt
--heroku pg:psql