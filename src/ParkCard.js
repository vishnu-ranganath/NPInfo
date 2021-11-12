import React from 'react';
//import {apiKey} from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ParkCard extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {park: ""};
	}
	
	componentDidMount() {/*
		const allActReq = new XMLHttpRequest();
		allActReq.onreadystatechange = () => {
			if(allActReq.readyState !== XMLHttpRequest.DONE) {
				return;
			} else if(allActReq.status === 200) {
				let activityData = JSON.parse(allActReq.responseText);
				this.setState({activityList: activityData.data});
			}
		}
		allActReq.open("GET", "https://developer.nps.gov/api/v1/activities?api_key=" + apiKey, true);
		allActReq.send();*/
	}
	
	render() {
		
		return (
			<Row className="ParkCard">
				<Col>

				</Col>
			</Row>
		);
		
	}

}

export default ParkCard;