import express from 'express';

import { fetchImageController, loginController, registerController } from '../controllers/auth.js';
const router=express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.get('/fetchImage/:id',fetchImageController);
export default router;