// Модуль для работы с избранным
import { getCookie, setCookie } from './cookies.js';
import $ from 'jquery';

const FAVORITES_COOKIE = "favorites";

/**
 * Инициализирует избранное из cookies
 * @returns {Array} Массив ID избранных элементов
 */
export function initFavorites() {
	return getCookie(FAVORITES_COOKIE);
}

/**
 * Добавляет элемент в избранное
 * @param {string|number} id - ID элемента
 */
export function addToFavorites(id) {
	let favorites = initFavorites();
	if (!favorites.includes(id)) {
		favorites.push(id);
		setCookie(FAVORITES_COOKIE, favorites);
		console.log(`Added to favorites: ${id}`);
	}
}

/**
 * Удаляет элемент из избранного
 * @param {string|number} id - ID элемента
 */
export function removeFromFavorites(id) {
	let favorites = initFavorites();
	favorites = favorites.filter(favId => favId !== id);
	setCookie(FAVORITES_COOKIE, favorites);
	console.log(`Removed from favorites: ${id}`);
}

/**
 * Обновляет отображение избранного на странице
 */
export function updateFavoritesDisplay() {
	const favorites = initFavorites();
	$('.object-item__like, .btn--like').each(function () {
		const id = $(this).data('id');
		if (favorites.includes(id)) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});
	$('.favor span').text(favorites.length);
	console.log(`Favorites count: ${favorites.length}`);
}

/**
 * Инициализирует обработчики событий для избранного
 */
export function initFavoritesHandlers() {
	updateFavoritesDisplay();

	// Обработчик клика по кнопке избранного
	$('.object-item__like, .btn--like').on('click', function () {
		const id = $(this).data('id');
		if (!id) {
			console.error("Элемент не имеет атрибута data-id, избранное не обновлено");
			return;
		}

		console.log(this);

		// Проверяем текущее состояние элемента
		if ($(this).hasClass('active')) {
			removeFromFavorites(id);
			$(this).removeClass('active').hide().show(0);
			console.log(`removeClass: ${id}`);
		} else {
			addToFavorites(id);
			$(this).addClass('active').hide().show(0);
			console.log(`addClass: ${id}`);
		}

		console.log(this);
		updateFavoritesDisplay();
	});
}