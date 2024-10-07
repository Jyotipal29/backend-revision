const express = require("express");

const app = express();

app.get("/health-checkup", (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const kedneyId = req.query.kedneyId

    if (username !== "jyoti" || password !== "pass") {
        res.status(400).json({ msg: "something is up with your inputs" })
        return;
    }
    if (username === "jyoti" && password === "pass") {
        if (kedneyId === 1) {
            res.json({ msg: "your kedney is fine !" })
        }
    }


})