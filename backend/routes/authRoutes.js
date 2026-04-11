import express from 'express';
import { router } from 'express';
import {
  register,
  login,
  getMe,
}from "../controllers/authController";
import { protect } from '../middleware/auth';

router.post('/register', register);

router.post('/login', login);

router.get('/me', protect, getMe);