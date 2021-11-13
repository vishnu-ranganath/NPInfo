import React from 'react';
import {apiKey} from './api';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ParksByActivity extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {activityList: [], parks: []};
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount() {
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
		allActReq.send();
	}

	handleChange(event) {
		const activity = event.target.value;
		const parksByActReq = new XMLHttpRequest();
		parksByActReq.onreadystatechange = () => {
			if(parksByActReq.readyState !== XMLHttpRequest.DONE) {
				return;
			} else if(parksByActReq.status === 200) {
				let parkData = JSON.parse(parksByActReq.responseText);
				this.props.setParks(parkData.data[0].parks);
			}
		}
		parksByActReq.open("GET", "https://developer.nps.gov/api/v1/activities/parks?api_key=" + apiKey + "&id=" + activity, true);
		parksByActReq.send();
	}
	
	render() {
		
		const activities = this.state.activityList.map((a) =>
			<option value={a.id} key={a.id}>{a.name}</option>
		);
		
		activities.unshift(
			<option value={"blank"} key="blank" hidden={true}>Select an activity</option>
		);
		
		return (
			<Row className="ParksByActivity">
				<Col>
					<select onChange={this.handleChange} id={"activitySelector"}>{activities}</select>
				</Col>
			</Row>
		);
		
	}

}

export default ParksByActivity;