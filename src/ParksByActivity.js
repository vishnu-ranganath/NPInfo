import React from 'react';
import {apiKey} from './api';
import './App.css';

class ParksByActivity extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {parks: []};
	}
	
	componentDidMount() {
		const parksByActReq = new XMLHttpRequest();
		parksByActReq.onreadystatechange = () => {
			if(parksByActReq.readyState !== XMLHttpRequest.DONE) {
				return;
			} else if(parksByActReq.status === 200) {
				let activityData = JSON.parse(parksByActReq.responseText);
				this.setState({parks: activityData.data[0].parks});
			}
		}
		parksByActReq.open("GET", "https://developer.nps.gov/api/v1/activities/parks?api_key=" + apiKey + "&id=94369BFD-F186-477E-8713-AE2A745154DA", true);
		parksByActReq.send();
	}
	
	componentWillUnmount() {
		
	}

	render() {
		if(apiKey === undefined) {
			return (
				<div className="ParksByActivity">
					No token!
				</div>
			);
		}
		
		const parks = this.state.parks.map((a) =>
			<option value={a.parkCode}>{a.name}</option>
		);
		
		return (
			<div className="ParksByActivity">
				<select>{parks}</select>
			</div>
		);
		
	}

}

export default ParksByActivity;