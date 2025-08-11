import mongoose, { Types } from "mongoose";
import { Schema,model } from "mongoose";
mongoose.connect("mongodb+srv://patidardurgesh3399:Duggu_619@cluster0.6zonmuf.mongodb.net/Brainly")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
const UserSchema =new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,unique:true}
})
const ContentSchema = new mongoose.Schema({
    link:{type:String,required:true},
    type:{type:String,required:true},
    title:{type:String,required:true},
    tags:[{type:Types.ObjectId,ref:"Tag"}],
    userId:{type:Types.ObjectId,ref:"User",required:true}
})
const TagSchema= new mongoose.Schema({
    title:{type:String,unique:true,required:true}
})
const LinkSchema = new mongoose.Schema({
    hash:{type:String,required:true},
    userId:{type:Types.ObjectId,ref:"User",required:true, unique:true}
})

const Tag = mongoose.model("Tag",TagSchema);
const User = mongoose.model("User",UserSchema);
const Content = mongoose.model("Content",ContentSchema);
const Link = mongoose.model("Link",LinkSchema);

export {Tag,User,Content,Link};
