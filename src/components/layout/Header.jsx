import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { selectViewTheme } from '../../actions'


const Header = () => {
  const dispatch = useDispatch();
  const viewTheme = useSelector(state => state.covidData.viewTheme)
  return (
        <>
<Nav className="justify-content-end" variant="pills" defaultActiveKey="day" onClick={e=>dispatch(selectViewTheme(e.target.id))}>
  <Nav.Item>
    <Nav.Link className={(viewTheme === "night") ? "btn-grey":""} eventKey='day' id="day">Day</Nav.Link>
  </Nav.Item>
  <Nav.Item >
    <Nav.Link className={(viewTheme === "night") ? "btn-grey":""} eventKey="night" id="night">Night</Nav.Link>
  </Nav.Item>
</Nav>
        </>
    )
}

export default Header
