const Note = require('../models/noteModel');
const getNotes = async (req,res) => {
    const notes = await Note.find();
    res.status(201).json(notes);
}

const createNote = async (req, res) => {
    const {title, content, catagory} = req.body;
    console.log(title, content, catagory);
    if(!title || !content || !catagory){
        res.status(400);
    }else{
        const note = new Note({title, content, catagory, user:req.userId._id });
        const createNote =  await note.save();
        res.status(201).json(createNote);
    }
}

const getNoteById = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(!note){
        res.status(404).json({message: 'Not Found'});
    }else{
        res.status(201).json(note);
    }
}

const updateNoteById = async (req,res)=>{
    const note = await Note.findById(req.params.id);
    if(note.user.toString() === req.userId._id.toString() && note){
        const {title, content, catagory} = req.body;
        if(!title ||!content ||!catagory){
            res.status(400).json({message: 'Something went wrong'});
        }else{
            note.title = title;
            note.content = content;
            note.catagory = catagory;
            const updatedNote = await note.save();
            res.status(201).json(updatedNote);
        }
    }
}

const deleteNoteById = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note.user.toString() !== req.userId._id.toString() || !note){
        res.status(404).json({message: 'Not Found'});
    }else{
        await note.deleteOne(note);
        res.status(204).json({message: 'Note deleted'});   
    }
}
module.exports = {getNotes, createNote, getNoteById, updateNoteById, deleteNoteById}