// Модуль для обработчиков интерфейса
import $ from 'jquery';
import 'jquery-sticky';

/**
 * Инициализирует sticky навигацию
 */
export function initStickyNavigation() {
	if ($('.main-nav').length) {
		$('.main-nav').on('sticky-start', function () {
			$('.header').addClass('sticker');
		});

		$('.main-nav').on('sticky-end', function () {
			$('.header').removeClass('sticker');
		});

		$(".main-nav").sticky({ topSpacing: 0 });
	}
}

/**
 * Инициализирует фильтры
 */
export function initFilters() {
	// Открытие/закрытие фильтров
	$('.filter-toggler').click(function () {
		$('.filter-sidebar').addClass('open');
	});

	$('.filter-close').click(function () {
		$('.filter-sidebar').removeClass('open');
	});

	// Обработка кнопок лайков в модальных окнах
	$('.c-object-like, .modal-like').click(function () {
		$(this).toggleClass('active');
	});
}

/**
 * Инициализирует плавную прокрутку к секциям
 */
export function initSmoothScroll() {
	$('.main-list a[href*="#"]').on('click', function (e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 90
		}, 750, 'linear');
	});
}

/**
 * Инициализирует табы
 */
export function initTabs() {
	$(".way-tabs__content-item").not(":first").hide();
	$(".way-tabs__nav-item").click(function () {
		$(".way-tabs__nav-item").removeClass("active").eq($(this).index()).addClass("active");
		$(".way-tabs__content-item").hide().eq($(this).index()).fadeIn();
	}).eq(0).addClass("active");
}

/**
 * Инициализирует функциональность "Показать больше" в фильтрах
 */
export function initFilterShowMore() {
	let $ShowHideMore = $('.filter-sidebar__body');
	$ShowHideMore.each(function () {
		var $times = $(this).children('.filter-sidebar__checkbox');
		if ($times.length > 5) {
			$ShowHideMore.children(':nth-of-type(n+6)').addClass('moreShown').hide();
			$(this).find('.filter-more').addClass('more-times').html('Показать все');
		}
	});

	$(document).on('click', '.filter-sidebar__body > .filter-more', function () {
		var that = $(this);
		var thisParent = that.closest('.filter-sidebar__body');
		if (that.hasClass('more-times')) {
			thisParent.find('.moreShown').show();
			that.toggleClass('more-times', 'less-times').html('Скрыть');
		} else {
			thisParent.find('.moreShown').hide();
			that.toggleClass('more-times', 'less-times').html('Показать все');
		}
	});
}

/**
 * Инициализирует кнопку сброса фильтров
 */
export function initFilterReset() {
	document.querySelector('.filter-sidebar__box > button[type="reset"]')?.addEventListener('click', () => {
		location.search = location.search.split('&')[0];
	});
}

/**
 * Инициализирует все обработчики интерфейса
 */
export function initAllUIHandlers() {
	initStickyNavigation();
	initFilters();
	initSmoothScroll();
	initTabs();
	initFilterShowMore();
	initFilterReset();
}