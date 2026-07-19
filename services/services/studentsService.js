import { students } from '../data/students.js';

// פונקציה שמחזירה את כל הסטודנטים
export function getAllStudents() {
    return students;
}

// פונקציה שמוצאת סטודנט לפי מזהה (ID)
export function getStudentById(id) {
    return students.find(student => student.id === parseInt(id));
}

// פונקציה להוספת סטודנט חדש
export function createStudent(name, email) {
    const newStudent = { id: students.length + 101, name, email };
    students.push(newStudent);
    return newStudent;
}