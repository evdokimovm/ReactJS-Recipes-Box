import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class AddModal extends React.Component {
	render() {
		return (
			<Modal show={this.props.toggleAddStatus} onHide={this.props.toggleAddModal}>
				<Modal.Header closeButton>
					<Modal.Title>Add Recipe Form</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<label htmlFor="new_title">Recipe Title:</label>
						<textarea className="form-control" rows="1" id="new_recipe"></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="new_ingredients">Recipe Ingredients Separated by Commas:</label>
						<textarea className="form-control" rows="3" id="new_ingredients"></textarea>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn-primary" onClick={this.props.submit}>Submit</Button>
					<Button className="btn-default" onClick={this.props.toggleAddModal}>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}
