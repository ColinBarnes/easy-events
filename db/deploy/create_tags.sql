BEGIN;

CREATE TABLE tags (
  id uuid NOT NULL,
  tag text NOT NULL,

  PRIMARY KEY (id)
);

COMMIT;
