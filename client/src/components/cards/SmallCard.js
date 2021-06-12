import {differenceDays} from '../../actions/hotel.js'
import {useHistory,Link} from 'react-router-dom'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
const  SmallCard = ({ h , 
    handleHotelDelete =(f)=>f,
    owner=false,
    showViewMoreButton = true,
})=> 
{
    const history=useHistory();
    return(
        
    // <>{JSON.stringify(h)}</>
    <div className="card mb-3">
        <div className="row no-gutters">
            <div className="col-md-4">
                {h.image && h.image.contentType ?(
                    <img src={`/hotel/image/${h._id}`} 
                    className="card-image img img-fluid"
                alt="default hotel image"/> 
                ):
                (
                 <img src="https://via.placeholder.com/900x500.png" 
                    className="card-image img img-fluid"
                alt="default hotel image"/> 
                )}
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h3 className="card-title">
                        {h.title} {"  "}
                    </h3>
                    <h5>
                        <i>Price of hotel</i> - {" "}
                    <span className="float-right-right text-primary">
                        Rs{h.price}
                    </span>
                    </h5>
                    <p className="alert alert-info">{h.location}</p>
                    <p className="card-text">{`${h.content.substring(0,200)}...`}</p>

                    <h6 className="card-text">
                        <span className="float-right text-danger" >for <b>{differenceDays(h.from,h.to)}</b> {differenceDays(h.from,h.to)<=1 ? 'day' :'days'}
                        </span>
                    </h6>
                    <p className="card-text">
                       <b> {h.bed} Rooms</b>
                    </p>
                    <p className="card-text">Available from {new Date(h.from).toLocaleDateString()}</p>
                    {/* <p className="card-text">Available to {new Date(h.to).toLocaleDateString()}</p> */}
                    
                    <div className="d-flex justify-content-between h4">
                    <button 
                    className="btn btn-primary"
                    onClick={()=> history.push(`/hotel/${h._id}`)}
                    >Show More</button>
                    {owner && (
                        <>
                        {/* <Link  
                        to={`hotel/edit/${h._id}`} 
                        className="text-warning"
                        // onClick={()=>handleHotelEdit(h._id)}
                        >
                            <EditOutlined/>
                        </Link>
                        
                        <Link 
                        to={`hotel/delete/${h._id}`} 
                        onClick={()=>handleHotelDelete(h._id)}
                        className="text-danger">
                            <DeleteOutlined/>
                        </Link> */}
                        <Link to={`/hotel/edit/${h._id}`}>
                            <EditOutlined className="text-warning"/>
                        </Link>
                        <DeleteOutlined 
                            onClick={()=>handleHotelDelete(h._id)}
                            className="text-danger"
                            />
                        </>
                    )}
                        
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
    )
}


export default SmallCard;