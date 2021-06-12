import {useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import { DatePicker, Space,Select } from 'antd';
import {showmore,updatehotel} from '../actions/hotel'
import {useSelector} from 'react-redux'
import HotelEditForm from '../components/forms/HotelEditForm'
const { Option } =Select;
const EditHotel=({match})=>{
    useEffect(()=>{
        // console.log(match.params.hotelId)
        loadSellerHotel()

    },[])
    const loadSellerHotel= async ()=>{
        let res=await showmore(match.params.hotelId)
        // console.log(res)
        setValues({...values,...res.data});
        setPreview(`/hotel/image/${res.data._id}`)
    }
    const { RangePicker } = DatePicker;
    const {auth} = useSelector((state)=>({...state}))
    const {token} = auth;
    const [values,setValues]=useState({
        title:'',
        content:'',
        location:'',
        price:'',
        from:'',
        to:'',
        bed:'',
        
    })
    // destructring all the above values 
    // otherwise we have to access each by value.title and etc
    const [image,setImage] = useState('')
    const { title,content,price,from,to,bed,location }= values;
    const [preview,setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW")
    // const[location,setLocation]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault();
        // so that page does not reload
        // console.log(values);
        // console.log(location)
        let hotelData= new FormData();
        // save all our form data in hotelData variable
        hotelData.append('title',title);
        hotelData.append('content',content);
        hotelData.append('location',location);
        hotelData.append('price',price);
        image && hotelData.append('image',image);
        hotelData.append('from',from);
        hotelData.append('to',to);
        hotelData.append('bed',bed);
        console.log([...hotelData])
        try{
            let res= await updatehotel(token,hotelData,match.params.hotelId);
            console.log("updated res is",res)
            toast.success("Updated successfully !!!")

        }catch(err){
            console.log(err);
            toast.error(err.response.data.err)
        }

    }
    const handleImageChange=(e)=>{
        // console.log(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }
    const handleChange=(e)=>{
            setValues({...values,[e.target.name]:e.target.value})
    }
    return(
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>Edit Hotel</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br />
                    <HotelEditForm
                        values={values}
                        setValues={setValues}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="col-md-2">
                    <img 
                    src={preview} 
                    alt="preview_image"
                    className="img img-fluid m-2"
                    />
                {/* used to print the state */}
                {/* <pre>{JSON.stringify(values,null,4)}</pre>
                {JSON.stringify(location)} */}
                </div>
            </div>
        </div>
        </>
    )
}
export default EditHotel;