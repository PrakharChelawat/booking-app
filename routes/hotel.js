import express from 'express'
// controllers
import {create,displayhotels,image,sellerHotels,removehotel,showmore,updatehotel,searchListings} from '../controllers/hotel.js'
// middlewares
import formidable from 'express-formidable'
import {requireSignin,middlewaretodeleteHotel} from '../middleware'

const router = express.Router()
router.post('/create-hotel',requireSignin,formidable(),create);
// get request to display all hotels on Home Page 
// it does not required any authentication so no need of the middleware "requireSignin"
router.get('/displayhotels',displayhotels);
router.get('/hotel/image/:id',image);
router.get('/seller-hotels',requireSignin,sellerHotels)
router.delete('/delete-hotel/:hotelId',requireSignin,middlewaretodeleteHotel,removehotel)
router.get('/hotel/:hotelId',showmore)
router.put('/update-hotel/:hotelId',requireSignin,formidable(),updatehotel)
router.post('/search-listings',searchListings)
// router.get('/user-hotel-bookings',requireSignin,userHotelBooking)
module.exports =router;