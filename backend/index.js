import express from 'express';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

//Middleware for handling cors policy
// 1. allowing all origins with default of  cors(*)
 app.use(cors());
// 2. allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['content-Type'],
//     })
// );

app.get('/',(request, response) =>{
   console.log(request)
   return response.status(234).send("welcome"); 
});

app.use('/books',booksRoutes);

mongoose
.connect(mongoDBURL)
.then(() =>{
console.log('App connected to database');
app.listen( PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`);
});
})
.catch((error) =>{
console.log(error);
});