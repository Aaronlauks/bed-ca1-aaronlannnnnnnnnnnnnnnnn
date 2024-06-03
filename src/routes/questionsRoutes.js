const express = require('express');
const router = express.Router();
const controller = require('../controllers/questionsController');
const usersController = require('../controllers/usersController');

router.get('/', controller.readAll);
router.post('/', controller.createNew); 
router.post('/:id/answers', controller.readQuestionById, usersController.readUserById, controller.createNewAnswer);     
router.put('/:id', controller.readQuestionById, controller.updateQuestionById);
router.delete('/:id', controller.deleteQuestionById);

//router.get('/' (controller.something1, controller.something2))

//router.get('/:id', controller.readUserById);



module.exports = router;