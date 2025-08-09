// - Модуль для работы с галереей
import $ from 'jquery';
import 'slick-carousel';

/**
 * Инициализирует обработчики открытия галереи
 */
export function initGalleryHandlers() {
	// Функционал фотогалереи
	$(document).on('click', '.gallery-more', function () {
		$('.gallery-list').addClass('active');
		$('body').addClass('hidden');
	});

	$(document).on('click', '.open-gallery', function () {
		$('.gallery-list').addClass('active');
		$('body').addClass('hidden');
	});

	$(document).on('click', '.gallery-list__back, .gallery-list__close', function () {
		$('.gallery-list').removeClass('active');
		$('body').removeClass('hidden');
	});
}

/**
 * Инициализирует модальный слайдер галереи
 */
export function initGalleryModalSlider() {
	// Gallery images modal slider
	$(document).on('click', '.gallery-list-images__item picture:first-child', function () {
		const clickedItem = $(this).closest('.gallery-list-images__item');
		const itemIndex = clickedItem.index();
		const galleryItem = $(this).closest('.gallery-list-item');
		const galleryTitle = galleryItem.find('.gallery-list-item__title').text();

		// Remove existing modal if it exists
		$('#gallery-modal').remove();

		// Create new modal
		$('body').append(createGalleryModalHTML());

		// Set the title
		$('.gallery-modal__title').text(galleryTitle);

		// Get all items from the gallery category
		const allItems = galleryItem.find('.gallery-list-images__item');
		let validSlides = 0;
		let clickedSlideIndex = 0;
		let thumbsHtml = '';
		let slideTitles = [];

		// Prepare thumbnails and main slides
		allItems.each(function (index) {
			const firstPicture = $(this).find('picture:first-child');
			const secondPicture = $(this).find('picture:nth-child(2)');

			if (firstPicture.length > 0) {
				thumbsHtml += `<div class="gallery-modal__thumb" data-index="${validSlides}">${firstPicture.clone().html()}</div>`;

				let slideTitle = '';
				if (secondPicture.length > 0) {
					const titleElement = secondPicture.find('img');
					if (titleElement.length > 0) {
						slideTitle = titleElement.attr('alt');
					}
				}
				slideTitles.push(slideTitle);

				// Add to main slider
				if (secondPicture.length === 0) {
					const slide = $('<div class="gallery-modal__slide"></div>');
					slide.append('<picture>' + firstPicture.clone().html() + '</picture>');
					$('.gallery-modal__slider').append(slide);
				} else {
					const slide = $('<div class="gallery-modal__slide"></div>');
					const clonedPicture = secondPicture.clone();
					clonedPicture.find('.gal-for__slide--title').remove();
					slide.append('<picture>' + clonedPicture.html() + '</picture>');
					$('.gallery-modal__slider').append(slide);
				}

				if (index === itemIndex) {
					clickedSlideIndex = validSlides;
				}

				validSlides++;
			}
		});

		$('.gallery-modal__thumbs').html(thumbsHtml);
		$('#gallery-modal').addClass('active');
		$('body').addClass('hidden');

		if (validSlides > 0) {
			const initialTitle = slideTitles[clickedSlideIndex];
			$('.gallery-modal__slide-title').text(initialTitle);

			// Initialize main slider
			$('.gallery-modal__slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				initialSlide: clickedSlideIndex,
				prevArrow: $('.gallery-modal__arrow--prev'),
				nextArrow: $('.gallery-modal__arrow--next'),
				adaptiveHeight: true,
				infinite: validSlides > 1,
				asNavFor: validSlides !== 9 ? '.gallery-modal__thumbs' : null
			});

			if (validSlides === 9) {
				$('.gallery-modal__thumbs').addClass('custom-thumbs');
			} else {
				$('.gallery-modal__thumbs').slick({
					slidesToScroll: 1,
					asNavFor: '.gallery-modal__slider',
					dots: false,
					arrows: false,
					centerMode: true,
					infinite: false,
					initialSlide: clickedSlideIndex,
					centerPadding: '0px',
					variableWidth: true,
					waitForAnimate: false,
					responsive: [
						{
							breakpoint: 1200,
							settings: { slidesToShow: getThumbsToShow(1200, validSlides) }
						},
						{
							breakpoint: 1023,
							settings: { slidesToShow: getThumbsToShow(1023, validSlides) }
						},
						{
							breakpoint: 767,
							settings: { slidesToShow: getThumbsToShow(767, validSlides) }
						}
					]
				});
			}
		}

		// Update counter immediately
		const current = clickedSlideIndex + 1;
		$('.gallery-modal__counter').html(`${current} / ${validSlides}`);

		// Update counter, title, and thumbnail styles on slide change
		$('.gallery-modal__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			const current = nextSlide + 1;
			$('.gallery-modal__counter').html(`${current} / ${slick.slideCount}`);

			const slideTitle = slideTitles[nextSlide];
			$('.gallery-modal__slide-title').text(slideTitle);

			$('.gallery-modal__thumb').removeClass('active');
			$(`.gallery-modal__thumb[data-index="${nextSlide}"]`).addClass('active');

			if ($('.gallery-modal__thumbs').hasClass('slick-initialized')) {
				$('.gallery-modal__thumbs').slick('slickGoTo', nextSlide, true);
			}
		});

		// Set initial thumbnail styles
		$('.gallery-modal__thumb').removeClass('active');
		$(`.gallery-modal__thumb[data-index="${clickedSlideIndex}"]`).addClass('active');

		// Add thumbnail click handler (moved inside the function to avoid memory leaks)
		function addThumbnailClickHandler() {
			$(document).off('click', '.gallery-modal__thumb'); // Remove previous handlers
			$(document).on('click', '.gallery-modal__thumb', function () {
				const index = $(this).data('index');
				if ($('.gallery-modal__slider').hasClass('slick-initialized')) {
					$('.gallery-modal__slider').slick('slickGoTo', index);
				}
			});
		}

		addThumbnailClickHandler();
	});

		// Function to calculate thumbnails to show
		function getThumbsToShow(breakpoint, slidesCount) {
			const width = breakpoint || $(window).width();
			const slides = slidesCount || 7;

			if (width <= 767) {
				return Math.min(3, slides);
			} else if (width <= 1023) {
				return Math.min(5, slides);
			} else if (width <= 1200) {
				return Math.min(5, slides);
			} else {
				return Math.min(7, slides);
			}
		}

	// Update thumbnail position on window resize
	$(window).on('resize', function () {
		if ($('.gallery-modal__thumbs').hasClass('slick-initialized')) {
			$('.gallery-modal__thumbs').slick('setPosition');
		}
	});
}

/**
 * Инициализирует обработчик ресайза для модального окна галереи
 */
export function initGalleryModalResize() {
	// Update thumbnail position on window resize
	$(window).on('resize', function () {
		if ($('.gallery-modal__thumbs').hasClass('slick-initialized')) {
			$('.gallery-modal__thumbs').slick('setPosition');
		}
	});
}
export function initGalleryModalClose() {
	// Close gallery modal
	$(document).on('click', '.gallery-modal__overlay, .gallery-modal__close', function () {
		closeGalleryModal();
	});

	// Back to gallery from modal
	$(document).on('click', '.gallery-modal__back', function () {
		closeGalleryModal();
	});
}

/**
 * Создает HTML для модального окна галереи
 */
function createGalleryModalHTML() {
	return `
		<div id="gallery-modal" class="gallery-modal">
			<div class="gallery-modal__overlay"></div>
			<div class="gallery-modal__content">
				<div class="gallery-modal__header">
					<div class="gallery-modal__actions">
						<div class="gallery-modal__back">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 19L8 12L15 5" stroke="#0180B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							К галерее
						</div>
					</div>
					<div class="gallery-modal__title"></div>
					<div class="gallery-modal__close">
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="15" cy="15" r="15" fill="#0180B2"></circle>
							<path d="M14.9813 12.4204L16.6707 10.7461C17.5998 9.82532 18.6179 8.79883 18.6179 8.79883C18.6179 8.79883 19.4639 9.64473 20.1642 10.345L21.4375 11.6183L19.6297 13.4402L17.8218 15.262L19.6294 17.0836L21.4372 18.9054L20.031 20.3116L18.6247 21.7179L16.8034 19.9103L14.9819 18.1031L13.23 19.8393L11.4779 21.5758L10.0727 20.1706L8.66751 18.7654L10.4038 17.0138L12.1397 15.262L10.4038 13.5101L8.66751 11.7586L10.0727 10.3534L11.4779 8.94819L13.2295 10.6844L14.9813 12.4204Z" fill="white"></path>
						</svg>
					</div>
				</div>
				<div class="gallery-modal__slider-body">
					<div class="gallery-modal__nav">
						<div class="gallery-modal__arrow gallery-modal__arrow--prev">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 6L9 12L15 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div class="gallery-modal__arrow gallery-modal__arrow--next">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9 6L15 12L9 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					</div>
					<div class="gallery-modal__slider"></div>
				</div>
				<div class="gallery-modal__slide-title"></div>
				<div class="gallery-modal__counter"></div>
				<div class="gallery-modal__thumbs"></div>
			</div>
		</div>
	`;
}

/**
 * Закрывает модальное окно галереи
 */
function closeGalleryModal() {
	const $modal = $('#gallery-modal');
	
	$modal.removeClass('active');
	$('body').removeClass('hidden');

	setTimeout(function () {
		if ($('.gallery-modal__slider').hasClass('slick-initialized')) {
			$('.gallery-modal__slider').slick('unslick');
		}

		if ($('.gallery-modal__thumbs').hasClass('slick-initialized')) {
			$('.gallery-modal__thumbs').slick('unslick');
		}

		$(window).off('resize');
		$(document).off('click', '.gallery-modal__thumb');
		$modal.remove();
	}, 300);
}

/**
 * Инициализирует всю функциональность галереи
 */
export function initGallery() {
	initGalleryHandlers();
	initGalleryModalSlider();
	initGalleryModalResize();
	initGalleryModalClose();
}