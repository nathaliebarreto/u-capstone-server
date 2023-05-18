const express = require('express');
const router = express.Router() // To use router, insrtantiate it like this
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

function readAnswers() {
    const testAnswers = fs.readFileSync("./data/answers.json");
    const parsedData = JSON.parse(testAnswers);//gives actual object of objects
    return parsedData;
};

function getUserAnswer(userId) {
    const allAnswers = readAnswers();

    const usersAnswers = Object.values(allAnswers).find((answer) => {
        return answer.userId == userId
    })

    if (usersAnswers) {
        return usersAnswers;
    } else {
        return undefined;
    } 
}



router.post('/disc', (req, res) => {
    console.log("THIS IS POST ",req.body.userId)
    const allAnswers = readAnswers();
    const userAnswer = getUserAnswer(req.body.userId);
    let newAnswer;

    if (userAnswer) {
        newAnswer = {
            id: userAnswer.id,
            score: req.body.score, 
            personalityType: req.body.personalityType,
            userId: req.body.userId,
            test: 'disc'
        }
        allAnswers[userAnswer.id] = newAnswer;

    } else {
        const answersId = uuidv4();
        newAnswer = {
            id: answersId,
            score: req.body.score, 
            personalityType: req.body.personalityType,
            userId: req.body.userId,
            test: 'disc'
        }
        allAnswers[answersId] = newAnswer;
    }
    
    fs.writeFileSync("./data/answers.json", JSON.stringify(allAnswers, null, 2));
    
    res.json(newAnswer);
});

router.get('/:userId', (req, res) => {
    console.log('inanswers GEt', req.params.userId)
    const allAnswers = readAnswers();
    const usersAnswers = Object.values(allAnswers).find((answer) => {
        return answer.userId == req.params.userId
    })

    res.json(usersAnswers);
})


module.exports = router;
