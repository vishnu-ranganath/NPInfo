import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
				<Card>
					<Card.Img variant="top" src={this.props.park.images[0].url} style={{maxHeight: "9rem", minHeight: "9rem"}}/>
					<Card.Title>{this.props.park.name}</Card.Title>
					<Card.Subtitle className="text-muted">{stateString}</Card.Subtitle>
					<Card.Text style={{maxHeight: "6rem", minHeight: "6rem", overflow: "hidden"}}>{this.props.park.description}</Card.Text>
					<Card.Footer className="text-muted">
						<Card.Link href="" onClick={(event) => {event.preventDefault(); this.props.showPark(this.props.park); }}>Learn More</Card.Link>
					</Card.Footer>
				</Card>
			</Col>
		);
		
	}
}

export default ParkCard;