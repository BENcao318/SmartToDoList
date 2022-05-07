DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  price FLOAT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rating TEXT,
  img VARCHAR(255) NOT NULL,
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE
);