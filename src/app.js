import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect("mongodb+srv://gabriel70080:coder@cluster0.yt1in.mongodb.net/adoptame?retryWrites=true&w=majority&appName=Cluster0")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter);
app.use('/', viewsRouter);

app.listen(PORT,()=>console.log(`server on http://localhost:${PORT}`)); 