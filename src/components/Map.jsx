import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import Plot from 'react-plotly.js';


const Map = ({stateObj}) => {
    const stateData = useSelector(state => state.covidData.stateData)

    const [dataForBar, setDataForBar] = useState(stateObj ? [{
        y: [stateObj.positive, stateObj.hospitalizedCurrently, (stateObj.positive-stateObj.hospitalizedCurrently-stateObj.death),stateObj.death],
        x: ['Total Cases', 'Active Cases', 'Recovered','Deaths'],
        type: 'bar'
    }]:"")
    const [layoutForBar, setLayoutForBar] = useState(stateObj ? {
        width: 600,
        height: 500,
        title: `${stateObj.state} covid cases`
    }:"")

    const [viewport, setViewport] = useState({
        longitude:-97,
        latitude:40,
        width: "800px",
        height: "500px",
        zoom: 3
    })

    const [showInfo, setShowInfo] = useState(false)
    const [individualShow, setIndividualShow] = useState(null)

    useEffect(() => {
        const listener = (e) => {
            if(e.key === "Escape"){
                setShowInfo(false)
            }
        }
        window.addEventListener("keydown", listener)
        return() =>{
            window.removeEventListener("keydown", listener)
        }
    }, [])
    return (
        <>
            <ReactMapGL {...viewport} 
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
            mapStyle='mapbox://styles/hunterhutch/ckwjv9etg27z614r7bdgamfwl'
            onViewportChange={viewport => {
                setViewport(viewport)
            }}
            >
                {stateObj 
                ?
                <>
                <Marker latitude={stateObj.coordinates.latitude} longitude={stateObj.coordinates.longitude}>
                    <button onClick={(e) => {
              e.preventDefault();
              setShowInfo(!showInfo)
            }}></button>
                </Marker>
                </>
                :
                <>
                    {stateData.map(state=>{
                        return(
                        <Marker latitude={state.coordinates.latitude} longitude={state.coordinates.longitude}>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setShowInfo(!showInfo)
                                setIndividualShow(state)
                                setDataForBar([{
                                    y: [state.positive, state.hospitalizedCurrently, (state.positive-state.hospitalizedCurrently-state.death),state.death],
                                    x: ['Total Cases', 'Active Cases', 'Recovered','Deaths'],
                                    type: 'bar'
                                }])
                                setLayoutForBar({
                                    width: 400,
                                    height: 300,
                                    title: `${state.state} covid cases`
                                })
                            }}></button>
                        </Marker>
                        )
                    })}
                </>
                }


                {(showInfo && stateObj)
                ? 
                <Popup latitude={stateObj.coordinates.latitude} 
                longitude={stateObj.coordinates.longitude}
                onClose={()=>{
                    setShowInfo(false)
                }}
                >
                    <Plot data={dataForBar} layout={layoutForBar} />
                </Popup>
                :null}
                {(showInfo && individualShow)
                ? 
                <Popup latitude={individualShow.coordinates.latitude} 
                longitude={individualShow.coordinates.longitude}
                onClose={()=>{
                    setShowInfo(false)
                    setIndividualShow(null)
                }}
                >
                    <Plot data={dataForBar} layout={layoutForBar} />
                </Popup>
                :null}
            </ReactMapGL>
        </>
    )
}

export default Map
