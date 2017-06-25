
CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  make TEXT,
  model TEXT,
  year INTEGER

);

CREATE TABLE prices (
  id SERIAL PRIMARY KEY,
  car_id INTEGER,
  year INTEGER,
  price INTEGER
);

CREATE INDEX ON prices (car_id);
