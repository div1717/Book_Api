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

app.use(express.json());
app.use("/users", userRouter);
app.use("/books",bookRouter);
app.use("/authors",authRouter);
app.use("/publications",pubRouter);

app.listen(port,()=>{
    console.log("Listening");
});