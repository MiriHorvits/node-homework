import express from 'express';
import coursesRoutes from './routes/coursesRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';
import enrollmentsRoutes from './routes/enrollmentsRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);
app.use('/enrollments', enrollmentsRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running successfully', description: 'College management system' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;