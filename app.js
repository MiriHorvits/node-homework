const express = require('express');
const app = express();
const port = 3000;

// שים לב: השתמשתי בשם הקובץ כפי שמופיע אצלך (sudents בלי t)
const courses = require('./courses');
const students = require('./students');

app.get('/', (req, res) => {
    res.json({ message: "השרת עובד בהצלחה!", description: "שרת ניהול קורסים ותלמידים" });
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});