import express from 'express';
import { handleGetAllStudents, handleGetStudentById, handleCreateStudent } from '../controllers/studentsController.js';

const router = express.Router();

router.get('/', handleGetAllStudents);
router.get('/:id', (req, res) => {
    const studentId = req.params.id;
    const student = getStudentById(studentId); // שליפת הסטודנט מה-Service שלך

    // הבדיקה המשוכפלת:
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
});
router.post('/', handleCreateStudent);

export default router;