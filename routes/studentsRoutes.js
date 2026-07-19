import express from 'express';
import { handleGetAllStudents, handleGetStudentById, handleCreateStudent } from '../controllers/studentsController.js';

const router = express.Router();

router.get('/', handleGetAllStudents);
router.get('/:id', handleGetStudentById);
router.post('/', handleCreateStudent);

export default router;