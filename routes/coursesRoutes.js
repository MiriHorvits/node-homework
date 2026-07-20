import express from 'express';
import { handleGetAllCourses, handleGetCourseById, handleCreateCourse } from '../controllers/coursesController.js';

const router = express.Router();

router.get('/', handleGetAllCourses);
// קובץ: routes/coursesRoutes.js (או קובץ ה-Controller המתאים)

router.get('/:id', (req, res) => {
    const courseId = req.params.id;
    
    // קריאה לפונקציה מה-Service שראינו קודם
    const course = getCourseById(courseId); 

    // ********* כאן בדיוק אתה כותב את שלב 2 *********
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    // ***********************************************

    // אם הקורס נמצא, מחזירים אותו עם סטטוס 200
    return res.status(200).json(course);
});
router.post('/', handleCreateCourse);

export default router;