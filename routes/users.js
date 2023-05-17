const express = require('express');
const router = express.Router() // To use router, insrtantiate it like this
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


function readUserFile() {
    const userList = fs.readFileSync("./data/userinfo.json");
    const parsedData = JSON.parse(userList);
    return parsedData;
}


router.get('/', (req, res) => {
    const users = readUserFile();
    res.json(users)
})



router.get("/:username", (req, res) => {
    const users = readUserFile();
    const userProfile = users.find((user) => {
        return user.username === req.params.username
    })
    res.json(userProfile);
});


router.post("/signup", (req, res) => {    
    console.log(req.body);
    const newUserId = uuidv4();
    const newUser = {
        id: newUserId,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    };


    const allUsers = readUserFile();
    allUsers[newUserId] = newUser;
    fs.writeFileSync("./data/userinfo.json", JSON.stringify(allUsers, null, 2));
    res.status(201).json(newUser);
});




module.exports = router;
