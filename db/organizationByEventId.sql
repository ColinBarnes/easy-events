SELECT o.id AS id, o.name AS name, o.description AS description
FROM organizations AS o
INNER JOIN events
ON events.organization_id = o.id
WHERE events.id = $1;
