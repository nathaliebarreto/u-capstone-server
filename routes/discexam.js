const express = require('express');
const router = express.Router() // To use router, insrtantiate it like this
const fs = require('fs')


function readExam() {
    const examList = fs.readFileSync("./data/discQuestions.json");
    const parsedData = JSON.parse(examList);//gives actual object of objects

    return parsedData;
};

router.get("/", (req, res) => {
    const allQuestions = readExam(); //gives same info as parsed data
    res.json(allQuestions);
});


router.get("/:id", (req, res) => {
    const exam = readExam();
    const questions = exam[req.params.id]
    
    res.json(questions);
});

module.exports = router;
