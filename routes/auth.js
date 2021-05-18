const express = require('express')
var router = express.Router();
const { signout, signup } = require("../controllers/auth")



router.get("/signout", signout)

router.get("/signin", (req, res) => {
    res.send("User Signin")
})

router.post("/signup", signup)

module.exports = router;