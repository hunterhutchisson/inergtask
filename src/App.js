import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { loadData } from "./actions";
import SelectState from "./components/SelectState";
import Map from "./components/Map";
import Plot from "react-plotly.js";

function App() {
  const dispatch = useDispatch();
  const viewTheme = useSelector(state => state.covidData.viewTheme)
  const usData = useSelector(state => state.covidData.usData)
  const chosenState = useSelector(state => state.covidData.chosenState)

  useEffect(() => {
    dispatch(loadData())
  }, [])
  useEffect(() => {
    if(viewTheme === "day"){
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "black";
    }
  }, [viewTheme])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 d-flex justify-content-center">
            <div className={(viewTheme === "day") ? "map d-flex flex-column align-items-center":"map-night d-flex flex-column align-items-center"}>
              <h1>State Breakdowns on Map</h1>
              <Map stateObj={chosenState}/>
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-start flex-column">
            <div className="row">
              <div className="col-12">
                <div className={(viewTheme === "day") ? "us-stats":"us-stats-night"}>
                  <h1>Total US Statistics</h1>
                  Total Positive Cases - {usData.positive} <br/>
                  Active Cases (Hospitalized Currently) - {usData.hospitalizedCurrently} <br/>
                  Deaths - {usData.death} <br/>
                  Recovered - {usData.positive - usData.hospitalizedCurrently - usData.death} <br/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className={(viewTheme === "day") ? "pie":"pie-night"}>
                  <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center flex-column">
                      <SelectState />
                    </div>
                  </div>
                  <div className="row">
                    <div className="margin-top">
                      {chosenState 
                      ? 
                      <>
                      {(viewTheme === "night")
                      ?
                      <Plot data={[{
                            values: [chosenState.hospitalizedCurrently, chosenState.death, (chosenState.positive - chosenState.hospitalizedCurrently - chosenState.death)],
                            labels: ['Active Cases', 'Deaths', 'Recovered'],
                            domain: {row: 0},
                            name: `${chosenState.state} Covid Cases`,
                            hoverinfo: 'label+value',
                            hole: .4,
                            type: 'pie'
                        },
                        {
                            values: [(usData.positive-chosenState.positive), chosenState.positive],
                            labels: ['Rest of the US', chosenState.state],
                            domain: {row: 1},
                            name: `${chosenState.state} vs Rest of the US`,
                            hoverinfo: 'label+value',
                            hole: .4,
                            type: 'pie'
                        }]} 
                        layout={{
                          title: `${chosenState.state} Covid Breakdown`,
                          font: {
                            color: "white"
                          },
                          annotations: [
                              {
                                  font: {
                                  size: 8,
                                  },
                                  showarrow: false,
                                  text: `${chosenState.state} Covid Cases`,
                                  x: 0.5,
                                  y: 0.79
                              },
                              {
                                  font: {
                                  size: 8,
                                  },
                                  showarrow: false,
                                  text: `vs Rest of the US`,
                                  x: 0.5,
                                  y: 0.22
                              }
                          ],
                          height: 560,
                          width: 450,
                          showlegend: false,
                          grid: {rows: 2, columns: 1},
                          plot_bgcolor: '#000000',
                          paper_bgcolor: '#000000'
                        }} />
                        :
                      <Plot data={[{
                            values: [chosenState.hospitalizedCurrently, chosenState.death, (chosenState.positive - chosenState.hospitalizedCurrently - chosenState.death)],
                            labels: ['Active Cases', 'Deaths', 'Recovered'],
                            domain: {row: 0},
                            name: `${chosenState.state} Covid Cases`,
                            hoverinfo: 'label+value',
                            hole: .4,
                            type: 'pie'
                        },
                        {
                            values: [(usData.positive-chosenState.positive), chosenState.positive],
                            labels: ['Rest of the US', chosenState.state],
                            domain: {row: 1},
                            name: `${chosenState.state} vs Rest of the US`,
                            hoverinfo: 'label+value',
                            hole: .4,
                            type: 'pie'
                        }]} 
                        layout={{
                          title: `${chosenState.state} Covid Breakdown`,
                          font: {
                            color: "black"
                          },
                          annotations: [
                              {
                                  font: {
                                  size: 8,
                                  },
                                  showarrow: false,
                                  text: `${chosenState.state} Covid Cases`,
                                  x: 0.5,
                                  y: 0.79
                              },
                              {
                                  font: {
                                  size: 8,
                                  },
                                  showarrow: false,
                                  text: `vs Rest of the US`,
                                  x: 0.5,
                                  y: 0.22
                              }
                          ],
                          height: 560,
                          width: 450,
                          showlegend: false,
                          grid: {rows: 2, columns: 1},
                        }} />
                      }
                        </>
                        :null
                      }
                    </div>
                  </div>
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

