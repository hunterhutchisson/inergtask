import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { loadData } from "./actions";
import SelectState from "./components/SelectState";
import Map from "./components/Map";
import Plot from "react-plotly.js";

function App() {
  const dispatch = useDispatch();
  const usData = useSelector(state => state.covidData.usData)
  const stateData = useSelector(state => state.covidData.stateData)
  const chosenState = useSelector(state => state.covidData.chosenState)
  useEffect(() => {
    dispatch(loadData())
  }, [])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 d-flex justify-content-center">
            <div className="us-stats">
              <h1>US Statistics</h1>
      Total Positive Cases - {usData.positive} <br/>
      Active Cases (Hospitalized Currently) - {usData.hospitalizedCurrently} <br/>
      Deaths - {usData.death} <br/>
      Recovered - {usData.positive - usData.hospitalizedCurrently - usData.death} <br/>

            </div>
          </div>
        </div>

        <div className="row">
      <div className="col-lg-8 offset-lg-2 d-flex justify-content-center">
        <div className="map d-flex align-items-center">
<Map stateObj={chosenState}/>

        </div>

    </div>
    </div>

        <div className="row">
          <div className="col-lg-8 offset-lg-2 d-flex justify-content-center">
            <div className="pie">
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
      <SelectState />

                </div>

              </div>
              <div className="row">
                <div className="margin-top">

      {chosenState 
      ? 
      <>
      <Plot data={[{
            values: [chosenState.hospitalizedCurrently, chosenState.death, (chosenState.positive - chosenState.hospitalizedCurrently - chosenState.death)],
            labels: ['Active Cases', 'Deaths', 'Recovered'],
            domain: {column: 0},
            name: `${chosenState.state} Covid Cases`,
            hoverinfo: 'label+value',
            hole: .4,
            type: 'pie'
        },
        {
            values: [(usData.positive-chosenState.positive), chosenState.positive],
            labels: ['Rest of the US', chosenState.state],
            domain: {column: 1},
            name: `${chosenState.state} vs Rest of the US`,
            hoverinfo: 'label+value',
            hole: .4,
            type: 'pie'
        }]} 
        layout={{
          title: `${chosenState.state} Covid Breakdown`,
          annotations: [
              {
                  font: {
                  size: 8
                  },
                  showarrow: false,
                  text: `${chosenState.state} Covid Cases`,
                  x: 0.17,
                  y: 0.5
              },
              {
                  font: {
                  size: 8
                  },
                  showarrow: false,
                  text: `vs Rest of the US`,
                  x: 0.85,
                  y: 0.5
              }
          ],
          height: 400,
          width: 600,
          showlegend: false,
          grid: {rows: 1, columns: 2},
          plot_bgcolor: '#000000',
          paper_bgcolor: '#000000'
      }} />
      </>
      :null
    }
                </div>
              </div>

            </div>
            </div>
        </div>
      </div>

    </>
  )
}

export default App

