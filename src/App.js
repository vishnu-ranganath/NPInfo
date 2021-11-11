import './App.css';
import React from 'react';
import ParksByActivity from './ParksByActivity';

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
			<div className="App">
				<ParksByActivity setParks={this.setParks}/>
				<select id={"parkSelector"}>{parks}</select>
			</div>
		);
		
	}

}

export default App;