import React from 'react'
import {showmore,differenceDays} from '../actions/hotel'
import {useState,useEffect} from 'react'
import SmallCard from '../components/cards/SmallCard'
import moment from 'moment'
import {useSelector} from 'react-redux'
const ViewHotel=({match,history})=>{
    const [hotels,setHotels] = useState([]);
    const [image,setImage] = useState('')
    const {auth} = useSelector((state)=>({...state}))
    useEffect(()=>{
        loadSellerHotel();
    },[])
    const loadSellerHotel= async ()=>{
        let res=await showmore(match.params.hotelId)
        // console.log(res)
        setHotels(res.data);
        setImage(`/hotel/image/${res.data._id}`)
    }
    const handleClick=(e)=>{
        e.preventDefault();
        if (!auth){
            history.push("/login")
        }
        else
        {
            window.alert("Booking has been Confirmed !!!")
            history.push('/dashboard')

        }
        
    }
        
    return(
        <>
        <div className="container-fluid p-5 text-center">
            <h1>{hotels.title}</h1>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <br/>
                    <img src={image} alt={hotels.title} className="img img-fluid m-2"/>
                </div>
                <div className="col-md-8">
                    <b>{hotels.content}</b>
                    <p className="alert alert-info mt-3">Rs{" "}{hotels.price}</p>
                    <p className="card-text">
                        <span className="float-right text-danger" >for <b>{differenceDays(hotels.from,hotels.to)}</b> {differenceDays(hotels.from,hotels.to)<=1 ? 'day' :'days'}
                        </span>
                    </p>
                    <p>
                        <p>Available From <br/><b>{moment(new Date(hotels.from)).format("MMMM Do YYYY , h:mm:ss a")}</b></p>
                    </p>
                    <p>
                        <p>Available Upto <br/><b>{moment(new Date(hotels.to)).format("MMMM Do YYYY , h:mm:ss a")}</b></p>
                    </p>
                    <i>Posted By <b>{hotels.postedBy && hotels.postedBy.name}</b></i>
                    <br/>
                    <br/>
                    {/* <p>{auth.user.name.toString() === hotels.postedBy.name.toString() ?
                      <button  className="btn btn-primary" >
                       You are Owner
                      </button> : 
                      <button onClick={handleClick} className="btn btn-primary" >
                        {auth && auth.token ? 'Book Now ' :'Login to Book Now'}
                        </button> } 
                    </p> */}
                    
                     {/* <p>{auth.user.name}</p>
                     <p>{hotels.postedBy.name}</p> */}
                     {/* {} */}
                    <button onClick={handleClick}className="btn btn-primary" >
                        {auth && auth.token ? 'Book Now ' :'Login to Book Now'}
                    </button>
                </div>
            </div>
            
        </div>

        </>
    )
}


export default ViewHotel;