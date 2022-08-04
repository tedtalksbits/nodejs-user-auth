import express from 'express';
import dotenv from 'dotenv';
import { login, register } from '../controllers/auth.js';
dotenv.config();
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
export default router;
