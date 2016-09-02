BEGIN;

CREATE TABLE status(
  id serial NOT NULL,
  status text NOT NULL,

  PRIMARY KEY (id)
);

INSERT INTO status (status)
VALUES
  ('pending'),
  ('approved'),
  ('removed');

COMMIT;
