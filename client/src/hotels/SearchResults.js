import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Search from '../components/forms/Search'
import queryString from 'query-string'
import {searchListings} from '../actions/hotel'
import SmallCard from '../components/cards/SmallCard'
// import hotel from '../../../server/models/hotel'
const SearchResults =()=>{
    const [searchLocation,setsearchLocation] =useState("")
    const [searchDate,setsearchDate] = useState('')
    const [searchBed,setsearchBed]=useState('')
    const [hotels,setHotels] =useState([])
    // when components mounts,get Search params from url and use to send search query to backend
    useEffect(()=>{
        const {location,date,bed} = queryString.parse(window.location.search)
        
        // console.table(location,date,bed)
        // search listing
        searchListings({location,date,bed}).then(res=>{
            console.log("SEARCH RESULTS ==>",res)
            setHotels(res.data)
        })
    },[window.location.search])
    return(
        <>
        <div className="col">
            <br/>
            <Search/>
        </div>
        <div className="container">
            <div className="row">
                {/* Show Search Results/ */}
                {
                    hotels.map(h=><SmallCard h={h} key={h._id}/>)
                }
                {/* <pre>{JSON.stringify(hotels,null,4)}</pre> */}
            </div>
        </div>
        </>
    )
}
export default SearchResults;