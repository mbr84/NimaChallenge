DROP DATABASE IF EXISTS nima;
CREATE DATABASE nima;

\c nima;

CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  make TEXT,
  model TEXT,
  year INTEGER

);

CREATE TABLE prices (
  id INTEGER,
  year INTEGER,
  price INTEGER

);
