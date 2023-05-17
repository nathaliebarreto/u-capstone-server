const express = require("express");
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3001;
const users = require ("../routes/users")
const exam = require('../routes/discexam')
const answers =require ('../routes/answers')
const user = require('../routes/user')
const discPersonalities = require('../routes/discPersonalities');

app.use(cors())
app.use(express.json());


app.get("/",(request,response)=>{
    response.send("hello welcome to my crib");
});

app.use("/users", users);
app.use("/discexam", exam);
app.use("/answers", answers)
app.use("/user", user);
app.use("/discpersonalities", discPersonalities)


app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
