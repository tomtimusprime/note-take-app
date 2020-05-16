const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const router = require("router");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

app.use(bodyParser.json());
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
    console.log(`/api/notes get called`);
    res.json(db);
});

// POST `/api/notes` - Should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
    console.log(`api notes post called`);
    let newNote = req.body;
    // newNote.id = (req.body.name.split(" "))[0].toLowerCase();
    console.log(newNote);
    newNote = JSON.stringify(newNote);

    db.push(newNote);

});

app.post("/api/tables", function (request, response) {
    console.log(`POST /api/tables called`);
    const newReservation = request.body;
    newReservation.id = (request.body.name.split(" "))[0].toLowerCase();

    console.log(newReservation);

    if(reservations.length > 5) {
        waitList.push(newReservation);
        console.log(waitList);
        response.json("You've been added to the waitlist.");
    }
    else {
        reservations.push(newReservation);
        response.json("Your reservation has been added.");
    }
});




app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})