// 1. טעינת משתני הסביבה בראש הקובץ
require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// 2. הגדרת הפורט מתוך משתני הסביבה (עם ברירת מחדל)
const PORT = process.env.PORT || 3000;

// 3. פונקציית ה-require('dotenv').config(); המשתמשת במפתח הסודי מתוך משתני הסביבה
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    // שימוש ב-JWT_SECRET מתוך קובץ ה-.env
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// דוגמה לנתיב המשתמש ב-require('dotenv').config();
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

// 4. הפעלת השרת (פעם אחת בלבד, בסוף הקובץ)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});