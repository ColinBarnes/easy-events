BEGIN;


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
