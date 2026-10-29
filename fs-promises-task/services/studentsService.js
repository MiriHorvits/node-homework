import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const studentsFilePath = path.join(__dirname, '..', '..', 'data', 'students.json');

function readStudentsFile() {
  return fs.readFile(studentsFilePath, 'utf-8').then((data) => JSON.parse(data));
}

function writeStudentsFile(students) {
  return fs.writeFile(studentsFilePath, JSON.stringify(students, null, 2), 'utf-8');
}

export function getAllStudents() {
  return readStudentsFile();
}

export function getStudentById(id) {
  return readStudentsFile().then((students) => students.find((student) => student.id === id));
}

export function createStudent(name, email) {
  return readStudentsFile().then((students) => {
    const newStudent = {
      id: students.length ? students[students.length - 1].id + 1 : 1,
      name,
      email
    };

    students.push(newStudent);
    return writeStudentsFile(students).then(() => newStudent);
  });
}

export function updateStudent(id, updatedData) {
  return readStudentsFile().then((students) => {
    const index = students.findIndex((student) => student.id === id);
    if (index === -1) return null;

    students[index] = { ...students[index], ...updatedData };
    return writeStudentsFile(students).then(() => students[index]);
  });
}

export function deleteStudent(id) {
  return readStudentsFile().then((students) => {
    const index = students.findIndex((student) => student.id === id);
    if (index === -1) return false;

    students.splice(index, 1);
    return writeStudentsFile(students).then(() => true);
  });
}