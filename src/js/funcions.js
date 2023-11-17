

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

export { createCouruselSlide };