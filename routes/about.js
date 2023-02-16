// Nir Chen - 303341721
// Shmuel Maor - 206828360

const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    const developers = '[{"firstname":"nir","lastname":"chen","id":303341721,"email":"nirchenmail@gmail.com"}, {"firstname":"shmuel","lastname":"maor","id":206828360,"email":"fogen13@gmail.com"}]'
    res.send(JSON.parse(developers));
});

module.exports = router;