import express from "express";
import { loginUser, registerUser, getAllUsersWithSpend } from '../controllers/usercontroller.js';

const userRouter = express.Router();
// Route for user login
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/all', getAllUsersWithSpend);

export default userRouter;