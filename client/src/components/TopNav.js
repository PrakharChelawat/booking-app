import {Link} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
const TopNav = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {auth} =useSelector((state)=>({...state}))
    // to logout the user we will empty it from redux state and localstorage too
    const logout =()=>{
        dispatch({
            type:"LOGOUT",
            payload:null
        });
        window.localStorage.removeItem("auth")
        history.push('/login')
    }
    return(
        <div className="nav bg-light d-flex justify-content-between">
            <Link className="nav-link" to="/">Home</Link>
            {auth!==null  && (
                <>
                <Link className="nav-link" to="/dashboard">
                    Dashboard
                </Link>
                <Link className="nav-link" onClick={logout}>
                    Logout
                </Link>

                </>
            )}
            {auth==null &&(
                <>
                <Link className="nav-link" to="/login">
                    Login
                </Link>
                <Link className="nav-link" to="/register">
                    Register
                </Link>
                </>
            )}
        </div>
    )
    };
export default TopNav;