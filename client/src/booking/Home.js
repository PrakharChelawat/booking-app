import {useSelector,useStore} from 'react-redux'
import {allhoteldetails} from '../actions/hotel'
import {useState,useEffect} from 'react'
import SmallCard from '../components/cards/SmallCard'
import Search from '../components/forms/Search.js'
const Home = () =>{
    const [hotels,setHotels] = useState([]);
    const {auth} = useSelector((state)=>({...state}))
    useEffect(() => {
        loadHotels();
    }, [])
    const loadHotels = async()=>{
        let res=await allhoteldetails();
        setHotels(res.data);
    }
    return(
        <>
        <div className="container-fluid p-5 text-center">
        <h1>All Hotels</h1>
     
        </div>
        <div className="container-fluid p-5 text-center">
            <Search/>
        </div>
           {/* <pre>{JSON.stringify(hotels,null,4)}</pre> */}
           {hotels.map((h)=>
           (
           <SmallCard key={h._id} h={h}  />
           )
           )}
        </>
    )
}
export default Home;