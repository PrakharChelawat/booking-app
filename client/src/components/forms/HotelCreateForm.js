import { DatePicker, Space,Select } from 'antd';
import ALgoliaPlaces from 'algolia-places-react';
import moment from 'moment'
const {Option}=Select
// const temp="YJ4A7TCDNF"
// const temp1="9d7d20c79fe285f67321e7e305f92ad9"
// const config={
//     appId:temp,
//     apiKey:temp1,
//     languages:"en",
//     // countries:"au",
// }
const HotelCreateForm = (props) =>{
    const {values,handleChange,handleImageChange,handleSubmit,location,setLocation,setValues} =props;
    const {title,content,price}=values
    return(
        // Now we will make a form 
        // Which is Used by sellers to create a post of hotel room
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                
                <label className="btn btn-outline-secondary btn-block m-2 text-left">
                Image
                    <input 
                    type="file" 
                    name="image" 
                    onChange={handleImageChange} 
                    accept="image/*"
                    hidden
                    />
                </label>
                <input type="text" name="title" onChange={handleChange} className="form-control m-2"
                    placeholder="Title" value={title}
                />
                <input type="textarea" name="content" onChange={handleChange} className="form-control m-2"
                    placeholder="description" value={content}
                />
                {/* <ALgoliaPlaces
                className="form control ml-2 mr-2"
                placeholder="Location"
                defaultValue={location}
                option={config}
                onChange={({ suggestion })=>
                    setLocation(suggestion.value)
            }
                style={{height:"50px"}}
                /> */}
                <input type="text" name="location" onChange={(event)=>{
                        setLocation(event.target.value)
                    }} placeholder="Location" className="form-control m-2" value={location}
                    ></input>
                <input type="number" name="price" onChange={handleChange} className="form-control m-2"
                    placeholder="price"value={price}
                />
                {/* <input type="number" name="bed" onChange={handleChange} className="form-control m-2"
                    placeholder="Number of Beds"value={bed}
                /> */}
                <Select 
                type="number"
                onChange={(value)=> setValues({...values,bed:value})}
                className="w-100 m-2"
                size="large"
                placeholder="Number Of Rooms">
                    <Option key={1}>{1}</Option>
                    <Option key={2}>{2}</Option>
                    <Option key={3}>{3}</Option>
                    <Option key={4}>{4}</Option>
                </Select>
            </div>
            <DatePicker 
                placeholder="From Date"
                onChange={(date,dateString)=>setValues({...values,from:dateString})}
                disabledDate={(current)=>
                    current && current.valueOf() < moment().subtract(1,"days")}
            />
            {"    "}
            <DatePicker 
                placeholder="To Date"
                onChange={(date,dateString)=>setValues({...values,to:dateString})}
                disabledDate={(current)=>
                    current && current.valueOf() < moment().subtract(1,"days")}
            />
            <br/>
            <button className="btn btn-outline-primary m-2">Save</button>
        </form>
        
    )
}
export default HotelCreateForm;