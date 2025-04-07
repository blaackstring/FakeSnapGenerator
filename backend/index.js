import express from 'express'
import { DbConnect } from './DB/DbConnect.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import Authrouter from './Routes/AuthRoute.js';
dotenv.config();
import cors from 'cors'
import path from 'path'

console.log(process.env.MONGODB_URL)
console.log(process.env.MONGODB_NAME);
const app=express();
DbConnect();



app.use(cookieParser())
app.use(express.json()) //parsing json data from request body
app.use(express.urlencoded({extended:true}))//parsing form data
app.use(cors({
    origin:"http://localhost:5174/",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});


app.use('/api/auth',Authrouter);

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})