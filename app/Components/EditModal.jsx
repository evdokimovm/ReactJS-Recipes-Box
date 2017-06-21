import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class EditModal extends React.Component {
	render() {
		return (
			<Modal show={this.props.toggleEditStatus} onHide={this.props.toggleEditModal}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Recipe Form</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<label htmlFor="edit_title">Recipe Title:</label>
						<textarea className="form-control" rows="1" id="edit_recipe" defaultValue={this.props.recipe}></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="edit_ingredients">Recipe Ingredients Separated by Commas:</label>
						<textarea className="form-control" rows="3" id="edit_ingredients" defaultValue={this.props.ingredients}></textarea>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn-primary" onClick={this.props.save}>Save</Button>
					<Button className="btn-default" onClick={this.props.toggleEditModal}>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}
