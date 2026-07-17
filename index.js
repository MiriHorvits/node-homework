const http = require('http');
const chalk = require('chalk');

// שלב 5: הגדרת מערך של קורסים עם מזהה קורס, שם ותיאור
const courses = [
    { id: 101, name: "מבוא למחשבים", description: "קורס בסיסי על עולם המחשוב" },
    { id: 102, name: "תכנות ב-Node.js", description: "פיתוח צד שרת מתקדם" },
    { id: 103, name: "בניית אתרים", description: "למידת HTML, CSS ו-JavaScript" }
];

// שלב 4: יצירת שרת שיכול להציג צד שרת
const server = http.createServer((req, res) => {
    // הגדרת כותרת כדי שהדפדפן יציג עברית כמו שצריך (UTF-8)
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    
    // שליחת מערך הקורסים כקובץ JSON לדפדפן
    res.end(JSON.stringify(courses, null, 2));
});

// הפעלת השרת על פורט 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(chalk.green.bold(`--- השרת רץ בהצלחה בכתובת http://localhost:${PORT} ---`));
    
    // הדפסת רשימת הקורסים בלוגים בצורה צבעונית
    console.log(chalk.cyan.underline("\nרשימת הקורסים הזמינים:"));
    courses.forEach(course => {
        console.log(
            chalk.yellow(`[קוד: ${course.id}] `) + 
            chalk.magenta.bold(course.name) + 
            chalk.white(` - ${course.description}`)
        );
    });
});