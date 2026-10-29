import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../services/services/studentsService.js';

export function handleGetAllStudents(req, res) {
  getAllStudents()
    .then((students) => res.status(200).json(students))
    .catch((error) => {
      console.error('Error loading students:', error);
      res.status(500).json({ message: 'Failed to load students' });
    });
}

export function handleGetStudentById(req, res) {
  getStudentById(Number(req.params.id))
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.status(200).json(student);
    })
    .catch((error) => {
      console.error('Error loading student:', error);
      res.status(500).json({ message: 'Failed to load student' });
    });
}

export function handleCreateStudent(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  createStudent(name, email)
    .then((newStudent) => res.status(201).json(newStudent))
    .catch((error) => {
      console.error('Error creating student:', error);
      res.status(500).json({ message: 'Failed to create student' });
    });
}

export function handleUpdateStudent(req, res) {
  updateStudent(Number(req.params.id), req.body)
    .then((updatedStudent) => {
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Failed to update student' });
    });
}

export function handleDeleteStudent(req, res) {
  deleteStudent(Number(req.params.id))
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.status(204).send();
    })
    .catch((error) => {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Failed to delete student' });
    });
}