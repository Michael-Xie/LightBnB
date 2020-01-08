INSERT INTO reservations
  (guest_id, property_id, start_date, end_date)
VALUES
  (1, 1, '2018-09-11', '2018-09-26'),
  (2, 2, '2019-01-04', '2019-02-01'),
  (3, 3, '2021-10-01', '2021-10-14');

INSERT INTO users
  (name, email, password)
VALUES
  ('Aevin Sanders', 'aristanjacobs@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Bva Harrison', 'bllisonjackson@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Cloyd Jefferson', 'csherpoole@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties
  (
  title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code)
VALUES
  (
    'A', 'description', 1, 'https://images.pexels.com/photos/2088258/table-dining-room-chair-dining-area-2088258.jpeg', 'https://images.pexels.com/photos/2088258/table-dining-room-chair-dining-area-2088258.jpeg?auto=compress&cs=tinysrgb&h=350', 2438, 8, 2, 1, true, 'Prince Edward Island', 'Charlottetown', 'Canada', '1716 Misih Highway', '48752'),
  (
    'B', 'description', 2, 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350', 36317, 1, 3, 0, true, 'Quebec', 'Chicoutimi', 'Canada', '1950 Zujcol Path', '19755'),
  (
    'C', 'description', 3, 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&h=350', 34565, 0, 1, 1, true, 'Newfoundland And Labrador', 'Paradise', 'Canada', '1848 Cuzo Trail', '08409');


INSERT INTO reservations
  (
  id, guest_id, property_id, start_date, end_date)
VALUES
  (
    1, 1, 1, '2022-09-30', '2022-10-15');
INSERT INTO reservations
  (
  id, guest_id, property_id, start_date, end_date)
VALUES
  (
    2, 2, 2, '2021-04-30', '2021-05-18');
INSERT INTO reservations
  (
  id, guest_id, property_id, start_date, end_date)
VALUES
  (
    3, 3, 3, '2021-08-22', '2021-08-23');


INSERT INTO property_reviews
  (
  guest_id, property_id, reservation_id, rating, message)
VALUES
  (
    1, 1, 1, 4, 'Sigkez amafozuz zidak cirazke giikeak lazup cefumzeb ohefcob vugsi vudavi ahevi awogi tagjowos.');
INSERT INTO property_reviews
  (
  guest_id, property_id, reservation_id, rating, message)
VALUES
  (
    2, 2, 2, 5, 'Filin alforec pad sevopa ej jesebfuh tap ma ajafihjoc pujawoso kuez zitu sebfal zialuti jool rudpi gogofiri da.');
INSERT INTO property_reviews
  (
  guest_id, property_id, reservation_id, rating, message)
VALUES
  (
    3, 3, 3, 3, 'Hawapel pasale udmupnej co uzfos novuhig bilad dedgure vim renfef soumi suti bop.');
