import React from 'react'
import {DatePicker,Select} from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import ALgoliaPlaces from 'algolia-places-react';
import moment from 'moment'
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router';
// destructure
const {RangePicker} =DatePicker;
const {Option}=Select
// const temp="YJ4A7TCDNF"
// const temp1="9d7d20c79fe285f67321e7e305f92ad9"
// const config={
//     appId:temp,
//     apiKey:temp1,
//     languages:"en",
//     // countries:"au",
// }


const Search =()=>{
    // state
    // we will search by these three
    const [location,setLocation]= useState("")
    const [bed,setBed] =useState("")
    const [date,setDate] =useState("")
    // we will have a form to search by any of the above three fields
    const history = useHistory();
    const handleSubmit=()=>{
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    }
    return(
        <div className="d-flex pb-4">
            <div className="w-100">
                {/* <ALgoliaPlaces
                    placeholder="Location"
                    defaultValue={location}
                    option={config}
                    onChange={({ suggestion })=>
                        setLocation(suggestion.value)}
                    style={{height:'50px'}}
                
                /> */}

                <input type="text" name="location" onChange={(event)=>{
                        setLocation(event.target.value)
                    }} 
                    placeholder="Location" 
                    value={location}
                    className="form-control"
                    style={{height:"50px"}}
                ></input>
            </div>
            
                <br/>
            <RangePicker onChange={(value,dateString)=>setDate(dateString)} 
            className="w-100"
                disabledDate={(current)=>current && current.valueOf() <moment().subtract(1,'days')}
            
            />
            <Select onChange={(value)=>setBed(value)} 
                className="w-100"
                size="large"
                placeholder="No. of Rooms">
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
            
            </Select>
            <SearchOutlined onClick={handleSubmit} className="btn btn-primary p-3 btn sqaure"></SearchOutlined>
            
        </div>
    )

}
export default Search;