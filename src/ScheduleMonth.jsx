
import React from 'react';
import { Button, Collapse, Container, Col, Row } from 'reactstrap';
import styled from 'styled-components';

import HiddenMonth from './HiddenMonth.jsx';

const StyledScheduleRow = styled.div`
margin-top: .5rem;    
margin-bottom: .5rem; 
`;


export default class ScheduleMonth extends React.Component {
    constructor(props) {
	super(props);
	this.toggleView = this.toggleView.bind(this);
	this.passDateInfoUp = this.passDateInfoUp.bind(this);
	this.state = { collapse: false };
    }
    passDateInfoUp(month, date) {
	this.props.passDateInfoUp(month, date);
    }
    toggleView() {
	this.setState({
	    collapse: !this.state.collapse
	});
    }
    render() {
	return(
	    <>
	      <StyledScheduleRow>
		<Container>
		  <Row>
		    <Button onClick={this.toggleView}>
		      <h5>{this.props.month}</h5>
		    </Button>
		  </Row>
		  <Row>
		    <Collapse isOpen={this.state.collapse}>   
		      <HiddenMonth
			passDateInfoUp={this.passDateInfoUp}
			month={this.props.month}
			week_format={this.props.week_format}
			month_format={this.props.month_format}
			/>
		</Collapse>
		  </Row>
		</Container>
	      </StyledScheduleRow>
	    </>
	);
    }
}
