import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const createTodoSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(1000).optional()
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().min(1).max(200).optional(),
  description: Joi.string().max(1000).optional(),
  completed: Joi.boolean().optional()
});
