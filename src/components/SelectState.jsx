import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { selectState } from '../actions'


const SelectState = () => {
    const dispatch = useDispatch();
    const stateData = useSelector(state => state.covidData.stateData)
    const [selectedState, setSelectedState] = useState(null)

    const handleSelectState = (e) => {
        let state = stateData.find(({state})=> state === e.target.value)
        dispatch(selectState(state))
    }
    const handleResetState = () => {
        setSelectedState(null)
        dispatch(selectState(null))
    }
    return (
        <>
        <select defaultValue={selectedState} onChange={handleSelectState}>
          <option hidden value="defaultValue">Pick a State</option>
          {stateData.map(state => {
            return <option key={state.state} value={state.state}>{state.state}</option>
          })}
        </select>

          <button onClick={handleResetState}>Reset</button>
        
        </>
    )
}

export default SelectState
