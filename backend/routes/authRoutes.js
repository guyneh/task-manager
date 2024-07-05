// Routes for auth related API endpoints

import express from 'express';
import { signUp, signIn, checkAccess, updateProfile, uploadAvatar } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/check-access', checkAccess);
router.post('/update-profile', updateProfile);
router.post('/upload-avatar', uploadAvatar);

export default router;
