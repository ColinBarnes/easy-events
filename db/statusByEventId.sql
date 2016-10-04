SELECT status.status as status
FROM status
INNER JOIN events
ON events.status_id = status.id
WHERE events.id = $1;
