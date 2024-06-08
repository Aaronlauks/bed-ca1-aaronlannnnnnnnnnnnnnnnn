const model = require("../models/usersModel.js");

// GET
module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}
// POST
module.exports.createNewUser = (req, res, next) => {
    if (req.body.username == undefined) {
        res.status(400).json({
            message: "Error: username is undefined"
        });
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(409).json({
                    message: "Username already exists."
                })
            } else {
                res.status(201).json({
                    user_id: results.insertId,
                    username: req.body.username,
                    points: 0
                });
            }
        }
    }

    model.insertSingle(data, callback);
}
// GET / PUT
module.exports.readUserById = (req, res, next) => {
    var data = {
        id: req.params.id
    }
    if(req.body.user_id) data.id = req.body.user_id;
    if(req.params.getId) data.id = req.params.getId;

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                res.locals.getPoints = results[0].points
                if (req.params.getId) {
                    res.status(200).json(results[0]);
                } else {
                    if (req.body.username == results[0].username) {
                        res.status(409).json({
                            message: `Conflict. Username is already ${res.locals.getUser}`
                        });
                        return;
                    }
                    next();
                }
            }
        }
    }

    model.selectById(data, callback);
}
// PUT
module.exports.updateUserById = (req, res, next) => {

    const data = {
        id: req.params.id,
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            console.log(results)
            return res.status(200).json({
                user_id: results.insertId+1,
                username: req.body.username,
                points: res.locals.getPoints
            }); // 200 OK
        }
    }

    model.updateById(data, callback);
}
// DELETE
module.exports.deleteUserById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}