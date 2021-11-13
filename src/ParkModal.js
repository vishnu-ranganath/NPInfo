import React from 'react';

//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';


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

		return (
			<Modal className="ParkModal" show={this.state.isOpen} onHide={this.closeModal} fullscreen={true} >
				<Modal.Header closeButton>
					<Modal.Title>{this.props.park.fullName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>

				</Modal.Body>
			</Modal>
		);
	}

}

export default ParkModal;