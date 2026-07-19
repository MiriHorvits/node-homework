import express from 'express';
import { handleGetAllEnrollments, handleEnrollStudent, handleGetStudentEnrollments } from '../controllers/enrollmentsController.js';

const router = express.Router();

router.get('/', handleGetAllEnrollments);
router.post('/', handleEnrollStudent);
router.get('/student/:studentId', handleGetStudentEnrollments);

export default router;