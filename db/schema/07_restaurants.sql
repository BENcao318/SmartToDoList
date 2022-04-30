DROP TABLE IF EXISTS restaurants CASCADE;
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  task_id INTEGER REFERENCES tasks(id),
  rating SMALLINT NOT NULL DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  img VARCHAR(255) NOT NULL
);