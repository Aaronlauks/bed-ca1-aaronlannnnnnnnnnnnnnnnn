const pool = require('../services/db');

module.exports.selectAll = (callback) => {
  const SQLSTATMENT = `
    SELECT * FROM User;
    `;

  pool.query(SQLSTATMENT, callback);
}

module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO User (username)
    SELECT ?
    WHERE NOT EXISTS (
        SELECT 1 FROM User WHERE username = ?
    );
    `;
  const VALUES = [data.username, data.username];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.selectById = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
  const VALUES = [data.id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.updateById = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE User
  SET username = ?
  WHERE user_id = ?
  `;
  const VALUES = [data.username, data.id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.deleteById = (data, callback) => {
  const SQLSTATMENT = `
    DELETE FROM User 
    WHERE user_id = ?;
    `;
  const VALUES = [data.id];

  pool.query(SQLSTATMENT, VALUES, callback);
}