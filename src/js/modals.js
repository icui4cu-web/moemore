// Модуль для работы с модальными окнами
import $ from 'jquery';
import 'magnific-popup';

/**
 * Инициализирует модальные окна Magnific Popup
 */
export function initModalPopups() {
	if ($('.modal-init').length) {
		$('.modal-init').magnificPopup({
			type: 'inline',
			fixedContentPos: true,
			removalDelay: 500,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			midClick: true
		});
	}

	$('.modal-close').on("click", function () {
		$.magnificPopup.close();
	});
}

/**
 * Инициализирует галерейные модальные окна
 */
export function initGalleryModals() {
	if ($('.gal-init').length) {
		$('.gal-init').magnificPopup({
			type: 'inline',
			fixedContentPos: true,
			removalDelay: 500,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = this.st.el.attr('data-effect');
				},
				open: function () {
					// Дополнительная логика при открытии
				}
			},
			midClick: true
		});
	}
}

/**
 * Инициализирует зум для изображений
 */
export function initImageZoom() {
	if ($('.zoom').length) {
		$('.zoom').magnificPopup({
			type: 'image',
			fixedContentPos: true,
			midClick: true,
			callbacks: {
				open: function () {
					$(".mfp-container").addClass('custom-close');
				}
			},
		});
	}
}

/**
 * Инициализирует все модальные окна
 */
export function initAllModals() {
	initModalPopups();
	initGalleryModals();
	initImageZoom();
}