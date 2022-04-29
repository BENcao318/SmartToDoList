DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  price INTEGER  NOT NULL DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  img VARCHAR(255) NOT NULL,
  task_id INTEGER REFERENCES tasks(id)
);
