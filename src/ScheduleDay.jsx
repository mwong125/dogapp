
import React from 'react';
import styled from 'styled-components';
import { Container, Col, Row } from 'reactstrap';

const StyledScheduleDay = styled.div`
margin-top: .5rem;
width: 8rem;
border: 1px solid black;
`;

const StyledBackgroundHour = styled.div`
height: 2rem;
width: 100%;
border: 1px solid blue
`;

const StyledScheduleEvent = styled.div`
background: black;
width: 100%;
`;

class BackgroundHour extends React.Component {
    constructor(props) {
	super(props);
    }
    render() {
	return (
	    <>
	      <StyledBackgroundHour>
		{this.props.hour}
	      </StyledBackgroundHour>
	    </>
	);
    }
}

class ScheduleEvent extends React.Component {
    constructor(props) {
	super(props);
    }
    render() {
	let sitEvent = this.props.sitEvent;
	return(
	    <>
	      <StyledScheduleEvent style={{height: (sitEvent.duration*2)+"rem", marginTop: (sitEvent.hour*2)+"rem" }}>
		
	      </StyledScheduleEvent>
	    </>
	);
    }
}

export default class ScheduleDay extends React.Component {
    constructor(props) {
	super(props);
	this.background_array = (new Array(24)).fill().map((_,i) => <BackgroundHour key={i} hour={i}/>);
    }
    render() {
	console.log(this.props.dateEventArray);
	return(
	    <>
	      <StyledScheduleDay>
		<Container style={{padding: "0"}}>
		  <Row>
		    <Col xs="12">
		      { this.background_array.map((hour) => hour)}
		    </Col>
		    <Col xs="12" style={{marginLeft: "-100%"}}>
		      { (this.props.dateEventArray == undefined || this.props.dateEventArray == false) ? <></> : this.props.dateEventArray.map((sitEvent,i) => <ScheduleEvent key={i} sitEvent={sitEvent}/> ) }
	             </Col>
		  </Row>
		</Container>
	      </StyledScheduleDay>
	    </>
	);
    }
}
