BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tags (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  tag text NOT NULL,

  PRIMARY KEY (id)
);

COMMIT;
