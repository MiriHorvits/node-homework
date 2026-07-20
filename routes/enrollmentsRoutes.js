import express from 'express';
import { handleGetAllEnrollments, handleEnrollStudent, handleGetStudentEnrollments } from '../controllers/enrollmentsController.js';

const router = express.Router();

router.get('/', handleGetAllEnrollments);
router.post('/', handleEnrollStudent);
router.get('/student/:studentId', handleGetStudentEnrollments);
if (!foundItem) { // החלף את foundItem בשם המשתנה של האובייקט שחיפשת
    return res.status(404).json({ message: "Not Found" });
}
export default router;