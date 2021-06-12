import {combineReducers} from "redux"
import {reducer1} from './auth'
const rootreducer = combineReducers({
    auth:reducer1,
  })
export default rootreducer;