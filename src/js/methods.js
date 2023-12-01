import TastyTreatsAPI from './tastyTreatsAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
	createCouruselSlide,
	createRecipeCategoriesBtn,
	createPopularRecipeCard,
	createRecipeCard,
	createOpenedRecipeCard
}
	from './functions';
import "./swiper"

const categoriesList = document.querySelector(".left-column__categories-list");
const popularRecipes = document.querySelector(".left-column__popular-recipes");
export const recepiesCards = document.querySelector(".right-column__recepies-cards");
const allCategoriesBtn = document.querySelector(".left-colum__all-categories-btn");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const popupWrap = document.querySelector('.popup-wrap');


export const api = new TastyTreatsAPI();

// Get images for slider ivents
api.getIvents()
	.then(data => {
		let slider = data.reduce((markup, slide) => markup + createCouruselSlide(slide.cook.imgWebpUrl, slide.topic.imgWebpUrl, slide.topic.previewWebpUrl, slide.topic.name, slide.topic.area), "");
		swiperWrapper.insertAdjacentHTML('beforeend', slider);
	})
	.catch(() => {
		Notify.failure("❌ We're sorry, but something went wrong...");
	})

//Get all categories list of name with link
api.getAllCategories()
	.then(data => {
		let categoryLink = data.reduce((markup, category) => markup + createRecipeCategoriesBtn(category.name), "");
		categoriesList.insertAdjacentHTML('beforeend', categoryLink);
	})
	.catch(() => {
		Notify.failure("❌ We're sorry, but something went wrong...");
	})


const onPopularRecipeClick = (event) => {
	event.preventDefault();

	api.getRecipeById(event.currentTarget.dataset.id)
		.then(data => {
			popupWrap.innerHTML = createOpenedRecipeCard(data.title,
				data.youtube,
				data.tags.map(tag => {
					return `<div class="open-rcipe-card__category">#${tag}</div>`;
				}).join(""),
				data.rating,
				data.time,
				data.ingredients.map(ingredient => {
					return `<li class="open-rcipe-card__ingridient">
					<span class="ingridient-title">${ingredient.name}</span>
					<span class="ingridient-measure">${ingredient.measure}</span>
				</li>`
				}).join(""),
				data.instructions,
				data.preview
			);
			document.querySelector(".open-rcipe-card__close").addEventListener('click', () => {
				document.querySelector(".ifr").src = "";
				document.querySelector(".opened-recipe-card").style.display = "none";
				document.querySelector(".overlay").style.display = "none";
			})
		})

}
//Get list of popular recipes	
api.getPopularRecipes()
	.then(data => {
		let popularCard = data.reduce((markup, card) => markup + createPopularRecipeCard(card._id, card.title, card.description, card.preview), "");
		popularRecipes.insertAdjacentHTML('beforeend', popularCard);

		let popCard = document.querySelectorAll(".popular-recipes__card");
		popCard.forEach(card => {
			card.addEventListener('click', onPopularRecipeClick);
		})
	})
	.catch(() => {
		Notify.failure("❌ We're sorry, but something went wrong...");
	})


export const onClickFavoriteHeart = (event) => {
	event.preventDefault();
	console.log(event.currentTarget.dataset.id)
	api.getRecipeById(event.currentTarget.dataset.id)
		.then(data => {
			console.log(data);
		})
}
export const onClickSeeRecipeBtn = (event) => {
	event.preventDefault();
	api.getRecipeById(event.target.dataset.id)
		.then(data => {
			popupWrap.innerHTML = createOpenedRecipeCard(data.title,
				data.youtube,
				data.tags.map(tag => {
					return `<div class="open-rcipe-card__category">#${tag}</div>`;
				}).join(""),
				data.rating,
				data.time,
				data.ingredients.map(ingredient => {
					return `<li class="open-rcipe-card__ingridient">
					<span class="ingridient-title">${ingredient.name}</span>
					<span class="ingridient-measure">${ingredient.measure}</span>
				</li>`
				}).join(""),
				data.instructions,
				data.preview
			);

			document.querySelector(".open-rcipe-card__close").addEventListener('click', () => {
				document.querySelector(".ifr").src = "";
				document.querySelector(".opened-recipe-card").style.display = "none";
				document.querySelector(".overlay").style.display = "none";
			})
		})
}

//Get all recipe with all categories	
api.getAllRecepies()
	.then(data => {
		let recipeCard = data.results.reduce((markup, card) => markup + createRecipeCard(card.preview, card.title, card.description, card.rating, card._id), "");
		recepiesCards.insertAdjacentHTML('beforeend', recipeCard);


		const allFavoriteHearts = document.querySelectorAll('.favorite-heart');
		const allSeeRecipeBtns = document.querySelectorAll('.see-recipe');


		allFavoriteHearts.forEach(heart => {
			heart.addEventListener('click', onClickFavoriteHeart);
		})

		allSeeRecipeBtns.forEach(button => {
			button.addEventListener('click', onClickSeeRecipeBtn);
		})

	})
	.catch(() => {
		Notify.failure("❌ We're sorry, but something went wrong...");
	})


//Function runs when you push a certain category, shows recepi from category you choose	
const checkCategory = (event) => {
	event.preventDefault();

	allCategoriesBtn.classList.remove("active-btn")
	const element = event.target;
	const allElementLi = [...event.currentTarget.children];
	allElementLi.forEach(elemLi => {
		elemLi.classList.remove("active");
	})
	element.classList.add("active");

	api.getCertainCategory(element.id)
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
		.catch(() => {
			Notify.failure("❌ We're sorry, but something went wrong...");
		})

}
//Function runs when you push all categories button and show recepi from all categories
const pushAllcategoriesBtn = (event) => {
	event.preventDefault();

	const allElementLi = [...document.querySelectorAll(".left-column__categories-link")];
	allElementLi.forEach(elemLi => {
		elemLi.classList.remove("active");
	})

	allCategoriesBtn.classList.add("active-btn")


	api.getAllRecepies()
		.then(data => {
			let recipeCard = data.results.reduce((markup, card) => markup + createRecipeCard(card.preview, card.title, card.description, card.rating, card._id), "");
			recepiesCards.innerHTML = recipeCard;
		})
		.catch(() => {
			Notify.failure("❌ We're sorry, but something went wrong...");
		})

}




allCategoriesBtn.addEventListener('click', pushAllcategoriesBtn);
categoriesList.addEventListener('click', checkCategory);


//////////////////////////////////////////////////


