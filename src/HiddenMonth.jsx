
import React from 'react';
import { Button, Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

import HiddenDate from './HiddenDate.jsx';

export default class HiddenMonth extends React.Component {
    constructor(props) {
	super(props);

	this.passDateInfoUp = this.passDateInfoUp.bind(this);
    }
    passDateInfoUp(month, date) {
	this.props.passDateInfoUp(month, date);
    }
    render() {
	return(
	    <>
	      <Container>
		<Row>
		  { this.props.week_format.map((day,i) => <Col key={i} xs="1" style={{margin: ".5rem", fontSize: ".75rem"}}>{day}</Col>) }
	    </Row>
		{ this.props.month_format.map((week,i) => <Row key={i}>{week.map((date,i) => {
		    return(
			<Col key={i} xs="1" style={{margin: ".5rem", fontSize: ".75rem"}}>
			  { (date != 0) ? <>
			        <HiddenDate passDateInfoUp={this.passDateInfoUp}
						month={this.props.month}
						date={date}  /> 
                              </>
			      : <h6>X</h6>                                                                            
                          }
			</Col>
		    );
		})}</Row>  )}
	    </Container>
	    </>
	);
    }
}
