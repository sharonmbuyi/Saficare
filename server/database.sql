CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE jwtbase;
 
 CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT @,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_password TEXT NOT NULL
 );

 SELECT * FROM users; 

 INSERT INTO users (users_name, user_email,user_password) VALUES ('sharon','sharonmbuyi0@gmail.com','sharon');

--psql -U postgres
--\c jwtbase
--\dt 
--heroku pg:psql