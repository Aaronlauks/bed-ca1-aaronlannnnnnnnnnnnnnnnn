const pool = require('../services/db');

// POST
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO surveyquestion (creator_id, question)
        VALUES (?, ?);
        `;
    const VALUES = [data.id, data.question];

    pool.query(SQLSTATMENT, VALUES, callback);
}
module.exports.insertSingleAnswer = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO useranswer (answered_question_id, participant_id, answer, creation_date, additional_notes)
        VALUES (?, ?, ?, ?, ?);
        `;
    const VALUES = [data.question_id, data.user_id, data.answer, data.creation_date, data.additional_notes];

    pool.query(SQLSTATMENT, VALUES, callback);
}
// GET
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT *
        FROM surveyquestion
        `;

    pool.query(SQLSTATMENT, callback);
}
// GET / PUT
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
      SELECT * FROM surveyquestion
      WHERE question_id = ?;
      `;
    const VALUES = [data.question_id];

    pool.query(SQLSTATMENT, VALUES, callback);
};
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE surveyquestion
        SET question = ?
        WHERE question_id = ?;
        `;
    const VALUES = [data.question, data.question_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
module.exports.updatePoints = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE user
        SET points = ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.points, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
// DELETE
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
        DELETE FROM surveyquestion
        WHERE question_id = ?;
        `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}