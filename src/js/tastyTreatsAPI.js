import axios from "axios";

export default class TastyTreatsAPI {
	constructor() {
		this.baseURL = "https://tasty-treats-backend.p.goit.global/api";
		this.events = "events";
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
}