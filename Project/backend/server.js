const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
    const user = req.body;

    console.log(user);

    res.json({
        message: "User Logged in",
        user: user
    });
});

app.post("/register", (req, res) => {
    const user = req.body;

    console.log(user);

    res.json({
        message: "User registered",
        user: user
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});