import express from "express";
import dotenv from 'dotenv';
import contactsRoute from "./routes/contacts.js";
import authRoutes from "./routes/auth.js"
import { connectDatabase } from "./congig/dbconnect.js";
import errorMiddleWare from "./middlewares/errors.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

// Handle uncought exceptions
process.on('uncoughtException',(err)=>{
    console.log(`ERROR: ${err}`);
    console.log("Shutting Down due to uncought exceptions");
    process.exit(1);
})

dotenv.config({ path: './congig/config.env' }); // Fix the typo in 'config'
//connect to database
connectDatabase()
const app = express();

app.use(express.json())
app.use(cookieParser())

// Enable CORS for specified origins
const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:3000','https://businessbureau.in'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use("/api/v1", contactsRoute);
app.use("/api/v1", authRoutes);

//using error middleware
app.use(errorMiddleWare)

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${NODE_ENV}`);
});

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err}`);
    console.log('Shutting down server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1)
    })
});
