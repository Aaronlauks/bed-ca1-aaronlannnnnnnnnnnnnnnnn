const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User, UserAnswer, SurveyQuestion;

CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT,
  points INT DEFAULT 0
);
CREATE TABLE UserAnswer (
  answer_id INT PRIMARY KEY AUTO_INCREMENT,
  answered_question_id INT NOT NULL,
  participant_id INT NOT NULL,
  answer BOOL NOT NULL,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  additional_notes TEXT
);
CREATE TABLE SurveyQuestion (
  question_id INT PRIMARY KEY AUTO_INCREMENT,
  creator_id INT NOT NULL,
  question TEXT NOT NULL
);
 
INSERT INTO SurveyQuestion (creator_id, question) VALUES
(1, 'Do you buy fruits from FC6?'),
(1, 'Is the fried chicken at FC5 salty?'),
(2, 'Did you recycled any e-waste?'),
(2, 'Do you turn off lights and appliances when not in use?'),
(2, 'Have you visit the cafe at Moberly?');
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});