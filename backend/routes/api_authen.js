const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const user = require("../models/user")
const constants = require("./constant")

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await user.findOne({ where: { username: username } })
        if (result) {
            if (bcryptjs.compareSync(password, result.password)) {
                res.json({ status: 200, result: constants.kResultOk, message: JSON.stringify(result) });
            } else {
                res.json({ status: 400, result: constants.kResultNok, message: "Invalid Password" });
            }
        } else {
            res.json({ 
                status: 400, 
                result: constants.kResultNok, 
                message: "Invalid Username" });
        }
    } catch (error) {
        res.json({ 
            status: 400, 
            result: constants.kResultNok, 
            message: JSON.stringify(error) });
    }
})


// Register
router.post("/register", async (req, res) => {
    try {
        req.body.password = bcryptjs.hashSync(req.body.password, 8);
        const result = await user.create(req.body)
        res.json({ 
            status: 200, 
            result: constants.kResultOk, 
            message: JSON.stringify(result) });
    } catch (error) {
        res.json({ 
            status: 400, 
            result: constants.kResultNok, 
            message: JSON.stringify(error) });

    }

});

// Query all users
router.get("/users", async (req, res) => {
    let result = await user.findAll();
    res.json({ 
        status: 200, 
        result: constants.kResultOk, 
        message: result });
  });

// router.post("/login", (req, res) => {
//     res.end("Login")
// })

// router.post("/register", async (req, res) => {
//     req.body.password = bcryptjs.hashSync(req.body.password, 8);
//     await user.create(req.body)
//     res.json({ status: 200, result: true, data: req.body });
// })

module.exports = router
