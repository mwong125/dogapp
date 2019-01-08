
import React from 'react';
import { Button, Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const StyledDate = styled.div`
width: 100%;
height: 100%;
border: 1px solid black;
`;

export default class HiddenDate extends React.Component {
    constructor(props) {
	super(props);
	
	this.passDateInfoUp = this.passDateInfoUp.bind(this);
    }
    passDateInfoUp() {
	this.props.passDateInfoUp(this.props.month, this.props.date);
    }
    render() {
	return(
	    <>
	      <Button onClick={this.passDateInfoUp}>
		{this.props.date}
	      </Button>
	    </>
	);
    }
}
