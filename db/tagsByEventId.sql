SELECT tags.id AS id, tags.tag AS tag
FROM tags
INNER JOIN tagmap
ON tagmap.tag_id = tags.id
INNER JOIN events
ON events.id = tagmap.event_id
WHERE events.id = $1;
