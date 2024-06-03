const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/', controller.readAllUser);
router.post('/', controller.createNewUser);   

router.get('/:getId', controller.readUserById);
router.put('/:id', controller.readUserById, controller.updateUserById);
//router.delete('/:id', controller.deleteUserById);

module.exports = router;