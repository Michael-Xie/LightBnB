const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;
  const values = [email];
  return pool.query(queryString, values)
    .then((res) => res.rows[0] || null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;
  const values = [id];
  return pool.query(queryString, values)
    .then((res) => res.rows[0] || null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
  INSERT INTO users (name, password, email) VALUES (
    $1, $2, $3
  ) RETURNING *;
  `;
  const values = [user.name, user.password, user.email];
  return pool.query(queryString, values)
    .then((res) => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, reservations.*, AVG(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < Now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;
  const values = [guest_id, limit];
  return pool.query(queryString, values)
    .then((res) => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  let optionsLeft = Object.keys(options).filter((key) => options[key]!=='');

  optionsLeft.forEach((key, i) => {
    let prependString = "";
    if (i === 0 && key !== 'minimum_rating') {
      prependString = "WHERE";
    }
    if (i !== 0) {
      prependString = "AND";
    }

    if (key === 'city') {
      queryParams.push(`%${options.city}%`);
      queryString += `${prependString} city ILIKE $${queryParams.length} `;
    }

    if (key === 'owner_id') {
      queryParams.push(options.owner_id);
      queryString += `${prependString} owner_id = $${queryParams.length} `;
    }

    if (key === 'minimum_price_per_night') {
      queryParams.push(parseFloat(options.minimum_price_per_night)*100);
      queryString += `${prependString} cost_per_night >= $${queryParams.length} `;
    }

    if (key === 'maximum_price_per_night') {
      queryParams.push(parseFloat(options.maximum_price_per_night)*100);
      queryString += `${prependString} cost_per_night <= $${queryParams.length} `;
    }
  });
  
  queryString += `GROUP BY properties.id`;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING  avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
  const queryParams = [];
  let queryFields = '';
  let queryValues = '';

  Object.keys(property).forEach((key, i) => {
    if (property[key]) {
      queryParams.push(property[key]);
      queryFields = i === Object.keys(property).length - 1? queryFields + `${key}`: queryFields + `${key}, `;
      queryValues = i === Object.keys(property).length - 1? queryValues + `$${queryParams.length}`: queryValues + `$${queryParams.length}, `;
    }
  });

  const queryString = `
    INSERT INTO properties (${queryFields}) VALUES (${queryValues}) RETURNING *;
  `;

  //  (name, password, email) VALUES (
  //   $1, $2, $3
  // ) RETURNING *;
  // `;
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then((res) => res.rows[0]);
}
exports.addProperty = addProperty;
