// Модуль для инициализации слайдеров
import $ from 'jquery';
import 'slick-carousel';

/**
 * Инициализирует галерейный слайдер
 */
export function initGallerySlider() {
	$(".gal-for").on("init reInit afterChange", function (event, slick) {
		$(".gal-content__counter").html(slick.slickCurrentSlide() + 1 + "<span class='devider'>" + "/" + "</span>" + "<span>" + slick.slideCount + "</span>");
		
		const slider = event.currentTarget;
		const parent = slider.parentElement;
		const head = $(parent).find('.gal-content__head')[0];
		if (head) {
			const slideImg = slick.$slides[slick.slickCurrentSlide()].querySelector('img');
			head.textContent = slideImg.alt;
		}
	});

	$('.gal-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		rows: false,
		adaptiveHeight: true,
		asNavFor: '.gal-nav'
	});

	$('.gal-nav').slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		asNavFor: '.gal-for',
		rows: false,
		arrows: false,
		focusOnSelect: true,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 6,
			}
		}, {
			breakpoint: 1023,
			settings: {
				slidesToShow: 5,
			}
		}]
	});

	$('.gal-init, .c-object-card__item').click(function () {
		$('.gal-for').slick('refresh');
		$('.gal-nav').slick('refresh');
	});
}

/**
 * Инициализирует мобильные слайдеры услуг
 */
export function initServicesSliders() {
	if ($(".services-mob").length) {
		$(".services-mob").each(function () {
			$(this).slick({
				slidesToShow: 1,
				rows: false,
				dots: true,
				arrows: false,
			});
		});
	}
}

/**
 * Инициализирует слайдеры карточек объектов
 */
export function initObjectCardSliders() {
	$(".c-object-card__slider").on("init reInit afterChange", function (event, slick) {
		$(".c-object-card__counter").html(slick.slickCurrentSlide() + 1 + "<span class='devider'>" + "/" + "</span>" + "<span>" + slick.slideCount + "</span>");
	});

	if ($(".c-object-card__slider").length) {
		$(".c-object-card__slider").each(function () {
			$(this).slick({
				slidesToShow: 1,
				rows: false,
				arrows: false,
			});
		});
	}
}

/**
 * Инициализирует слайдеры элементов объектов
 */
export function initObjectItemSliders() {
	if ($(".object-item__slider").length) {
		$(".object-item__slider").each(function () {
			const dots = $(this).closest('.slider-block').find('.slider-dots');
			const nextArrow = $(this).closest('.slider-block').find('.slider-nav__arrow--next');
			const prevArrow = $(this).closest('.slider-block').find('.slider-nav__arrow--prev');

			$(this).slick({
				slidesToShow: 1,
				rows: true,
				dots: true,
				appendDots: dots,
				prevArrow: prevArrow,
				nextArrow: nextArrow,
			});
		});
	}
}

/**
 * Инициализирует рекламные слайдеры
 */
export function initReklSliders() {
	if ($(".rekl-slider .row").length) {
		$(".rekl-slider .row").each(function () {
			$(this).not(".slick-initialized").slick({
				rows: false,
				arrows: false,
				slidesToShow: 1,
				mobileFirst: true,
				dots: true,
				responsive: [{
					breakpoint: 1023,
					settings: 'unslick'
				}, {
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
					}
				}]
			});
		});
	}
}

/**
 * Инициализирует блог слайдеры
 */
export function initBlogSliders() {
	if ($(".blog-slider").length) {
		$(".blog-slider").each(function () {
			$(this).not(".slick-initialized").slick({
				rows: false,
				arrows: false,
				slidesToShow: 1,
				variableWidth: true,
				mobileFirst: true,
				responsive: [{
					breakpoint: 1023,
					settings: 'unslick'
				}, {
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
					}
				}]
			});
		});
	}
}

/**
 * Инициализирует слайдеры способов
 */
export function initWaySliders() {
	if ($(".way-slider").length) {
		$(".way-slider").each(function () {
			const nextArrow = $(this).closest('.slider-block').find('.slider-nav__arrow--next');
			const prevArrow = $(this).closest('.slider-block').find('.slider-nav__arrow--prev');

			$(this).not(".slick-initialized").slick({
				slidesToShow: 1,
				pauseOnFocus: false,
				pauseOnHover: false,
				speed: 900,
				rows: false,
				infinite: false,
				prevArrow: prevArrow,
				nextArrow: nextArrow,
				focusOnSelect: true,
				mobileFirst: true,
				responsive: [{
					breakpoint: 1023,
					settings: 'unslick'
				}]
			});

			$(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				$(".way-tabs__nav-item").removeClass("active").eq($(currentSlide).index()).addClass("active");
				$(".way-tabs__content-item").hide().eq(nextSlide).fadeIn();
				console.log(currentSlide);
			});
		});
	}
}

/**
 * Инициализирует слайдеры функций
 */
export function initFeaturesSliders() {
	if ($(".features-box").length) {
		$(".features-box").each(function () {
			$(this).not(".slick-initialized").slick({
				slidesToShow: 1,
				arrows: false,
				dots: true,
				rows: false,
				adaptiveHeight: true,
				mobileFirst: true,
				responsive: [{
					breakpoint: 1023,
					settings: 'unslick'
				}, {
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
					}
				}]
			});
		});
	}
}

/**
 * Инициализирует слайдеры позиций
 */
export function initPosSliders() {
	if ($(".pos-content .row").length) {
		$(".pos-content .row").each(function () {
			$(this).not(".slick-initialized").slick({
				slidesToShow: 1,
				arrows: false,
				dots: true,
				rows: false,
				adaptiveHeight: true,
				mobileFirst: true,
				responsive: [{
					breakpoint: 1023,
					settings: 'unslick'
				}, {
					breakpoint: 767,
					settings: 'unslick'
				}, {
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
					}
				}]
			});
		});
	}
}

/**
 * Инициализирует обработчик ресайза для всех слайдеров
 */
export function initSlidersResize() {
	$(window).on('resize', function () {
		$(".blog-slider").slick('resize');
		$(".way-slider").slick('resize');
		$(".features-box").slick('resize');
		$(".pos-content .row").slick('resize');
		$(".rekl-slider").slick('resize');
	});
}

/**
 * Инициализирует все слайдеры
 */
export function initAllSliders() {
	initGallerySlider();
	initServicesSliders();
	initObjectCardSliders();
	initObjectItemSliders();
	initReklSliders();
	initBlogSliders();
	initWaySliders();
	initFeaturesSliders();
	initPosSliders();
	initSlidersResize();
}