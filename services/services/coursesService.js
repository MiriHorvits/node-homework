import { courses } from '../data/courses.js';

// פונקציה שמחזירה את כל הקורסים
export function getAllCourses() {
    return courses;
}

// פונקציה שמוצאת קורס לפי מזהה
export function getCourseById(id, res) { // שים לב שהוספנו את res כפרמטר כדי שנוכל להחזיר תשובה
    const course = courses.find(course => course.id === id);
    
    // ********* הבדיקה של שלב 2 *********
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    // **********************************
    
    return course;
}

// פונקציה להוספת קורס חדש
export function createCourse(name, duration) {
    const newCourse = { id: courses.length + 1, name, duration };
    courses.push(newCourse);
    return newCourse;
}