const express = require("express");
const router = express.Router();

//POST
// Index - users
router.get("/", (req, res) => {
    res.send("GET for posts");
});

// Show - users
router.get("/:id", (req, res) => {
    res.send("GET for post id");
});

// POST - users
router.post("/", (req, res) => {
    res.send("POST for post");
});

// Delete - users
router.delete("/:id", (req, res) => {
    res.send("DELETE for post id");
});

module.exports = router;