import User from "../models/user"
import {STRIPE_SECRET} from '../config/keys'
import Stripe from "stripe"
const stripe = Stripe(STRIPE_SECRET)
export const CreateConnectAccount = async(req,res)=>{
    // console.log(req.user);
    // // by this we can access headers
    // console.log(req.headers)

    // console.log("you hit create account endpoint")

    // 1.find user from db
    const user  = await User.findById(req.user._id).exec();
    console.log("User ==>",user)

    // 2. if user dont have stripe account id yet create new one
    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({
            type: "express",
        });
        console.log('ACCOUNT ==>', account)
        user.stripe_account_id=account.id;
        user.save();
    }
    // 3. create account link based on account id (for front end to complete onboarding)
    const accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: STRIPE_URL,
        return_url: STRIPE_URL,
        type: 'account_onboarding',
      });
    accountLink = Object.assign(accountLink,{
        "stripe_user[email]":user.email || undefined,
    })
    console.log(accountLink)

    // 4. update payment schedule {optional } default 2 days
}