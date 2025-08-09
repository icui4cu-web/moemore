import "@scss/index.scss";
import $ from "jquery";

// Импорт модулей
import { initFavoritesHandlers } from './favorites.js';
import { initPhoneMask, initFormValidation } from './forms.js';
import { initAllSliders } from './sliders.js';
import { initAllModals } from './modals.js';
import { initGallery } from './gallery.js';
import { initAllUIHandlers } from './ui-handlers.js';
import { initLoadMore } from './load-more.js';
import './map.js';

/**
 * Инициализация всего приложения
 */
$(function () {
	// Инициализация избранного
	initFavoritesHandlers();

	// Инициализация форм
	initPhoneMask();
	initFormValidation();

	// Инициализация слайдеров
	initAllSliders();

	// Инициализация модальных окон
	initAllModals();

	// Инициализация галереи
	initGallery();

	// Инициализация обработчиков интерфейса
	initAllUIHandlers();

	// Инициализация функционала "Загрузить еще"
    initLoadMore();
});