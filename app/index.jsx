import React from 'react'
import ReactDOM from 'react-dom'

import { PanelGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

import AddModal from './Components/AddModal'
import EditModal from './Components/EditModal'

import style from '../scss/style.scss'

if (!localStorage.hasOwnProperty("_evdokimovm_recipes") || !(JSON.parse(localStorage._evdokimovm_recipes).length)) {
	localStorage.setItem("_evdokimovm_recipes", JSON.stringify([
		{
			recipe: "Pumpkin Pie",
			ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]
		},
		{
			recipe: "Spaghetti",
			ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]
		},
		{
			recipe: "Onion Pie",
			ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]
		}
	]))
}

class RecipesBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			recipes: JSON.parse(localStorage.getItem("_evdokimovm_recipes")),
			toggleAddStatus: false,
			toggleEditStatus: false,
			temp: {
				recipe: "",
				ingredients: []
			},
			index: 0
		}
		this.toggleAddModal = this.toggleAddModal.bind(this)
		this.toggleEditModal = this.toggleEditModal.bind(this)
	}
	updateView() {
		this.setState({
			recipes: JSON.parse(localStorage.getItem("_evdokimovm_recipes"))
		})
	}
	clearAll() {
		localStorage._evdokimovm_recipes = JSON.stringify([])
		this.updateView()
	}
	disableClearButton() {
		if (this.state.recipes.length > 0) {
			return false
		} else {
			return true
		}
	}
	toggleAddModal() {
		this.setState({
			toggleAddStatus: ((this.state.toggleAddStatus) ? false : true)
		})
	}
	toggleEditModal() {
		this.setState({
			toggleEditStatus: ((this.state.toggleEditStatus) ? false : true)
		})
	}
	submit() {
		var new_recipe = document.querySelector("#new_recipe").value
		var new_ingredients = document.querySelector("#new_ingredients").value.split(", ")
		var current_recipes = this.state.recipes
		var object = {
			recipe: new_recipe,
			ingredients: new_ingredients
		}
		current_recipes.push(object)
		localStorage._evdokimovm_recipes = JSON.stringify(current_recipes)
		this.updateView()
		this.toggleAddModal()
	}
	save() {
		var edit_recipe = document.querySelector("#edit_recipe").value
		var edit_ingredients = document.querySelector("#edit_ingredients").value.split(", ")
		var current_recipes = this.state.recipes
		var object = {
			recipe: edit_recipe,
			ingredients: edit_ingredients
		}
		current_recipes[this.state.index] = object
		localStorage._evdokimovm_recipes = JSON.stringify(current_recipes)
		this.updateView()
		this.toggleEditModal()
	}
	editRecipe(i) {
		var current_recipe = this.state.recipes[i]
		this.setState({
			temp: current_recipe,
			index: i
		})
		this.toggleEditModal()
	}
	deleteRecipe(i) {
		var current_recipes = this.state.recipes
		current_recipes.splice(i, 1)
		localStorage._evdokimovm_recipes = JSON.stringify(current_recipes)
		this.updateView()
	}
	render() {
		var recipes = this.state.recipes.map((recipe, i) => {
			return <Panel className="panel-primary recipe-header" header={recipe.recipe} key={i} eventKey={i}>
				<ListGroup>
					{recipe.ingredients.map((ingredient, j) => {
						return <ListGroupItem key={j}>{ingredient}</ListGroupItem>
					})}
				</ListGroup>
				<button className="btn btn-primary margin-right" onClick={this.editRecipe.bind(this, i)}>Edit</button>
				<button className="btn btn-danger" onClick={this.deleteRecipe.bind(this, i)}>Delete</button>
			</Panel>
		})
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-6 col-md-offset-3 well well-lg">
						<PanelGroup defaultActiveKey="" accordion>{recipes}</PanelGroup>
						<button className="btn btn-danger margin-right" onClick={this.clearAll.bind(this)} disabled={this.disableClearButton.call(this)}>Clear all</button>
						<button onClick={this.toggleAddModal} className="btn btn-success" id="add">Add recipe</button>
					</div>
				</div>
				<AddModal
					toggleAddModal={this.toggleAddModal}
					toggleAddStatus={this.state.toggleAddStatus}
					submit={this.submit.bind(this)}>
				</AddModal>
				<EditModal
					toggleEditStatus={this.state.toggleEditStatus}
					toggleEditModal={this.toggleEditModal}
					save={this.save.bind(this)}
					recipe={this.state.temp.recipe}
					ingredients={this.state.temp.ingredients.join(", ")}>
				</EditModal>
			</div>
		)
	}
}

ReactDOM.render(
	<RecipesBox />,
	document.getElementById("app")
)
