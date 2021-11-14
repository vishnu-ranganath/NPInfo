import React from 'react';
import ParksByActivity from './ParksByActivity';
import './App.css';
import {apiKey} from './api';
import ParkCard from './ParkCard';
import ParkModal from './ParkModal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			parks: [],
			parkToDisplayInfo: null
		};
		this.setParks = this.setParks.bind(this);
		this.showPark = this.showPark.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	setParks(parkList) {
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
				this.setState({
					parks: parkInfo.data,
					ready: true
				});
			}
		}
		getParksReq.open("GET", "https://developer.nps.gov/api/v1/parks?api_key=" + apiKey + "&limit=500&parkCode=" + parkCodes, true);
		getParksReq.send();
	}

	showPark(park) {
		this.setState({parkToDisplayInfo: park});
	}

	closeModal() {
		this.setState({parkToDisplayInfo: null});
	}
	
	render() {
		const parkCards = this.state.parks.map((x) => {
			return <ParkCard park={x} key={x.parkCode} showPark={this.showPark}/>;
		});

		const modalKey = this.state.parkToDisplayInfo === null ? "blank" : this.state.parkToDisplayInfo.parkCode;
		
		return (
			<Container fluid className="App">
				<ParksByActivity setParks={this.setParks}/>
				<Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">{parkCards}<br/></Row>
				<ParkModal park={this.state.parkToDisplayInfo} key={modalKey} closeModal={this.closeModal}/>
				<Row>
					<Col>Vishnu Ranganath, Nov. 2021</Col>
					<Col>Not affiliated with or endorsed by the U.S. National Parks Service</Col>
				</Row>
			</Container>
		);
		
	}

}

export default App;