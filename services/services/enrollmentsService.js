import { enrollments } from '../data/enrollments.js';

// פונקציה שמחזירה את כל הרישומים הקיימים
export function getAllEnrollments() {
    return enrollments;
}

// פונקציה שמבצעת רישום של סטודנט לקורס
export function enrollStudent(studentId, courseId) {
    const newEnrollment = {
        id: enrollments.length + 1,
        studentId: parseInt(studentId),
        courseId: parseInt(courseId)
    };
    enrollments.push(newEnrollment);
    return newEnrollment;
}

// פונקציה שמוצאת את כל הקורסים שסטודנט מסוים רשום אליהם
export function getEnrollmentsByStudent(studentId) {
    return enrollments.filter(enrollment => enrollment.studentId === parseInt(studentId));
}