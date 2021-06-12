import DashboardNav from '../components/DashboardNav'
import ConnectNav from '../components/ConnectNav'
import {Link} from'react-router-dom'
// import {userHotelBooking} from '../actions/hotel'
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
const Dashboard=()=>{
    const {auth:{token}} =useSelector((state)=>({...state}))
    const [booking,setBooking] =useState([])
    
    return(
        // <h1>dashboard</h1>
        <>
        {/* <div className="bg-light d-flex justify-content-between">
            <h1>Dashboard</h1>
        </div> */}
        <div className="container-fluid bg-secondary p-5">
            <ConnectNav/>
        </div>
        <div className="container-fluid p-4">
            <DashboardNav/>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your Bookings</h2>
                </div>
                <div className="col-md-2">
                    <Link to="/" className="btn btn-primary">Browse Hotels</Link>
                </div>
                {/* <div className="col-md-2">
                   {JSON.stringify(booking,null,4)}
                </div> */}
            </div>
        </div>
        </>
    )
}

export default Dashboard;