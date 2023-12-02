import axios from "axios";

export default class TastyTreatsAPI {
	constructor() {
		this.baseURL = "https://tasty-treats-backend.p.goit.global/api";
		this.recipes = "https://tasty-treats-backend.p.goit.global/api/recipes"
		this.events = "events";
		this.title = "";
		this.category = "";
		this.popular = "";
		this.page = 1;
		this.limit = 9;
		this.time = "";
		this.area = "";
		this.ingredient = "";
		this.id = "";
	}
	getIvents() {
		const url = `${this.baseURL}/${this.events}`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getAllCategories() {
		const url = `${this.baseURL}/categories`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getPopularRecipes() {
		const url = `${this.recipes}/popular`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getFiltredRecepies(newTime, newArea, newIngredient) {
		this.time = newTime;
		this.area = newArea;
		this.ingredient = newIngredient;
		const url = `${this.recipes}?category=${this.category}&page=${this.page}&limit=${this.limit}&time=${this.time}&area=${this.area}&ingredient=${this.ingredient}`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getAllRecepies() {
		const url = `${this.recipes}?limit=${this.limit}`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getCertainCategory(newCategory) {
		this.category = newCategory;

		const url = `${this.recipes}?page=${this.page}&limit=${this.limit}&category=${this.category}`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getRecipeById(id) {
		this.id = id;

		const url = `${this.recipes}/${this.id}`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getListOfAreas() {
		const url = `${this.baseURL}/areas`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getListOfIngredients() {
		const url = `${this.baseURL}/ingredients`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}
	getRecipesByTitle(request) {
		this.title = request;
		const url = `${this.recipes}?title=${this.title}&page=${this.page}&limit=${this.limit}`;

		return axios.get(url)
			.then(response => {
				if (response.status !== 200 || response.data.length === 0) {
					throw new Error(response.data.error);
				}
				return response.data;
			})
	}

}