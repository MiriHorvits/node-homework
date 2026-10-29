import express from 'express';
import {
  handleGetAllStudents,
  handleGetStudentById,
  handleCreateStudent,
  handleUpdateStudent,
  handleDeleteStudent
} from '../controllers/studentsController.js';

const router = express.Router();

router.get('/', handleGetAllStudents);
router.get('/:id', handleGetStudentById);
router.post('/', handleCreateStudent);
router.put('/:id', handleUpdateStudent);
router.delete('/:id', handleDeleteStudent);

export default router;