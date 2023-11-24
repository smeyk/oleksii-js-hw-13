import 'normalize.css';
import TastyTreatsAPI from './js/tastyTreatsAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCouruselSlide, createRecipeCategoriesBtn, createPopularRecipeCard, createRecipeCard } from './js/funcions';
import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.css';



const swiper = new Swiper('.swiper', {
	// Optional parameters
	//effect: "fade",
	direction: 'horizontal',
	observer: true,
	observerParents: true,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true,
	},
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
});


const swiperWrapper = document.querySelector(".swiper-wrapper");
const categoriesList = document.querySelector(".left-column__categories-list");
const popularRecipes = document.querySelector(".left-column__popular-recipes");
const recepiesCards = document.querySelector(".right-column__recepies-cards");
const allCategoriesBtn = document.querySelector(".left-colum__all-categories-btn");
const form = document.querySelector(".filter-form");


const api = new TastyTreatsAPI();

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

//Get list of popular recipes	
api.getPopularRecipes()
	.then(data => {
		let popularCard = data.reduce((markup, card) => markup + createPopularRecipeCard(card._id, card.title, card.description, card.preview), "");
		popularRecipes.insertAdjacentHTML('beforeend', popularCard);
	})
	.catch(() => {
		Notify.failure("❌ We're sorry, but something went wrong...");
	})

//Get all recipe with all categories	
api.getAllRecepies()
	.then(data => {
		let recipeCard = data.results.reduce((markup, card) => markup + createRecipeCard(card.preview, card.title, card.description, card.rating, card._id), "");
		recepiesCards.insertAdjacentHTML('beforeend', recipeCard);
	})
	.catch(() => {
		Notify.failure("❌ We're sorry, but something went wrong...");
	})


//Function runs when you push a certain category, shows recepi from category you choose	
const checkCategory = (event) => {
	event.preventDefault();

	api.getCertainCategory(event.target.id)
		.then(data => {
			let recipeCard = data.results.reduce((markup, card) => markup + createRecipeCard(card.preview, card.title, card.description, card.rating, card._id), "");
			recepiesCards.innerHTML = recipeCard;
		})
		.catch(() => {
			Notify.failure("❌ We're sorry, but something went wrong...");
		})

}
//Function runs when you push all categories button and show recepi from all categories
const pushAllcategoriesBtn = (event) => {
	event.preventDefault();

	api.getAllRecepies()
		.then(data => {
			let recipeCard = data.results.reduce((markup, card) => markup + createRecipeCard(card.preview, card.title, card.description, card.rating, card._id), "");
			recepiesCards.innerHTML = recipeCard;
		})
		.catch(() => {
			Notify.failure("❌ We're sorry, but something went wrong...");
		})

}

const onFavoriteHeartClick = (event) => {
	const favoriteRecepies = [];
	console.log(event.target);
}


categoriesList.addEventListener('click', checkCategory);
allCategoriesBtn.addEventListener('click', pushAllcategoriesBtn);
recepiesCards.addEventListener('click', onFavoriteHeartClick);


console.log(form.elements);
