import express from 'express';
import { handleGetAllCourses, handleGetCourseById, handleCreateCourse } from '../controllers/coursesController.js';

const router = express.Router();

router.get('/', handleGetAllCourses);
router.get('/:id', handleGetCourseById);
router.post('/', handleCreateCourse);

export default router;