// Routes for auth related API endpoints

import express from 'express';
import { signUp, signIn, checkAccess, updateProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/check-access', checkAccess);
router.post('/update-profile', updateProfile);

export default router;
