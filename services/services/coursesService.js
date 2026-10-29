import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coursesFilePath = path.join(__dirname, '..', '..', 'data', 'courses.json');

function readCoursesFile() {
  return fs.readFile(coursesFilePath, 'utf-8').then((data) => JSON.parse(data));
}

function writeCoursesFile(courses) {
  return fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2), 'utf-8');
}

export function getAllCourses() {
  return readCoursesFile();
}

export function getCourseById(id) {
  return readCoursesFile().then((courses) => courses.find((course) => course.id === id));
}

export function createCourse(name, duration) {
  return readCoursesFile().then((courses) => {
    const newCourse = {
      id: courses.length ? courses[courses.length - 1].id + 1 : 1,
      name,
      duration
    };

    courses.push(newCourse);
    return writeCoursesFile(courses).then(() => newCourse);
  });
}

export function updateCourse(id, updatedData) {
  return readCoursesFile().then((courses) => {
    const index = courses.findIndex((course) => course.id === id);
    if (index === -1) return null;

    courses[index] = { ...courses[index], ...updatedData };
    return writeCoursesFile(courses).then(() => courses[index]);
  });
}

export function deleteCourse(id) {
  return readCoursesFile().then((courses) => {
    const index = courses.findIndex((course) => course.id === id);
    if (index === -1) return false;

    courses.splice(index, 1);
    return writeCoursesFile(courses).then(() => true);
  });
}