import {useSelector,useStore} from 'react-redux'
import {useState} from 'react';
import {toast} from 'react-toastify'
import { DatePicker, Space,Select } from 'antd';
import {createHotel} from '../actions/hotel'
import HotelCreateForm from '../components/forms/HotelCreateForm'
const {Option}=Select

const Hotel = () =>{
    const { RangePicker } = DatePicker;
    const {auth} = useSelector((state)=>({...state}))
    const {token} = auth;
    const [values,setValues]=useState({
        title:'',
        content:'',
        image:'',
        price:'',
        from:'',
        to:'',
        bed:'',
        
    })
    // destructring all the above values 
    // otherwise we have to access each by value.title and etc
    const { title,content,image,price,from,to,bed }= values;
    const [preview,setPreview] = useState("https://via.placeholder.com/100x100.png?text=HOTEL IMAGE")
    const[location,setLocation]=useState("")

    const  handleSubmit= async (e)=>{
        // request to our backend
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
            let response = await createHotel(token,hotelData)
            console.log(response);
            toast.success('New Hotel is posted')
            // after the toast the filled response will be erased
            setTimeout(()=>{
                window.location.reload();
            },1000)
        }catch(err){
            console.log(err);
            toast.error("error saving")
        }
        // we are able to send data from frontend to backend 
        // create/post a new hotel
        // 1.write a hotel schema (decide what fields can be saved in db)
        // 2.create route
        // 3.create controller
        // 4.send success response after saving into db

    }
    const handleImageChange=(e)=>{
        // console.log(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
        setValues({...values,image:e.target.files[0]})
    }
    const handleChange=(e)=>{
            setValues({...values,[e.target.name]:e.target.value})
    }
    // const hotelForm =()=>{
    //     return(
    //     <form onSubmit={handleSubmit}>
    //         <div className="form-group">
                
    //             <label className="btn btn-outline-secondary btn-block m-2 text-left">
    //             Image
    //                 <input 
    //                 type="file" 
    //                 name="image" 
    //                 onChange={handleImageChange} 
    //                 accept="image/*"
    //                 hidden
    //                 />
    //             </label>
    //             <input type="text" name="title" onChange={handleChange} className="form-control m-2"
    //                 placeholder="Title" value={title}
    //             />
    //             <input type="text" name="content" onChange={handleChange} className="form-control m-2"
    //                 placeholder="description" value={content}
    //             />
    //             <ALgoliaPlaces
    //             className="form control ml-2 mr-2"
    //             placeholder="Location"
    //             defaultValue={location}
    //             option={config}
    //             onChange={({ suggestion })=>
    //                 setLocation(suggestion.value)
    //         }
    //             style={{height:"50px"}}
    //             />
    //             <input type="number" name="price" onChange={handleChange} className="form-control m-2"
    //                 placeholder="price"value={price}
    //             />
    //             {/* <input type="number" name="bed" onChange={handleChange} className="form-control m-2"
    //                 placeholder="Number of Beds"value={bed}
    //             /> */}
    //             <Select 
    //             type="number"
    //             onChange={(value)=> setValues({...values,bed:value})}
    //             className="w-100 m-2"
    //             size="large"
    //             placeholder="Number Of Beds">
    //                 <Option key={1}>{1}</Option>
    //                 <Option key={2}>{2}</Option>
    //                 <Option key={3}>{3}</Option>
    //                 <Option key={4}>{4}</Option>
    //             </Select>
    //         </div>
    //         <DatePicker 
    //             placeholder="From Date"
    //             onChange={(date,dateString)=>setValues({...values,from:dateString})}
    //             disabledDate={(current)=>
    //                 current && current.valueOf() < moment().subtract(1,"days")}
    //         />
    //         {"    "}
    //         <DatePicker 
    //             placeholder="To Date"
    //             onChange={(date,dateString)=>setValues({...values,to:dateString})}
    //             disabledDate={(current)=>
    //                 current && current.valueOf() < moment().subtract(1,"days")}
    //         />
    //         <br/>
    //         <button className="btn btn-outline-primary m-2">Save</button>
    //     </form>
    //     )
    // }
    return(
        // Now we will make a form 
        // Which is Used by sellers to create a post of hotel room
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>Add Hotel</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br />
                    <HotelCreateForm
                        values={values}
                        setValues={setValues}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        handleSubmit={handleSubmit}
                        location={location}
                        setLocation={setLocation}
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
export default Hotel;