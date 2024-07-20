import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './Routes/userRoutes.js';
import expenseRoutes from './Routes/expenseRoutes.js';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log(err);
})

const origins=[

]

app.use(cors({
    origin:origins,
    credentials:true,
    methods:['GET','POST','PUT','DELETE']
}));
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('dev'));

app.use('/api/auth/',UserRoutes);
app.use('/api/v1/',expenseRoutes);
app.listen(process.env.PORT,()=>{
    console.log("Server Running Succesfully");
})
