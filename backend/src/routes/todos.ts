import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const todoController = new TodoController();

// All todo routes require authentication
router.use(authenticateToken);

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
