const express = require("express");
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errrorHandler } = require("./middleware/errorHandlerMiddleware.js");
const cors = require('cors');
const app = express();
dotenv.config();
connectDB();

// Replace 'http://your-react-app-domain.com' with your actual React app's domain
const allowedOrigins = ['https://note-zipper-mern-nine.vercel.app/'];

// app.use(cors({
//   origin: ['https://note-zipper-mern-ob84cqc6c-abdul17097.vercel.app/'],
//   methods: ['GET', 'POST'],
//   credentials: true,
//   preflightContinue: false
// }));
const corsOptions = {origin: 'https://note-zipper-mern-theta.vercel.app/'};

app.use(cors(corsOptions));

app.use(express.json())

app.use(notFound);
app.use(errrorHandler)


app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)
app.get('/', (req,res)=>{
    res.json({success:true});
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})
