const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true},
    content: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
},
    {timestamps: true});


const Note = mongoose.model('note', noteSchema);

module.exports = Note;