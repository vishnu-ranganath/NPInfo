import React from 'react';
import ParksByActivity from './ParksByActivity';
import './App.css';

import ParkCard from './ParkCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {parks: []};
		this.setParks = this.setParks.bind(this);
	}

	setParks(parkList) {
		this.setState({parks: parkList});
	}
	
	render() {

		const parks = this.state.parks.map((a) =>
			<option value={a.parkCode}>{a.name}</option>
		);
		
		parks.unshift(
			<option value={"blank"} hidden={true}>Select a park</option>
		);
		
		return (
			<Container className="App">
				<ParksByActivity setParks={this.setParks}/>
				<Row>
					<Col>
						<select id={"parkSelector"}>{parks}</select>
					</Col>
				</Row>
				<ParkCard/>
			</Container>
		);
		
	}

}

export default App;