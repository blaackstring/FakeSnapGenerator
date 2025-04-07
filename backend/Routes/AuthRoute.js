import express from 'express';
import { checkSession, forgetPassword, login, logout, resetPassword, signup } from '../Controllers/AuthController.js';
import { authmiddleware } from '../middleware/authmiddleware.js';


const Authrouter=express.Router(); //help in builing sepreate route without creating new express Instance


Authrouter.post('/Login',login);
Authrouter.post('/Signup',signup);
Authrouter.get('/check-session',authmiddleware,checkSession);
Authrouter.post('/forgetPassword',forgetPassword);
Authrouter.put('/resetPassword/:token',resetPassword);
Authrouter.post('/logout',logout);




export default Authrouter;