BEGIN;

CREATE TABLE organizations(
  id uuid NOT NULL,
  name text NOT NULL,
  description text,

  PRIMARY KEY (id)
);

COMMIT;
