BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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


CREATE TABLE tags (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  tag text NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE organizations(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,

  PRIMARY KEY (id)
);

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

CREATE TABLE tagmap (
  event_id uuid NOT NULL,
  tag_id uuid NOT NULL,

  PRIMARY KEY (event_id, tag_id),

  FOREIGN KEY (event_id) REFERENCES events(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT,
  FOREIGN KEY (tag_id) REFERENCES tags(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
);


COMMIT;
