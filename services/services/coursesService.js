import { courses } from '../data/courses.js';

// פונקציה שמחזירה את כל הקורסים
export function getAllCourses() {
    return courses;
}

// פונקציה שמוצאת קורס לפי מזהה (ID)
export function getCourseById(id) {
    return courses.find(course => course.id === parseInt(id));
}

// פונקציה להוספת קורס חדש
export function createCourse(name, duration) {
    const newCourse = { id: courses.length + 1, name, duration };
    courses.push(newCourse);
    return newCourse;
}