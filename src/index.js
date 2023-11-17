import 'normalize.css';
import TastyTreatsAPI from './js/tastyTreatsAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCouruselSlide } from './js/funcions';
import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.css';





const swiperWrapper = document.querySelector(".swiper-wrapper");

const api = new TastyTreatsAPI();

api.getIvents()
	.then(data => {
		let slider = data.reduce((markup, slide) => markup + createCouruselSlide(slide.cook.imgWebpUrl, slide.topic.imgWebpUrl, slide.topic.previewWebpUrl, slide.topic.name, slide.topic.area), "");
		swiperWrapper.insertAdjacentHTML('beforeend', slider);
	})


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

