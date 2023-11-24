//Function for creating star rating inside recepi cards
const getRating = (rating) => {
	const starsTotal = 5;
	const starPercentage = (rating / starsTotal) * 100;
	const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

	return `<div class="stars-rating">
					<span>${rating}</span>
					<div class="stars-outer">
						<div style="width: ${starPercentageRounded}" class="stars-inner"></div>
					</div>
					<span class="number-rating"></span>
			</div>`

}

//Function creates slide for ivent courusel
const createCouruselSlide = (cookImg, dishImg, zoomDish, nameDish, area) => {
	return `
	<div class="slide swiper-slide">
	<div class="slide__img-wrar">
		<div class="slide-img first" style="background-image: url(${cookImg})"></div>
		<div class="slide-img second" style="background-image: url(${zoomDish})"></div>
		<div class="slide-img third" style="background-image: url(${dishImg})"></div>
	</div>
	<div class="slide-text">
		<h2>${nameDish}</h2>
		<p>${area}</p>
	</div>
	</div>
	`
}
//Function creates list of all categories link
const createRecipeCategoriesBtn = (name) => {
	return `<li class="left-column__categories-link" id = "${name}">${name}</li>`
}
//Create card of popular recepi
const createPopularRecipeCard = (id, title, description, img) => {
	return `<div class="popular-recipes__card" id="${id}">
	<div class="card-img"><img src="${img}" /></div>
	<div class="card-wrap-text">
		<div class="card-title"><h3>${title}</h3></div>
		<div class="card-description">${description}</div>
	</div>
	</div>`
}
//Create recepi card
const createRecipeCard = (bgImg, title, description, rating, id) => {
	return `<div class="recipe-card" id="${id}">
					<div class="recipe-card-img" style="background-image: url(${bgImg})">
					<div class="favorite-heart">
					<i class="fa-thin fa-heart" style="color: #F8F8F8;"></i>
						</div>
						<div class="recipe-card-information">
							<div class="recipe-card-title">${title}</div>
							<div class="recipe-card-description">${description}</div>
					<div class="wrap-rate">
						<div class="recipe-card-rate">${getRating(rating)}</div>
						<button class="see-recipe">See recipe</button>
					</div>
				</div>
					</div>
	</div>`
}



export { createCouruselSlide, createRecipeCategoriesBtn, createPopularRecipeCard, createRecipeCard };