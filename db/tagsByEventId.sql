SELECT tags.id AS tag_id, tags.tag AS tag, events.id AS event_id
FROM tags
INNER JOIN tagmap
ON tagmap.tag_id = tags.id
INNER JOIN events
ON events.id = tagmap.event_id
WHERE event.id = $1;
