const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/auth');
const noteController = require('../controllers/note');

//create note route
router.post('/', authenticate , noteController.createNote);

//get notes route
router.get('/', authenticate , noteController.getNotes);

//update note route
router.put('/:id', authenticate , noteController.updateNote);

//delete note route
router.delete('/:id', authenticate , noteController.deleteNote);

module.exports = router;