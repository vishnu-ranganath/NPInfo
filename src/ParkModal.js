import React from 'react';
import {apiKey} from './api';
import './ParkModal.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

class ParkModal extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isOpen: (this.props.park !== null),
			ready: false,
			webcams: {}
		};
	}

	componentDidMount() {
		if(this.props.park === null) {
			return;
		}
		const camReq = new XMLHttpRequest();
		camReq.onreadystatechange = () => {
			if(camReq.readyState !== XMLHttpRequest.DONE) {
				return;
			} else if(camReq.status === 200) {
				let camData = JSON.parse(camReq.responseText);
				this.setState({ready: true, webcams: camData});
			}
		}
		camReq.open("GET", "https://developer.nps.gov/api/v1/webcams?api_key=" + apiKey + "&parkCode=" + this.props.park.parkCode, true);
		camReq.send();
	}
	
	render() {
		
		if(!this.state.isOpen) {
			return (
				<Modal className="ParkModal" show={false}></Modal>
			);
		}

		if(!this.state.ready) {
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

		let webcamInfo = <span></span>;
		if(this.state.webcams.total === "0") {
			webcamInfo = <h6>None</h6>;
		} else {
			webcamInfo = this.state.webcams.data.map((c) => {
					return <h6 key={c.id}>{c.title}: <a href={c.url}>{c.url}</a> ({c.isStreaming ? "Streaming" : "Not streaming"}, {c.status})</h6>
			})
		}

		let webcamImages = [];

		if(this.state.webcams.total === "0") {
			webcamImages = <h6 key="none">None</h6>;
		} else {
			let numImages = 0;
			this.state.webcams.data.forEach((c) => {
				if(c.images !== []) {
					c.images.forEach((i) => {
						webcamImages.push(
							<Col key={i.id} >
								<div><img className="cam" src={i.url} alt={i.altText}/></div>
								<p>{i.caption} (Credit: {i.credit})</p>
							</Col>
						);
						numImages += 1;
					});
				}
			});
			if(numImages === 0) {
				webcamImages = <h6 key="none">None found.</h6>
			}
		}

		return (
			<Modal className="ParkModal" show={this.state.isOpen} onHide={this.props.closeModal} fullscreen={true} >
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
						<Row className="mb-2 mt-2">
							<h5>Webcams</h5>
							{webcamInfo}
						</Row>
						<Row className="mt-2">
							<h5>Webcam Images</h5>
						</Row>
						<Row className="mb-2">
							{webcamImages}
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}

}

export default ParkModal;