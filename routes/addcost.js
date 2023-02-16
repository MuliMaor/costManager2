// Nir Chen - 303341721
// Shmuel Maor - 206828360

const express = require('express');
const router = express.Router();
const users = require('../models/users');
const costs = require('../models/costs');
const reports = require('../models/reports');

const categories = ["food", "health", "housing", "sport", "education", "transportation", "other"];

router.post("/", async (req, res) => {
    const {user_id, day, month, year, description, category, sum} = req.body;
    //check that category exists
    if (!categories.includes(category)) {
        return res.status(400).json({error: "cost must be of existing category!"})
    }
    //check that user exists
    const usernameExists = await users.findOne({id: user_id});
    if (!usernameExists) {
        return res.status(400).json({error: "user was not found!"})
    }

    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    } else {
        monthLength[1] = 28;
    }

    let tempMonth = month;
    if (!tempMonth) {
        tempMonth = new Date().getMonth();
    }

    //check that day is valid
    if ((parseInt(day) != day || day < 1 || day > monthLength[parseInt(tempMonth)]) && day) {
        return res.status(400).json({error: "day is not valid!"})
    }
    //check that month is valid
    if ((parseInt(month) != month || month < 1 || month > 12) && month) {
        return res.status(400).json({error: "month is not valid!"})
    }
    //check that year is valid
    if ((parseInt(year) != year) && year) {
        return res.status(400).json({error: "year is not valid!"})
    }
    //check that date is not in the future
    const date = new Date();
    let assignedYear = year;
    let assignedMonth = month;
    let assignedDay = day;

    if (year > date.getFullYear()) {
        assignedYear = date.getFullYear();
        assignedMonth = date.getMonth() + 1;
        assignedDay = date.getDate();
    } else if (month > date.getMonth() + 1) {
        assignedYear = date.getFullYear();
        assignedMonth = date.getMonth() + 1;
        assignedDay = date.getDate();
    } else if (day > date.getDate()) {
        assignedYear = date.getFullYear();
        assignedMonth = date.getMonth() + 1;
        assignedDay = date.getDate();
    }

    //check that sum is valid
    if (isNaN(sum) || sum < 0) {
        return res.status(400).json({error: "sum is not valid!"})
    }
    //add the new cost document to costs collection
    const cost = new costs({
        user_id: user_id,
        day: assignedDay,
        month: assignedMonth,
        year: assignedYear,
        description: description,
        category: category,
        sum: sum
    });
    await cost.save().then(x => res.json(x.toObject({
        versionKey: false, transform: (doc, ret) => {
            delete ret._id
        }
    }))).catch(error => res.status(400).json({error: error.message}));

    //check if report exists (by user_id, month, year)
    const reportExists = await reports.findOne({user_id: cost.user_id, month: cost.month, year: cost.year});
    if (reportExists) {
        ////if yes, add relevant details from the new cost to it, under the relevant category
        await reportExists.sortedReports[cost.category].push({
            day: cost.day,
            description: cost.description,
            sum: cost.sum
        });
        await reports.updateOne({
            user_id: user_id,
            year: assignedYear,
            month: assignedMonth
        }, {sortedReports: reportExists.sortedReports});
    }
});

module.exports = router;