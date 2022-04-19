const mongoose=require('mongoose');
const url="mongodb+srv://HarshGupta:harsh@cluster0.hoobx.mongodb.net/Book_Api_2?retryWrites=true&w=majority";
mongoose.connect(url,{
    useNewUrlParser : true,
    useUnifiedTopology : true
});
const dbcon=mongoose.connection;
dbcon.on("error",console.error.bind(console,"Connection Error"));
dbcon.on("open",()=>{
    console.log("DB CONNECTED");
});
module.exports=dbcon;