const express = require('express');
const router = express.Router() // To use router, insrtantiate it like this
const fs = require('fs')

function readPersonalities() {
    const discAnswers = fs.readFileSync("./data/discData.json");
    const parsedData = JSON.parse(discAnswers);//gives actual object of objects
    return parsedData;
};


router.get('/', (req, res) =>{
    const allPersonalities = readPersonalities();
    res.json(allPersonalities);
});

router.get('/:id', (req, res) =>{
    const allPersonalities = readPersonalities();
    const discType = allPersonalities[req.params.id]
    res.json(discType);
});

module.exports = router;
