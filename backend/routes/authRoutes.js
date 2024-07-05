// Routes for auth related API endpoints

import express from 'express';
import { signUp, signIn, checkAccess, updateProfile, uploadAvatar, retrieveAvatar, refreshToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/check-access', checkAccess);
router.post('/update-profile', updateProfile);
router.post('/upload-avatar', uploadAvatar);
router.get('/retrieve-avatar/:userId', retrieveAvatar);
router.post('/refresh-token', refreshToken);

export default router;
