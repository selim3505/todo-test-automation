import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todos';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
