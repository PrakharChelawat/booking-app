import {useState,useEffect} from "react"
import DashboardNav from '../components/DashboardNav'
import ConnectNav from '../components/ConnectNav'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {HomeOutlined} from '@ant-design/icons'
import {CreateConnectAccount} from '../actions/stripe'
import {toast} from 'react-toastify'
import {sellerHotels,deleteHotel} from '../actions/hotel'
// import hotel from "../../../server/models/hotel"
import SmallCard from "../components/cards/SmallCard"
const DashboardSeller=()=>{
    const {auth} =useSelector((state)=>({...state}))
    const [sellerhotel,setSellerhotel] = useState([]);
    const [loading,setLoading] =useState(false);
    useEffect(() => {
        loadHotels();
    }, [])
    const loadHotels = async()=>{
        let {data}=await sellerHotels(auth.token);
        setSellerhotel(data);
    }
    const handleClick=async ()=>{
        setLoading(true);
        try{
            let res=await CreateConnectAccount(auth.token);
            console.log(res)
        }catch(err){
            console.log(err);
            toast.error('Stripe Acoount Error !')
            setLoading(false);
        }

    }
    const handleHotelDelete = async (hotelId)=>{
        
            if(!window.confirm("Are you sure ?")) return;
            // console.log("delte")
            deleteHotel(auth.token,hotelId).then((res)=>{
                toast.success("Hotel deleted Successsfully !!!")
                loadHotels();
                })
        
    }
    const connected=()=>{
        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your Hotels</h2>
                    
                </div>
                <div className="col-md-2">
                    <Link to="/hotel/new" className="btn btn-primary">+ Add New</Link>
                </div>
                <div className="row">
                {/* <pre>{JSON.stringify(sellerhotel,null,4)}</pre> */}
                {
                sellerhotel.map(h=><SmallCard key={h._id} h={h} owner={true} handleHotelDelete={handleHotelDelete} />
                )}
                </div>
            </div>
        </div>
        )
    }
    const notConnected=()=>{
        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    {/* <h2>Connect To Stripe</h2>
                     */}
                     <HomeOutlined className="h1" />
                     <h4>Setup payouts to post hotel rooms</h4>
                     <p className="lead">
                         MERN partners with stripe to transfer earnings to your bank 
                         account
                     </p>
                     <button 
                     onClick={handleClick}
                     disabled={loading} 
                     
                     
                     className="btn btn-primary mb-3">
                         {loading ? "Processing..." : "Setup Payouts"}
                     </button>
                     <p className="text-muted">
                         <small>
                             You'll be redirected to Stripe to complete the onboarding
                             process.
                         </small>
                     </p>
                </div>
            </div>
        </div>
        )
    }
    return(
        // <h1>dashboard</h1>
        <>
        <div className="container-fluid bg-secondary p-5">
            <ConnectNav/>
        </div>
        <div className="container-fluid p-4">
            <DashboardNav/>
        </div>
        {/* <p>Show all hotel that user have posted to sell</p>
        <p>add a button to add new</p> */}
        {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
        {auth && auth.user && auth.user.stripe_seller && auth.user.charges_enabled
            ? connected() : connected()
        
        }
        </>
    
    )
}

export default DashboardSeller;