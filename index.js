const express=require('express');
const db=require("./database/db");
const app=express();
const dotenv = require('dotenv');
dotenv.config();
const port='8000';

const userRouter = require('./routes/users.router');
const bookRouter=require("./routes/books.router");
const authRouter=require("./routes/author.router");
const pubRouter=require("./routes/publication.router");

const { authenticateToken } = require("./controllers/users.controller"); 

app.use(express.json());
app.use("/users", userRouter);
app.use("/books", authenticateToken, bookRouter);
app.use("/authors", authenticateToken, authRouter);
app.use("/publications", authenticateToken, pubRouter);

app.listen(port,()=>{
    console.log("Listening");
});