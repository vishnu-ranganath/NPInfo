import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ParkCard.css';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class ParkCard extends React.Component {

	render() {

		const numStates = this.props.park.states.split(",").length;
		let stateString = "";
		if(numStates === 0) {
			stateString = "";
		} else if(numStates < 5) {
			stateString = this.props.park.states.split(",").join(", ");
		} else {
			stateString = this.props.park.states.split(",").slice(0, 4).join(", ");
		}

		return (
			<Col className="ParkCard">
				<Card className="park-card">
					<Card.Img variant="top" src={this.props.park.images[0].url} className="parkThumbnail"/>
					<Card.Title>{this.props.park.name}</Card.Title>
					<Card.Subtitle className="text-muted">{stateString}</Card.Subtitle>
					<Card.Text className="parkText">{this.props.park.description}</Card.Text>
					<Card.Footer className="text-muted">
						<Card.Link href="" onClick={(event) => {event.preventDefault(); this.props.showPark(this.props.park); }}>Learn More</Card.Link>
					</Card.Footer>
				</Card>
			</Col>
		);
		
	}
}

export default ParkCard;