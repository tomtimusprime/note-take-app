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

//Notes Route
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

app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    db = db.filter((note) => note.id !== id); 
    console.log(db);
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    res.status(200).json({success: true});

})

//Index Route
app.get("*", (req, res) => {
    console.log('/ called');
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})