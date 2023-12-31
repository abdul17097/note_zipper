const express = require('express');
const { getNotes, createNote, getNoteById, updateNoteById,deleteNoteById } = require('../controlers/noteController');
const protect = require('../middleware/authMiddleWare');

const router = express.Router();


router.route('/').get(protect, getNotes);
router.route('/create').post(protect ,createNote);
router.route('/:id').get(getNoteById).put(protect ,updateNoteById).delete(protect, deleteNoteById);

module.exports = router;