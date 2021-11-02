import React from 'react';
import ReactDOM from 'react-dom';
import {apiKey} from './api';
import './App.css';

class AllActivities extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {activityList: []};
	}
	
	componentDidMount() {
		const allActReq = new XMLHttpRequest();
		allActReq.onreadystatechange = () => {
			if(allActReq.readyState != XMLHttpRequest.DONE) {
				return;
			} else if(allActReq.status == 200) {
				let activityData = JSON.parse(allActReq.responseText);
				this.setState({activityList: activityData.data});
			}
		}
		allActReq.open("GET", "https://developer.nps.gov/api/v1/activities?api_key=" + apiKey, true);
		allActReq.send();
	}
	
	componentWillUnmount() {
		
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
			<li>{a.name}</li>
		);
		
		return (
			<div className="AllActivities">
				<ul>{activities}</ul>
			</div>
		);
		
	}

}

export default AllActivities;