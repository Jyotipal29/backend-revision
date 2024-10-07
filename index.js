
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const { z } = require("zod")
app.use(express.json())

const users = []

const generateToken = (username) => {
    const token = jwt.sign(username, "abc")

    return token;
}

app.post("/signup", (req, res) => {

    const requiredBody = z.object({
        email: z.string().email(),
        name: z.string().min(5).max(20),
        password: z.string().min(8).max(15)
    })

    const parseData = requiredBody.parse(req.body)
    const { success, data, error } = requiredBody.SafeParse(req.body)

    if (!success) {
        res.json({ msg: "Incorrect format", error: error })
        return
    }

    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
        req.json({ msg: "user already exist" })

        return
    }

    users.push({ username, password })

    res.json({ msg: "you are signed up" })
})
app.post("/signin", (req, res) => {

    const { username, password } = req.body;
    let currentUser = null;

    currentUser = users.find((user) => user.username === username && user.password === password)

    if (currentUser) {
        const token = generateToken(username)


        res.json({ token })
    } else {
        res.status(403).json({ msg: "Invalide username or password" })
    }
})


app.get("/me", (req, res) => {
    const token = req.headers.token
    const decodedUser = jwt.verify(token, "abc")
    let me = null;
    me = users.find((user) => user.username === decodedUser.username)

    if (me) {
        req.json({ username: me.username })
    } else {
        res.status(404).json({ msg: "token invalide" })
    }

})

app.listen(3000, () => console.log("listenig"))