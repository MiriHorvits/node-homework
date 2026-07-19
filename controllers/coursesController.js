import { getAllCourses, getCourseById, createCourse } from '../services/coursesService.js';

export function handleGetAllCourses(req, res) {
    const list = getAllCourses();
    res.json(list);
}

export function handleGetCourseById(req, res) {
    const course = getCourseById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
}

export function handleCreateCourse(req, res) {
    const { name, duration } = req.body;
    if (!name || !duration) {
        return res.status(400).json({ message: "Name and duration are required" });
    }
    const newCourse = createCourse(name, duration);
    res.status(201).json(newCourse);
}