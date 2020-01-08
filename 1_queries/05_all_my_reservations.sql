-- ** This wouldn't work as the uncommented
-- ** Possible reason is mismatching that occurred on property id for 
-- property_reviews and properties leading to a reservation could have multiple properties  

-- SELECT properties.id, title, cost_per_night, start_date--, AVG(rating) as average_rating
-- FROM reservations
--   JOIN properties ON (property_id = properties.id)
--   JOIN property_reviews ON (reservations.id = reservation_id)
--   JOIN users ON (reservations.guest_id = users.id)
-- WHERE end_date < now()::date AND users.id = 1
-- GROUP BY properties.id, reservations.id
-- ORDER BY start_date
-- LIMIT 10;


SELECT properties.id, title, cost_per_night, start_date, AVG(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;