const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const router = require("router");
const path = require("path");
let db = require("./db/db.json");
const fs = require("fs");
const logger = require("morgan");
const uid = require("uid");
let id = 0;

app.use(bodyParser.json());
app.use(logger("dev"));
// used to read arrays/strings that the FORM POSTs.
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//HTML Routes
app.get("/", (req, res) => {
    console.log('/ called');
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
app.get("/notes", (req, res) => {
    console.log('/notes called');
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

//API Routes
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    console.log(`/api/notes got called`);
    res.json(db);
});

//The application should have a `db.json` file on the backend that will be 
//used to store and retrieve notes using the `fs` module.

// POST `/api/notes` - Should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
    console.log(`api notes post called`);
    let newNote = req.body;
    newNote.id = uid();
    db.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    console.log(db);
    res.status(200).json({succes: true});

});

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. 
// In order to delete a note, you'll need to read all notes from the `db.json` file, 
// remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    db = db.filter((note) => note.id !== id); 
    console.log(db);
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    res.status(200).json({success: true});

})

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})