
import React from 'react';
import styled from 'styled-components';
import { Container, Col, Row } from 'reactstrap';

import ScheduleEvent from './ScheduleEvent.jsx';

let acceptBackground = "rgba(59, 247, 137, .5)";
let offerBackground = "rgba(93, 91, 216, .5)";
let requestBackground = "rgba(255, 63, 108, .5)";

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

export default class ScheduleDay extends React.Component {
    constructor(props) {
	super(props);
	this.background_array = (new Array(24)).fill().map((_,i) => <BackgroundHour key={i} hour={i}/>);
	this.leftMarginCount = new Array(24).fill().map((_,i) => 0);
	this.getLeftMargin = this.getLeftMargin.bind(this);
	this.resetLeftMargin = this.resetLeftMargin.bind(this);
    }
    resetLeftMargin() {
	this.leftMarginCount = new Array(24).fill().map((_,i) => 0);
    }
    getLeftMargin(hour, duration) {
	var hour_num_max = 0;
	var hour_num;
	for (var hour_count = hour; hour_count < hour + duration; hour_count++) {
	    hour_num = this.leftMarginCount[hour_count]++;
	    hour_num_max = (hour_num > hour_num_max) ? hour_num : hour_num_max;
	}
	return hour_num_max;   
    }
    render() {
	this.resetLeftMargin();
	return(
	    <>
	      <StyledScheduleDay>
		<Container style={{padding: "0"}}>
		  <Row>
		    <Col xs="12">
		      { this.background_array.map((hour) => hour)}
		    </Col>
		    <Col xs="12" style={{marginLeft: "-100%"}}>
		      { (this.props.dateSitAcceptArray == undefined || this.props.dateSitAcceptArray == false) ? <></> : this.props.dateSitAcceptArray.map((sitEvent,i) => {
		      return(<ScheduleEvent key={i} background={acceptBackground} marginLeft={this.getLeftMargin(sitEvent.hour,sitEvent.duration)} sitEvent={sitEvent}/>); })}
	    { (this.props.dateSitOfferArray == undefined || this.props.dateSitOfferArray == false) ? <></> : this.props.dateSitOfferArray.map((sitEvent,i) => {
                return(<ScheduleEvent key={i} background={offerBackground} marginLeft={this.getLeftMargin(sitEvent.hour,sitEvent.duration)} sitEvent={sitEvent}/>); })}
	    { (this.props.dateSitRequestArray == undefined || this.props.dateSitRequestArray == false) ? <></> : this.props.dateSitRequestArray.map((sitEvent,i) => {
                return(<ScheduleEvent key={i} background={requestBackground} marginLeft={this.getLeftMargin(sitEvent.hour,sitEvent.duration)} sitEvent={sitEvent}/>); })}
	           </Col> 
		  </Row>
		</Container>
	      </StyledScheduleDay>
	    </>
	);
    }
}
