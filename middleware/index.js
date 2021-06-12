import expressJwt from 'express-jwt'
import Hotel from '../models/hotel'
import {JWT_SECRET} from '../config/keys'
// req.user
export const requireSignin = expressJwt({
    // secret,expiry Date
    secret: JWT_SECRET,
    algorithms:["HS256"],
})

export const middlewaretodeleteHotel = async(req,res,next)=>{
    // we have to find that logged in user is deleting his hotel or not
    let hotel= await Hotel.findById(req.params.hotelId).exec();
    // we are comparing that logged in user id (RHS) is equal to hotel owners id or not(LHS)
    // hotel owners id : hotel.postedBy._id
    // loggedin user id : req.user._id
    let owner = hotel.postedBy._id.toString() === req.user._id.toString()
    if(!owner){
        return res.status(403).send('Unauthorized');
    }
    // callback function is called to continue this
    next();
}