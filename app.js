const express = require('express');
const app = express();
const port = 3000;

// ייבוא המערכים מהקבצים המופרדים שיצרת
const courses = require('./courses');
const students = require('./students');

// 1. קריאה לכתובת השרת בלי ניווט
app.get('/', (req, res) => {
    res.json({ message: "השרת עובד בהצלחה!", description: "שרת ניהול מוסד לימודי" });
});

// 2. קריאה לנתיב הקורסים
app.get('/courses', (req, res) => {
    res.json(courses);
});

// 3. קריאה לנתיב התלמידים
app.get('/students', (req, res) => {
    res.json(students);
});

// הפעלת השרת
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;