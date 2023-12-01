import { api, recepiesCards, onClickFavoriteHeart, onClickSeeRecipeBtn } from "./methods";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createRecipeCard } from "./functions"

const timeSelector = document.querySelector(".time");
const areaSelector = document.querySelector(".area");
const ingredientsSelector = document.querySelector(".ingredients");



for (let i = 5; i <= 120; i += 5) {
	timeSelector.insertAdjacentHTML('beforeend', `<option>${i} min</option>`)
}
const createOption = (name, id) => {
	return `<option id=${id}>${name}</option>`
}



api.getListOfAreas()
	.then(data => {
		let area = data.reduce((markup, area) => markup + createOption(area.name, area._id), "");
		areaSelector.insertAdjacentHTML('beforeend', area);
		//document.getElementById('6462a6f04c3d0ddd28897f9c').setAttribute('selected', 'selected');
	})
	.catch(() => {
		Notify.failure("❌ We're sorry, but something went wrong...");
	})

api.getListOfIngredients()
	.then(data => {
		data.forEach(ingredient => {
			ingredientsSelector.insertAdjacentHTML('beforeend', createOption(ingredient.name, ingredient._id));
		})
	})
	.catch(() => {
		Notify.failure("❌ We're sorry, but something went wrong...");
	})





ingredientsSelector.addEventListener('change', () => {
	const ingredientId = ingredientsSelector.options[ingredientsSelector.selectedIndex].id;
	let str = timeSelector.value;
	let timeSelectorValue = "";
	let area = "";

	api.getFiltredRecepies(timeSelectorValue, area, ingredientId)
		.then(data => {
			let recipeCard = data.results.reduce((markup, card) => markup + createRecipeCard(card.preview, card.title, card.description, card.rating, card._id), "");
			recepiesCards.innerHTML = recipeCard;

			const allFavoriteHearts = document.querySelectorAll('.favorite-heart');
			const allSeeRecipeBtns = document.querySelectorAll('.see-recipe');


			allFavoriteHearts.forEach(heart => {
				heart.addEventListener('click', onClickFavoriteHeart);
			})

			allSeeRecipeBtns.forEach(button => {
				button.addEventListener('click', onClickSeeRecipeBtn);
			})

		})

})


areaSelector.addEventListener('change', () => {
	let ingredientId = "";
	let str = timeSelector.value;
	let timeSelectorValue = "";
	let area = areaSelector.value;

	api.getFiltredRecepies(timeSelectorValue, area, ingredientId)
		.then(data => {
			let recipeCard = data.results.reduce((markup, card) => markup + createRecipeCard(card.preview, card.title, card.description, card.rating, card._id), "");
			recepiesCards.innerHTML = recipeCard;

			const allFavoriteHearts = document.querySelectorAll('.favorite-heart');
			const allSeeRecipeBtns = document.querySelectorAll('.see-recipe');


			allFavoriteHearts.forEach(heart => {
				heart.addEventListener('click', onClickFavoriteHeart);
			})

			allSeeRecipeBtns.forEach(button => {
				button.addEventListener('click', onClickSeeRecipeBtn);
			})

		})

})

timeSelector.addEventListener('change', () => {
	let ingredientId = "";
	let str = timeSelector.value;
	const timeSelectorValue = str.replace(" min", "");
	let area = "";

	api.getFiltredRecepies(timeSelectorValue, area, ingredientId)
		.then(data => {
			let recipeCard = data.results.reduce((markup, card) => markup + createRecipeCard(card.preview, card.title, card.description, card.rating, card._id), "");
			recepiesCards.innerHTML = recipeCard;

			const allFavoriteHearts = document.querySelectorAll('.favorite-heart');
			const allSeeRecipeBtns = document.querySelectorAll('.see-recipe');


			allFavoriteHearts.forEach(heart => {
				heart.addEventListener('click', onClickFavoriteHeart);
			})

			allSeeRecipeBtns.forEach(button => {
				button.addEventListener('click', onClickSeeRecipeBtn);
			})
		})

})