BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE events(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  status_id serial NOT NULL,
  title text,
  description text,
  organization_id uuid,
  start_time timestamptz,
  end_time timestamptz,
  address text,
  city text,
  state text,
  postal_code text,
  min_people int,
  max_people int,

  PRIMARY KEY (id),

  FOREIGN KEY (organization_id) REFERENCES organizations(id)
    ON UPDATE RESTRICT -- don't update event if org id changes
    ON DELETE RESTRICT, -- can't delete org if there is an event for the org

  FOREIGN KEY (status_id) REFERENCES status(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
);

COMMIT;
