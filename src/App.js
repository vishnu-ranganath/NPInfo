import React from 'react';
import ParksByActivity from './ParksByActivity';
import './App.css';
import {apiKey} from './api';

import ParkCard from './ParkCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {parks: []};
		this.setParks = this.setParks.bind(this);
	}

	setParks(parkList) {
		this.setState({parks: []});
		let parkCodes = "";

		parkList.map((currPark) => {
			return currPark.parkCode
		}).forEach((x) => {
			parkCodes = parkCodes + "," + x;
		});

		if(parkCodes === "") {
			return;
		}

		parkCodes = parkCodes.slice(1);
		
		const getParksReq = new XMLHttpRequest();
		getParksReq.onreadystatechange = () => {
			if(getParksReq.readyState !== XMLHttpRequest.DONE) {
				return;
			} else if(getParksReq.status === 200) {
				let parkInfo = JSON.parse(getParksReq.responseText);
				console.log(parkInfo);
				this.setState({
					parks: parkInfo.data,
					ready: true
				});
			}
		}
		getParksReq.open("GET", "https://developer.nps.gov/api/v1/parks?api_key=" + apiKey + "&limit=500&parkCode=" + parkCodes, true);
		getParksReq.send();
	}
	
	render() {
		const parkCards = this.state.parks.map((x) => {
			return <ParkCard park={x}/>;
		});

		console.log(this.state.parks);
		
		return (
			<Container className="App">
				<ParksByActivity setParks={this.setParks}/>
				<Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">{parkCards}<br/></Row>
			</Container>
		);
		
	}

}

export default App;