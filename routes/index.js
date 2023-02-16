// Nir Chen - 303341721
// Shmuel Maor - 206828360

const express = require('express');
const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});
module.exports = router;