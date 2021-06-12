import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const {Schema} = mongoose


const userSchema =new Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required"
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:"email is required"
    },
    password:{
        type:String,
        trim:true,
        min:6,
        max:60,
        required:"password is required"
    },
    stripe_account_id:"",
    stripe_seller:{},
    stripeSession:{},
},
{timestamps:true}
)
userSchema.pre("save",function(next){
    let user=this;
    if(user.isModified("password")){
        return bcrypt.hash(user.password,12,function(err,hash){
            if(err){
                console.log("BCRYPT HASH ERR",err);
                return next(err);
            }
            user.password = hash;
            return next();

        })
    }
    else{
        return next();
    }
})
userSchema.methods.comparePassword = function(password,next){
    bcrypt.compare(password,this.password,function(err,match){
        if(err){
            console.log("compare password err",err);
            return next(err,false);

        }
        // if no error we get null
        console.log("Matched Password",match)
        return next(null,match);

    })
}
export default mongoose.model("User",userSchema)