
// we will use react-router-dom for placing routes 
import {Route,BrowserRouter,Switch} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from "./components/TopNav"
import PrivateRoute from './Privaterouter.js/PrivalteRouter'
// components
import Home from "./booking/Home"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Dashboard from './user/Dashboard'
import DashBoardSeller from './user/DashBoardSeller'
import Hotel from './hotels/Hotel'
import EditHotel from './hotels/EditHotel'
import SearchResults from './hotels/SearchResults'
import ViewHotel from './hotels/ViewHotel'
function App() {
  return (
    //we will wrap all the routes inside BrowserRouter 
    //and than will use Switch statements

    <BrowserRouter>
    <TopNav/>
    <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
      <PrivateRoute exact path="/dashboard/seller" component={DashBoardSeller}></PrivateRoute>
      <PrivateRoute exact path="/hotel/new" component={Hotel}></PrivateRoute>
      <Route exact path="/hotel/edit/:hotelId" component={EditHotel}></Route>
      <Route exact path="/search-result" component={SearchResults}></Route>
      <Route exact path="/hotel/:hotelId" component={ViewHotel}></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
