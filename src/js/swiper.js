import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.css';


const swiper = new Swiper('.swiper', {
	slidesPerView: "auto",
	freeMode: true,
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
