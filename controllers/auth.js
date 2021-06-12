import User from '../models/user'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/keys'
// export const showMessage=(req,res)=>{
//     // request response handler
//     const details =req.params
//     res.status(200).send(details.message);
// };


export const register =async (req,res)=>{
    // console.log(req.body);
    // destructure from req body
    const {name,email,password} = req.body;
    // validation
    // console.log("test")
    if(!name){
        return res.status(400).send("Name Required")
    }
    if(!password || password.length<6){
        return res.status(400).send("Password is required and should be minimum 6 characters long")
    }
    let userexist = await User.findOne({email}).exec()
    if(userexist){
        return res.status(400).send("Email is Taken ")

    }
    // register
    const user = new User(req.body);
    try{
        await user.save();
        // console.log("USER-created ===>",user);
        return res.json({ok:true})

    }catch(err){
        console.log(err)
        return res.status(400).send("error")

    }


}
export const login = async (req,res)=>{
    // console.log(req.body);
    const { email,password } =req.body;
    
    // let u2 = await User.findOne({password}).exec()
    try{
        let user = await User.findOne({email}).exec()
        console.log("User Exists ",user)
    // if(!email){
    //     res.staus(400).send("email is required");
    // }
    // if(!password || !password.length>6){
    //     res.status(400).send("Password is required ")
    // }
    if(!user){
        return res.status(400).send("User With that Email Not found")
    }
    // compare password first
    user.comparePassword(password,(err,match)=>{
        console.log("compare Password in Login Error ")
        if(!match || err){
            return res.status(400).send("Wrong Password")

        }
        // generate a token for right password
        let token = jwt.sign({_id:user._id},JWT_SECRET,{
            expiresIn:  '2d' 
            // token will expire in 2 days
        })
        // if token is valid then successfull login 
        res.json({token,user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            createsAt:user.createdAt,
            updatedAt:user.updatedAt
        }})
    })
    }catch(err){
        console.log("login Error",err);
        return  res.status(400).send("Sigin Failed !!")
    }
    
    
    
}