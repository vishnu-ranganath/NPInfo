import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class ParkCard extends React.Component {
	render() {

		return (
			<Col>
				<Card>
					<Card.Body>
						<Card.Img variant="top" src={this.props.park.images[0].url} />
						<Card.Title>{this.props.park.fullName}</Card.Title>
						<Card.Text>{this.props.park.description}</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		);
		
	}
}

export default ParkCard;