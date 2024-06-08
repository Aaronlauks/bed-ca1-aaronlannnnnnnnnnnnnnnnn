const model = require("../models/questionsModel.js");

// POST
module.exports.createNew = (req, res, next) => {
    if (req.body.question == undefined || req.body.user_id == undefined) {
        res.status(400).json({
            message: "Error missing inputs."
        });
        return;
    }

    const data = {
        question: req.body.question,
        id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNew:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                question_id: results.insertId,
                question: req.body.question,
                creator_id: req.body.user_id
            });
        }
    }

    model.insertSingle(data, callback);
}

// GET
module.exports.readAll = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAll:", error);
            res.status(500).json(error);
        }
        else res.status(200).send(results);
    }

    model.selectAll(callback);
}
module.exports.readAnswerById = (req, res, next) => {
    const data = {
        id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAll:", error);
            res.status(500).json(error);
        } else if (!results[0]){
            res.status(404).json({
                message: "Question not found."
            })
        } else res.status(200).json(results);
    }
    model.selectAnswers(data, callback);
}

// PUT
module.exports.readQuestionById = (req, res, next) => {

    const data = {
        question_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestionById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Question not found"
                });
            }
            else {
                res.locals.creator_id = results[0].creator_id;
                next();
            }
        }
    }
    model.selectById(data, callback);
}
module.exports.updateQuestionById = (req, res, next) => {
    if (req.body.user_id == undefined || req.body.question == undefined) return res.status(400).json({
        message: "Error missing inputs."
    });
    const data = {
        question_id: req.params.id,
        user_id: req.body.user_id,
        question: req.body.question
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateQuestionById:", error);
            res.status(500).json(error);
        } else {
            if (res.locals.creator_id != data.user_id) {
                res.status(403).json({
                    message: "Incorrect creator ID."
                });
            } else {
                return res.status(200).json({
                    question_id: results.insertId + 1,
                    question: req.body.question,
                    creator_id: req.body.user_id
                }); // 200 OK
            }
        }
    }
    model.updateById(data, callback);
}

// DELETE
module.exports.deleteQuestionById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteQuestionById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Question not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    model.deleteById(data, callback);
}

// POST answers
module.exports.createNewAnswer = (req, res, next) => {
    if (req.body.answer == undefined || req.body.creation_date == undefined) return res.status(400).json({
        message: "Error missing inputs."
    });
    const data = {
        question_id: req.params.id,
        user_id: req.body.user_id,
        answer: req.body.answer,
        creation_date: req.body.creation_date,
        additional_notes: req.body.additional_notes,
        points: res.locals.getPoints + 5
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewAnswer:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                answer_id: results.insertId,
                answered_question_id: parseInt(req.params.id),
                participant_id: req.body.user_id,
                answer: req.body.answer,
                creation_date: req.body.creation_date,
                additional_notes: req.body.additional_notes
            });
        }
    }
    const errorHandle = (error, results, fields) => {
        if (error) return console.error("Error createNewAnswer:", error);
    }

    model.insertSingleAnswer(data, callback);
    if (data.answer == true) model.updatePoints(data, errorHandle);
}