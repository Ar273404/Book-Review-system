import mongoose from "mongoose";

const connectDb = async()=>{
    try{
         await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
         })
         console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection failed",err);
        process.exit(1);
    }
}

export default connectDb;