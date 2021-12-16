
import { INCREMENT, LOAD_DATA, SELECT_STATE } from "./types"
import axios from 'axios'

export const loadData = () => async dispatch => {
    try{
        let usResponse = await axios.get('https://api.covidtracking.com/v1/us/current.json')
        let statesResponse = await axios.get('https://api.covidtracking.com/v1/states/current.json')
        dispatch({
            type: LOAD_DATA,
            data: {
                usData: usResponse.data[0],
                stateData: statesResponse.data
            }
        })
    } catch(err){
        console.log('err:', err)
    }
}

export const selectState = (state) => {
    return {
        type: SELECT_STATE,
        data: state
    }
}

