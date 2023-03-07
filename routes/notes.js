const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

/* 
    TODO: Fetch all the notes using GET "/api/notes/fetchallnotes"
    *Login required
*/
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal error occurred !");
    }
})

/* 
    TODO: Add new note using POST "/api/notes/addnote"
    *Login required
*/
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 10 characters').isLength({ min: 10 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    //Returns bad request and errors if any validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = await Note.create({
            title, description, tag, user: req.user.id
        });
        res.json(note)

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal error occurred !");
    }
})

/* 
    TODO: Update existing note using PUT "/api/notes/updatenote/:id"
    *Login required
*/
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and modify it
        let note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).send("Not Found");

        // Allow deletion only if the user owns this Note        
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal error occurred !");
    }
})


/* 
    TODO: Delete existing note using DELETE "/api/notes/deletenote/:id"
    *Login required
*/
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).send("Not Found");

        // Allow deletion only if the user owns this Note        
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Status": "Note deleted successfully", note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal error occurred !");
    }
})
module.exports = router