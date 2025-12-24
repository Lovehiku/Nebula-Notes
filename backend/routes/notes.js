const express = require('express');
const router = express.Router();
const authController = require('../controllers/note');
const {authenticate} = require('../middleware/auth');

//create note route
router.post('/', authenticate , noteController.createNote);

//get notes route
router.get('/', authenticate , noteController.getNotes);

//update note route
router.put('/:id', authenticate , noteController.updateNote);

//delete note route
router.delete('/:id', authenticate , noteController.deleteNote);

module.exports = router;