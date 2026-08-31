import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export const createBoardSchema = z.object({
  name: z.string().min(2, 'Board name must be at least 2 characters'),
})

export const createTaskSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional().default(''),
  assignee: z.string().optional().default('SU'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  labels: z.array(z.string()).optional().default([]),
  columnId: z.string().optional().default('todo'),
})

export const updateTaskSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  assignee: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  labels: z.array(z.string()).optional(),
}).partial()
