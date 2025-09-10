import express from "express";
import jwt, { decode } from "jsonwebtoken";
import { Content, Link, User } from "./DB";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
const JWT_PASSWORD = "ilovewebd"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup",async (req,res)=>{
    const {username,password}= req.body;
    try{
        await User.create({
        username,
        password
    });
    res.json({
        msg:"you succesfully signup"
    })
    }catch(e){
        console.error("An error occured:",e)
    }
    
})
app.post("/api/v1/signin", async (req,res)=>{
    const {username,password} =  req.body;
    try{
        const existingUser = await User.findOne({
            username,
            password
        })
        if(existingUser){
            const token = jwt.sign({
                id:existingUser._id
            },JWT_PASSWORD)
            res.status(201).json({
                token
            })
        }
        else{
            res.status(404).json({
                msg:"user dosent exist"
            })
        }
    }
    catch(e){
        console.error("error name: ",e )
    }
})
app.post("/api/v1/content",userMiddleware,async (req,res)=>{
        const {link,type,title} = req.body;
        try{
            await Content.create({
                link,
                type,
                title,
                //@ts-ignore
                userId:req.userId,
                tags:[]
            })
            res.status(201).json({msg:"contend added"})
        }
        catch(e){
            console.error("error is : ",e)
             //@ts-ignore
            console.log( req.userId)
        }
})
app.get("/api/v1/content",userMiddleware,async (req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await Content.find({
        userId:userId
    }).populate("userId" ,"username")
    res.json({
        content
    })

})
app.delete("/api/v1/content",userMiddleware,async (req,res)=>{
    const {contentId} = req.body;
    try{
        await Content.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId:req.userId
        })
        res.status(201).json({msg:"content deleted successfully"})
    }
    catch(e){
        console.error("error is this: ",e)
    }
})
app.post("/api/v1/brainly/share",userMiddleware,async (req,res)=>{
    const share = req.body.share;
    try{
        if(share){
            const existinglink = await Link.findOne({
                //@ts-ignore
                userId:req.userId
            })
            if(existinglink){
                res.json({
                    hash:existinglink.hash
                })
                return
            }
            const hash = random(10);
            await Link.create({
                //@ts-ignore
                userId:req.userId,
                hash:hash
            })
            res.json({
                 hash
            })
        }
        else{
            await Link.deleteOne({
                //@ts-ignore
                userId:req.userId
            })
            res.json({
            msg:"removed link"
        })
        }
        
    }
    catch(e){
        console.error("error is : ",e)
    }
})
app.get("/api/v1/brainly/:sharelink",async (req,res)=>{
    const hash = req.params.sharelink;
    try{
        const link = await Link.findOne({
            hash
        })
        if(!link){
            res.status(411).json({
                msg:"sorry incorrect input"
            })
            return
        }
        const content = await Content.find({
            userId:link.userId
        })
        const user = await User.findOne({
            _id:link.userId
        })
        if(!user){
            res.status(411).json({
                msg:"user not found ideally not happens"
            })
            return
        }
        res.json({
            username:user.username,
            content:content,
           
        })
    }
    catch(e){
        console.error("error is : ",e)
    }
})
app.listen(3000);