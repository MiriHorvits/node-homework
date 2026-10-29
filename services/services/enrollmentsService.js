import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const enrollmentsFilePath = path.join(__dirname, '..', '..', 'data', 'enrollments.json');

function readEnrollmentsFile() {
  return fs.readFile(enrollmentsFilePath, 'utf-8').then((data) => JSON.parse(data));
}

function writeEnrollmentsFile(enrollments) {
  return fs.writeFile(enrollmentsFilePath, JSON.stringify(enrollments, null, 2), 'utf-8');
}

export function getAllEnrollments() {
  return readEnrollmentsFile();
}

export function enrollStudent(studentId, courseId) {
  return readEnrollmentsFile().then((enrollments) => {
    const newEnrollment = {
      id: enrollments.length ? enrollments[enrollments.length - 1].id + 1 : 1,
      studentId: Number(studentId),
      courseId: Number(courseId)
    };

    enrollments.push(newEnrollment);
    return writeEnrollmentsFile(enrollments).then(() => newEnrollment);
  });
}

export function getEnrollmentsByStudent(studentId) {
  return readEnrollmentsFile().then((enrollments) =>
    enrollments.filter((enrollment) => enrollment.studentId === Number(studentId))
  );
}

export function updateEnrollment(id, updatedData) {
  return readEnrollmentsFile().then((enrollments) => {
    const index = enrollments.findIndex((enrollment) => enrollment.id === id);
    if (index === -1) return null;

    enrollments[index] = { ...enrollments[index], ...updatedData };
    return writeEnrollmentsFile(enrollments).then(() => enrollments[index]);
  });
}

export function deleteEnrollment(id) {
  return readEnrollmentsFile().then((enrollments) => {
    const index = enrollments.findIndex((enrollment) => enrollment.id === id);
    if (index === -1) return false;

    enrollments.splice(index, 1);
    return writeEnrollmentsFile(enrollments).then(() => true);
  });
}