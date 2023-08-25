CREATE DATABASE yoga_app;

CREATE TABLE favorite_poses(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255) ,
    pose_name VARCHAR(255),
    date VARCHAR(300)
);

CREATE TABLE users(
    email VARCHAR(255) UNIQUE,
    hashed_password VARCHAR(255)
);

--  UPDATE favorite_poses SET date = 'Wed May 17 2023 11:59:36 GMT-0600 (Mountain Daylight Time)' WHERE user_email = 'test@test.com';

-- ____________STEPS TO ACCESS DATABASE____________

-- CHECK STATUS of postgresql server : 
--     brew services list

-- START SERVER if not running: 
--     brew services start postgresql@14

-- LAUNCH CLI:
--     psql -U user1 -d yoga_app

-- CONNECT TO DATABASE:
-- psql -U user1 -d yoga_app


-- SELECT * FROM yoga_app;
-- SELECT * FROM users;
-- SELECT * FROM favorite_poses;

-- INSERT INTO users(email, hashed_password) VALUES('test@test.com', 'testpass');
--  INSERT INTO favorite_poses(id, user_email, pose_name) VALUES('1','test@test.com', 'crow');



-- Retrieve data: To retrieve a user's favorite poses, you can use the SELECT statement with a WHERE clause
--  to filter the results based on the user's ID. For example, to retrieve all favorite poses for user ID 1:

--  SELECT * FROM favorite_poses WHERE user_id = 1;

-- Update and delete data: You can use the UPDATE and DELETE
--  statements to modify or remove favorite poses. For example, to update a pose's name:

-- UPDATE favorite_poses SET pose_name = 'Mountain Pose' WHERE id = 1;

-- DELETE FROM favorite_poses WHERE id = 2;
