import Hotel from '../models/hotel'
import fs from 'fs'

export const create= async (req,res)=>{
    // console.log("hello")
    // saving hotel-details in database
    // console.log("req.fields",req.fields);
    // console.log("req.files",req.files);
    try{
        let fields=req.fields;
        let files = req.files;
        let hotel =new Hotel(fields);
        hotel.postedBy=req.user._id
        // handle image
        if(files.image){
            hotel.image.data= fs.readFileSync(files.image.path);
            hotel.image.contentType=files.image.type;   
        }
        hotel.save((err,result)=>{
            if(err){
                console.log("saving hotel error =>",err);
                res.status(400).send("Error Message");
            }
            res.json(result)
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            err:err.message,
        });
    }

};


// display hotel route

export const displayhotels = async (req,res)=>{
    // we have to find the hotel details from out hotel model

    let allhoteldetails = await Hotel.find({}).limit(30).select("-image.data").populate("postedBy","_id name").exec()
    // console.log(allhoteldetails)
    res.json(allhoteldetails);
}

export const image = async (req,res)=>{
    let hotel = await Hotel.findById(req.params.id).exec();
    if(hotel && hotel.image && hotel.image.data){
        res.set('Content-Type',hotel.image.contentType);
        return res.send(hotel.image.data);
    }
}

export const sellerHotels=async (req,res)=>{
    let sellersownhotel= await Hotel.find({postedBy : req.user._id})
    .select("-image.data")
    .populate("postedBy","_id name")
    .exec()
    // console.log(sellersownhotel)
    res.send(sellersownhotel)
}

export const removehotel=async(req,res)=>{
    let hoteltobedeleted = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
    console.log(hoteltobedeleted)
    res.json(hoteltobedeleted)
}

export const showmore=async(req,res)=>{
    let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy","_id name")
    .select("-image.data")
    .exec();
    // console.log("prkahar")
    res.json(hotel)
}

export const updatehotel = async(req,res)=>{
    try{
        let fields = req.fields;
        let files = req.files;
        let data ={ ...fields}
        if(files.image){
            let image={}
            image.data = fs.readFileSync(files.image.path)
            image.contentType = files.image.type;
            data.image= image;
        }
        
        let hoteltobeupdated = await Hotel.findByIdAndUpdate(req.params.hotelId,data,
            {new:true})
        .select("-image.data");
    res.json(hoteltobeupdated)
    }
    catch(err){
        console.log(err);
        res.status(400).send("Hotel Update failed Try Again")
    }
}


export const searchListings=async(req,res)=>{
    const {location,date,bed} = req.body
    console.log({location,date,bed})
    // console.log(date)
    const fromDate =date.split(",")
    // console.log(fromDate)
    let result =await Hotel.find({from:{$gte:new Date(fromDate[0])},location})
    .select("-image.data")
    .exec();
    res.json(result)
}

// export const userHotelBooking=async(req,res)=>{
//     const all =await order.find({orderedBy:req.user._id})
//     .select("-image.data")
//     .populate('hotel','-image.data')
//     .populate('orderedBy','_id name')
//     .exec()
//     res.json(all);
// }
// if you want to be more specific 