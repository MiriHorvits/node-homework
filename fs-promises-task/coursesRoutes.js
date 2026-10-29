import express from 'express';
import {
  handleGetAllCourses,
  handleGetCourseById,
  handleCreateCourse,
  handleUpdateCourse,
  handleDeleteCourse
} from '../controllers/coursesController.js';

const router = express.Router();

router.get('/', handleGetAllCourses);
router.get('/:id', handleGetCourseById);
router.post('/', handleCreateCourse);
router.put('/:id', handleUpdateCourse);
router.delete('/:id', handleDeleteCourse);

export default router;