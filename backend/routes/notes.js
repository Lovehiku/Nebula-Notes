const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/auth');
const noteController = require('../controllers/note');

//create note route
router.post('/', authenticate , noteController.createNote);

//get notes route
router.get('/', authenticate , noteController.getNotes);
//get single note route
router.get('/:id', authenticate , noteController.getNote);
//update note route
router.put('/:id', authenticate , noteController.updateNote);

//delete note route
router.delete('/:id', authenticate , noteController.deleteNote);

module.exports = router;