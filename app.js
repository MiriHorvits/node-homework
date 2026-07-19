const express = require('express');
const app = express();
const PORT = 3000;

// חובה להוסיף שורה זו לפני הגדרת ה-routes כדי שהשרת ידע לקרוא גוף בקשה (body) בפורמט JSON
app.use(express.json());

// --- מסד נתונים זמני בזיכרון (מערכים) ---
let courses = [
    { id: 1, name: 'תכנות Node.js', duration: '60 שעות' },
    { id: 2, name: 'פיתוח אפליקציות React', duration: '80 שעות' }
];

let students = [
    { id: 1, name: 'ישראל ישראלי', email: 'israel@example.com' },
    { id: 2, name: 'חנה כהן', email: 'chana@example.com' }
];

let enrollments = [
    { id: 1, studentId: 1, courseId: 1, date: '2026-01-01' }
];

// ==========================================
// 1. נתיבים עבור ישות: קורסים (Courses)
// ==========================================

// GET - קבלת כל הקורסים (רשימה)
app.get('/courses', (req, res) => {
    res.json(courses);
});

// GET - קבלת קורס בודד לפי מזהה
app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).json({ message: 'הקורס לא נמצא' });
    res.json(course);
});

// POST - יצירת קורס חדש
app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
        duration: req.body.duration
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// PUT - עדכון קורס קיים
app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).json({ message: 'הקורס לא נמצא' });

    course.name = req.body.name || course.name;
    course.duration = req.body.duration || course.duration;
    
    res.json(course);
});

// DELETE - מחיקת קורס
app.delete('/courses/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (courseIndex === -1) return res.status(404).json({ message: 'הקורס לא נמצא' });

    const deletedCourse = courses.splice(courseIndex, 1);
    res.json({ message: 'הקורס נמחק בהצלחה', course: deletedCourse[0] });
});


// ==========================================
// 2. נתיבים עבור ישות: תלמידים (Students)
// ==========================================

// GET - קבלת כל התלמידים
app.get('/students', (req, res) => {
    res.json(students);
});

// GET - קבלת תלמיד בודד
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: 'התלמיד לא נמצא' });
    res.json(student);
});

// POST - יצירת תלמיד חדש
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT - עדכון תלמיד קיים
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: 'התלמיד לא נמצא' });

    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;

    res.json(student);
});

// DELETE - מחיקת תלמיד
app.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex === -1) return res.status(404).json({ message: 'התלמיד לא נמצא' });

    const deletedStudent = students.splice(studentIndex, 1);
    res.json({ message: 'התלמיד נמחק בהצלחה', student: deletedStudent[0] });
});


// ==========================================
// 3. נתיבים עבור ישות: רישום (Enrollments)
// ==========================================

// GET - קבלת כל הרישומים
app.get('/enrollments', (req, res) => {
    res.json(enrollments);
});

// GET - קבלת רישום בודד
app.get('/enrollments/:id', (req, res) => {
    const enrollment = enrollments.find(e => e.id === parseInt(req.params.id));
    if (!enrollment) return res.status(404).json({ message: 'הרישום לא נמצא' });
    res.json(enrollment);
});

// POST - יצירת רישום חדש (קישור תלמיד לקורס)
app.post('/enrollments', (req, res) => {
    const newEnrollment = {
        id: enrollments.length + 1,
        studentId: parseInt(req.body.studentId),
        courseId: parseInt(req.body.courseId),
        date: req.body.date || new Date().toISOString().split('T')[0]
    };
    enrollments.push(newEnrollment);
    res.status(201).json(newEnrollment);
});

// PUT - עדכון רישום קיים
app.put('/enrollments/:id', (req, res) => {
    const enrollment = enrollments.find(e => e.id === parseInt(req.params.id));
    if (!enrollment) return res.status(404).json({ message: 'הרישום לא נמצא' });

    enrollment.studentId = req.body.studentId ? parseInt(req.body.studentId) : enrollment.studentId;
    enrollment.courseId = req.body.courseId ? parseInt(req.body.courseId) : enrollment.courseId;
    enrollment.date = req.body.date || enrollment.date;

    res.json(enrollment);
});

// DELETE - ביטול/מחיקת רישום
app.delete('/enrollments/:id', (req, res) => {
    const enrollmentIndex = enrollments.findIndex(e => e.id === parseInt(req.params.id));
    if (enrollmentIndex === -1) return res.status(404).json({ message: 'הרישום לא נמצא' });

    const deletedEnrollment = enrollments.splice(enrollmentIndex, 1);
    res.json({ message: 'הרישום בוטל בהצלחה', enrollment: deletedEnrollment[0] });
});


// הפעלת השרת בהאזנה לפורט שהוגדר
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// app.js
import express from 'express';
import coursesRouter from './routes/coursesRoutes.js';
import studentsRouter from './routes/studentsRoutes.js';
import enrollmentsRouter from './routes/enrollmentsRoutes.js';

const app = express();

// תוכנת ביניים לקריאת JSON
app.use(express.json());

// חיבור הראוטרים השונים לפי ישויות
app.use('/api/courses', coursesRouter);
app.use('/api/students', studentsRouter);
app.use('/api/enrollments', enrollmentsRouter);

export default app;