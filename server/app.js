const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

/**** Configuration ****/
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan("combined")); // Log all requests to the console
app.use(express.static("../client/build")); // Only needed when running build in production mode

/**** Database ****/
// The "question Data Access Layer".
const questionDAL = require("./question_dal")(mongoose);

/**** Routes ****/
app.get("/api/questions", (req, res) => {
    // Get all questions. Put question into json response when it resolves.
    questionDAL.getQuestions().then(questions => res.json(questions));
});

// Get question
app.get("/api/questions/:id", (req, res) => {
    let id = req.params.id;
    questionDAL.getQuestion(id).then(question => res.json(question));
});

// Post a new question
app.post("/api/questions", (req, res) => {
    let question = {
        question: req.body.question,
        comments: [] // Empty comment array
    };
    questionDAL
        .createQuestion(question)
        .then(newquestion => res.json(newquestion));
});

app.post("/api/questions/:id/comments", (req, res) => {
    questionDAL
        .addComment(req.params.id, req.body)
        .then(updatedquestion => res.json(updatedquestion));
});

app.put("/api/questions/:id/comments/:commentId/vote/:value", (req, res) => {
    questionDAL
        .vote(req.params.id, req.params.commentId, req.params.value)
        .then(updatedvote => res.json(updatedvote));
});

/**** Start ****/
const url = process.env.MONGO_URL || "mongodb://localhost/express_db";
mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await questionDAL.bootstrap(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`question API running on port ${port}!`);
    })
    .catch(error => console.error(error));