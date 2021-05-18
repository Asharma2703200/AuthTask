require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./routes/auth")




//Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
});



//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

//Routes
app.use("/api", authRoutes)


//PORT
const port = process.env.PORT || 3000;

//Starting a server
app.listen(port, () => {
    console.log(`app is running at PORT: ${port}`);
})
