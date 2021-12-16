import { combineReducers } from "redux";
import covidDataReducer from './covidDataReducer'

// state.sample.-key we're accessing from state
let rootReducer = combineReducers({
    covidData: covidDataReducer
})

export default rootReducer