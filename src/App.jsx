
import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Container } from 'reactstrap';
import styled from 'styled-components';

import ScheduleMonth from './ScheduleMonth.jsx';
import ScheduleDay from './ScheduleDay.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const StyledScheduleRow = styled.div`
margin-top: 1rem;
margin-bottom: 1rem;
`;

class Schedule extends React.Component {
    constructor(props) {
	super(props);
	this.state = { schedule: [] , week_format: [], month_format: [] };
	this.toggleSelectedDate = this.toggleSelectedDate.bind(this);
    }
    toggleSelectedDate(month, date) {
	console.log("selected date is " + month + " the " + date);
	fetch('/api/schedule/date/2019/' + month + '/' + date + '/').then(resObj => resObj.json()).then(data => {
	    this.setState({
		schedule: this.state.schedule,
		week_format: this.state.week_format,
		month_format: this.state.month_format,
		dateSitAcceptArray: data.accept,
		dateSitOfferArray: data.offer,
		dateSitRequestArray: data.request
	    });
	});
    }
    componentDidMount() {
	fetch('/api/schedule/').then(resObj => resObj.json()).then(data => {
	    fetch('/api/schedule/format/').then(resObj2 => resObj2.json()).then(format => {
		this.setState({
		    schedule: data,
		    week_format: format.week,
		    month_format: format.month
		});
	    });
	});
    }								
    render() {
	return(
	    <>
	      <Container>
		<Row>
		  <h2>Schedule</h2>
		</Row>
		<Row>
		  <Container>
		    <Row>
		      <Col xs="2">
			<Row>
			  <ScheduleDay
			    dateSitAcceptArray={this.state.dateSitAcceptArray}
			    dateSitOfferArray={this.state.dateSitOfferArray}
			    dateSitRequestArray={this.state.dateSitRequestArray}
			    />
			</Row>
		      </Col>
		      <Col xs="10">
			{ (this.state.schedule) ? this.state.schedule.map((month,i) =>{
			    return(<Row key={i}><ScheduleMonth
						      passDateInfoUp={this.toggleSelectedDate}
						      month={month.month}
						      week_format={this.state.week_format}
						      month_format={this.state.month_format[i]} />
				   </Row>);
 			}) : <></>  }
	    </Col>
		</Row>
		</Container>
		</Row>
		</Container>
		</>
	);
    }
    
}

ReactDOM.render(<Schedule/>, document.getElementById('root'));
