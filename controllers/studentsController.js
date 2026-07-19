import { getAllStudents, getStudentById, createStudent } from '../services/studentsService.js';

export function handleGetAllStudents(req, res) {
    const list = getAllStudents();
    res.json(list);
}

export function handleGetStudentById(req, res) {
    const student = getStudentById(req.params.id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
}

export function handleCreateStudent(req, res) {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    const newStudent = createStudent(name, email);
    res.status(201).json(newStudent);
}