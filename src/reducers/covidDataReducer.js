import { LOAD_DATA, SELECT_STATE, VIEW_THEME } from "../actions/types"
import * as  stateCoordList from '../assets/data.json';


const initialState = {
    usData: {},
    stateData: [],
    chosenState: null,
    viewTheme: "day"
}

const covidDataReducer = (state=initialState, action) => {
    switch(action.type){
        case LOAD_DATA:
            let statelist = [...action.data.stateData]
            statelist.map((state, index)=>{
                if(state.state === stateCoordList.states[index].name){
                    return state.coordinates = stateCoordList.states[index]
                }
            })
            return {
                ...state,
                usData: action.data.usData,
                stateData: statelist
            }
        case SELECT_STATE:
            return{
                ...state,
                chosenState: action.data
            }
        case VIEW_THEME:
            return{
                ...state,
                viewTheme: action.data
            }
        default:
            return state
    }
}

export default covidDataReducer