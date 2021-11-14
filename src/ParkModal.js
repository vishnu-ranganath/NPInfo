import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';

class ParkModal extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isOpen: (this.props.park !== null)
		};
		this.closeModal = this.closeModal.bind(this);
	}

	closeModal() {
		this.props.closeModal();
	}
	
	render() {
		
		if(!this.state.isOpen) {
			return (
				<Modal className="ParkModal" show={false}></Modal>
			);
		}

		const activities = this.props.park.activities.map((x) => {
			return x.name;
		}).join(", ");

		let address = <span></span>;
		this.props.park.addresses.forEach((a) => {
			if(a.type === "Physical") {
				address = <span>{a.line1}, {a.city}, {a.stateCode}, {a.postalCode}</span>;
			}
			return;
		});

		let phoneNumber = <span></span>;
		this.props.park.contacts.phoneNumbers.forEach((n) => {
			if(n.type === "Voice") {
				phoneNumber = <a href={"tel:1-" + n.phoneNumber}>{n.phoneNumber}</a>;
				return;
			}
		});

		let email = <span></span>;
		if(this.props.park.contacts.emailAddresses.length > 0) {
			email = <a href={"mailto:" + this.props.park.contacts.emailAddresses[0].emailAddress}>{this.props.park.contacts.emailAddresses[0].emailAddress}</a>
		}

		return (
			<Modal className="ParkModal" show={this.state.isOpen} onHide={this.closeModal} fullscreen={true} >
				<Modal.Header closeButton>
					<Modal.Title>{this.props.park.fullName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container fluid>
						<Row className="mb-2 mt-2">
							<Col>
							<h5>Location</h5>
							<h6>U.S. States &amp; Territories Spanned: {this.props.park.states.split(",").join(", ")}</h6>
							<h6>Geographic Coordinates: ({this.props.park.latitude}, {this.props.park.longitude})</h6>
							<h6>Address: {address}</h6>
							</Col>
							<Col>
							<h5>Contact</h5>
							<h6>Website: <a href={this.props.park.url}>{this.props.park.url}</a></h6>
							<h6>Phone: {phoneNumber}</h6>
							<h6>Email: {email}</h6>
							</Col>
						</Row>
						<Row className="mb-2 mt-2">
							<h5>Description</h5>
							<h6>{this.props.park.description}</h6>
						</Row>
						<Row className="mb-2 mt-2">
							<h5>Activities</h5>
							<h6>{activities}</h6>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}

}

export default ParkModal;