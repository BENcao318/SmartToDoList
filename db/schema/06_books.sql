DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  year_created SMALLINT NOT NULL,
  description TEXT,
  img VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE
);
