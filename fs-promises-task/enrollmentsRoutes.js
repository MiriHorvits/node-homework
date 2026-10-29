import express from 'express';
import {
  handleGetAllEnrollments,
  handleEnrollStudent,
  handleGetStudentEnrollments,
  handleUpdateEnrollment,
  handleDeleteEnrollment
} from '../controllers/enrollmentsController.js';

const router = express.Router();

router.get('/', handleGetAllEnrollments);
router.post('/', handleEnrollStudent);
router.get('/student/:studentId', handleGetStudentEnrollments);
router.put('/:id', handleUpdateEnrollment);
router.delete('/:id', handleDeleteEnrollment);

export default router;