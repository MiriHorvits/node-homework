import {
  getAllEnrollments,
  enrollStudent,
  getEnrollmentsByStudent,
  updateEnrollment,
  deleteEnrollment
} from '../services/services/enrollmentsService.js';

export function handleGetAllEnrollments(req, res) {
  getAllEnrollments()
    .then((list) => res.status(200).json(list))
    .catch((error) => {
      console.error('Error loading enrollments:', error);
      res.status(500).json({ message: 'Failed to load enrollments' });
    });
}

export function handleEnrollStudent(req, res) {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ message: 'Student ID and Course ID are required' });
  }

  enrollStudent(studentId, courseId)
    .then((newEnrollment) => res.status(201).json(newEnrollment))
    .catch((error) => {
      console.error('Error creating enrollment:', error);
      res.status(500).json({ message: 'Failed to create enrollment' });
    });
}

export function handleGetStudentEnrollments(req, res) {
  getEnrollmentsByStudent(Number(req.params.studentId))
    .then((list) => res.status(200).json(list))
    .catch((error) => {
      console.error('Error loading student enrollments:', error);
      res.status(500).json({ message: 'Failed to load student enrollments' });
    });
}

export function handleUpdateEnrollment(req, res) {
  updateEnrollment(Number(req.params.id), req.body)
    .then((updatedEnrollment) => {
      if (!updatedEnrollment) {
        return res.status(404).json({ message: 'Enrollment not found' });
      }
      return res.status(200).json(updatedEnrollment);
    })
    .catch((error) => {
      console.error('Error updating enrollment:', error);
      res.status(500).json({ message: 'Failed to update enrollment' });
    });
}

export function handleDeleteEnrollment(req, res) {
  deleteEnrollment(Number(req.params.id))
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: 'Enrollment not found' });
      }
      return res.status(204).send();
    })
    .catch((error) => {
      console.error('Error deleting enrollment:', error);
      res.status(500).json({ message: 'Failed to delete enrollment' });
    });
}