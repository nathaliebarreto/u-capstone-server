const express = require('express');
const router = express.Router() // To use router, insrtantiate it like this
const fs = require('fs')


function readUserFile() {
    const userList = fs.readFileSync("./data/userinfo.json");
    const parsedData = JSON.parse(userList);
    return parsedData;
}



router.get('/:username&:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    
    const users = readUserFile();

    for (const id in users) {
        const user = users[id];

        if (user.username === username && user.password === password) {
            return res.send(user);
        }
    }

    return res.status(401).send('Invalid username or password');
});


router.get('/:id', (req, res) => {
    
    const users = readUserFile();
    const id = req.params.id;
    let user;

    if (id in users) {
        user = users[id];
        return res.send(user);

    } else {
        return res.status(401).send('Invalid user');
    }
});


module.exports = router;
