import './App.css';
import React from 'react';
import {apiKey} from './api';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {activityList: [], parks: []};
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

	handleChange = (event) => {
		const activity = event.target.value;
		const parksByActReq = new XMLHttpRequest();
		parksByActReq.onreadystatechange = () => {
			if(parksByActReq.readyState !== XMLHttpRequest.DONE) {
				return;
			} else if(parksByActReq.status === 200) {
				let parkData = JSON.parse(parksByActReq.responseText);
				this.setState({parks: parkData.data[0].parks});
			}
		}
		console.log(activity);
		parksByActReq.open("GET", "https://developer.nps.gov/api/v1/activities/parks?api_key=" + apiKey + "&id=" + activity, true);
		parksByActReq.send();
	}
	
	render() {
		if(apiKey === undefined) {
			return (
				<div className="AllActivities">
					No token!
				</div>
			);
		}
		
		const activities = this.state.activityList.map((a) =>
			<option value={a.id}>{a.name}</option>
		);
		
		activities.unshift(
			<option value={"blank"} hidden={true}>Select an activity</option>
		);

		const parks = this.state.parks.map((a) =>
			<option value={a.parkCode}>{a.name}</option>
		);
		
		parks.unshift(
			<option value={"blank"} hidden={true}>Select a park</option>
		);
		
		return (
			<div className="App">
				<select onChange={this.handleChange}>{activities}</select>
				<br/>
				<select>{parks}</select>
			</div>
		);
		
	}

}

export default App;