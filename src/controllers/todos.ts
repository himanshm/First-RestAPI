import { RequestHandler } from 'express';
import { Todo } from '../models/todo';
import { generateGUID } from '../utils/generateGUID';

// every class automatically also acts as a type.

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const newId = generateGUID();
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(newId, text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the Todo.', createdTodo: newTodo }); // Send a response
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  // If index is -1 we didn't find anything in the array

  if (todoIndex < 0) {
    throw new Error('Could not find todo.');
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.status(201).json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo.');
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: 'Todo deleted!' });
};
