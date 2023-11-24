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
		this.perPage = 6;
		this.limit = 9;
		this.time = "";
		this.area = "";
		this.ingredient = "";
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
	getFiltredRecepies() {
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
		// https://tasty-treats-backend.p.goit.global/api/recipes?page=1&limit=9&title=&category=Beef&area=&ingredient=&time=
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

}