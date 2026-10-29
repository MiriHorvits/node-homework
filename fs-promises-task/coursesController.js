import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../services/services/coursesService.js';

export function handleGetAllCourses(req, res) {
  getAllCourses()
    .then((courses) => res.status(200).json(courses))
    .catch((error) => {
      console.error('Error loading courses:', error);
      res.status(500).json({ message: 'Failed to load courses' });
    });
}

export function handleGetCourseById(req, res) {
  getCourseById(Number(req.params.id))
    .then((course) => {
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json(course);
    })
    .catch((error) => {
      console.error('Error loading course:', error);
      res.status(500).json({ message: 'Failed to load course' });
    });
}

export function handleCreateCourse(req, res) {
  const { name, duration } = req.body;

  if (!name || !duration) {
    return res.status(400).json({ message: 'Name and duration are required' });
  }

  createCourse(name, duration)
    .then((newCourse) => res.status(201).json(newCourse))
    .catch((error) => {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Failed to create course' });
    });
}

export function handleUpdateCourse(req, res) {
  const { id } = req.params;

  updateCourse(Number(id), req.body)
    .then((updatedCourse) => {
      if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json(updatedCourse);
    })
    .catch((error) => {
      console.error('Error updating course:', error);
      res.status(500).json({ message: 'Failed to update course' });
    });
}

export function handleDeleteCourse(req, res) {
  deleteCourse(Number(req.params.id))
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(204).send();
    })
    .catch((error) => {
      console.error('Error deleting course:', error);
      res.status(500).json({ message: 'Failed to delete course' });
    });
}