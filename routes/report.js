// Nir Chen - 303341721
// Shmuel Maor - 206828360

const express = require('express');
const router = express.Router();
const costs = require('../models/costs');
const reports = require('../models/reports');

router.get("/", async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const month = req.query.month;
        const year = req.query.year;

        //check that userid is valid
        //check that month is valid
        //check that year is valid
        //check if query  exists
        const reportExists = await reports.findOne({user_id: user_id, month: month, year: year});
        if (reportExists) {
            return res.status(200).json(reportExists.sortedReports);//.toObject({
            /*versionKey: false, transform: (doc, ret) => {
                delete ret._id;
            }
        }));*/
            /*await cost.save().then(x => res.json(x.toObject({
                versionKey: false, transform: (doc, ret) => {
                    delete ret._id
                }
            }))).catch(error => res.status(400).json({error: error.message}));*/
        }
        const relevantCosts = await costs.find({user_id: user_id, month: month, year: year});
        if (relevantCosts.length === 0) {
            return res.status(200).send("There are no relevant costs!");
        }
        const report = new reports({
            user_id: user_id,
            month: month,
            year: year
        });
        relevantCosts.forEach(cost => {
            report.sortedReports[cost.category].push({day: cost.day, description: cost.description, sum: cost.sum})
        });
        report.save(function (error, result) {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.status(200).json(report.sortedReports);
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;