require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();


//Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
});



//PORT
const port = process.env.PORT || 3000;

//Starting a server
app.listen(port, () => {
    console.log(`app is running at PORT: ${port}`);
})

app.get('/hello', (req, res) => {
    return res.send("Hello There")
})