// Модуль для работы с картой
import L from 'leaflet';
import $ from 'jquery';

/**
 * Конфигурация карты по умолчанию
 */
const DEFAULT_CONFIG = {
	center: [46.1303932, 30.5151492],
	zoom: 16,
	markerPosition: [46.13128, 30.517616],
	markerIcon: 'img/map-location.svg',
	tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

/**
 * Создает кастомную иконку для маркера
 * @param {string} iconUrl - URL иконки
 * @param {Array} iconSize - Размер иконки [width, height]
 * @returns {L.Icon} Объект иконки Leaflet
 */
function createCustomIcon(iconUrl, iconSize = [39, 48]) {
	const LeafIcon = L.Icon.extend({
		options: {
			iconSize: iconSize,
		}
	});
	
	return new LeafIcon({ iconUrl: iconUrl });
}

/**
 * Инициализирует карту с заданными параметрами
 * @param {string} elementId - ID элемента для карты
 * @param {Object} config - Конфигурация карты
 * @returns {L.Map|null} Объект карты или null, если элемент не найден
 */
export function initMap(elementId = 'map', config = {}) {
	const mapElement = document.getElementById(elementId);
	if (!mapElement) {
		return null;
	}

	const mapConfig = { ...DEFAULT_CONFIG, ...config };

	try {
		const map = L.map(elementId).setView(mapConfig.center, mapConfig.zoom);

		L.tileLayer(mapConfig.tileLayer, {
			attribution: mapConfig.attribution
		}).addTo(map);

		const customIcon = createCustomIcon(mapConfig.markerIcon);
		L.marker(mapConfig.markerPosition, { icon: customIcon }).addTo(map);

		console.log('Карта успешно инициализирована');
		return map;
	} catch (error) {
		console.error('Ошибка при инициализации карты:', error);
		return null;
	}
}

/**
 * Добавляет дополнительный маркер на карту
 * @param {L.Map} map - Объект карты
 * @param {Array} position - Координаты маркера [lat, lng]
 * @param {Object} options - Опции маркера
 * @returns {L.Marker|null} Объект маркера или null при ошибке
 */
export function addMarker(map, position, options = {}) {
	if (!map || !position) {
		console.error('Не указана карта или позиция для маркера');
		return null;
	}

	try {
		const markerOptions = {};

		if (options.iconUrl) {
			markerOptions.icon = createCustomIcon(options.iconUrl, options.iconSize);
		}

		const marker = L.marker(position, markerOptions).addTo(map);

		if (options.popup) {
			marker.bindPopup(options.popup);
		}

		return marker;
	} catch (error) {
		console.error('Ошибка при добавлении маркера:', error);
		return null;
	}
}

/**
 * Изменяет центр карты и зум
 * @param {L.Map} map - Объект карты
 * @param {Array} center - Новые координаты центра [lat, lng]
 * @param {number} zoom - Новый уровень зума
 */
export function setMapView(map, center, zoom) {
	if (!map || !center) {
		console.error('Не указана карта или координаты центра');
		return;
	}

	try {
		map.setView(center, zoom || map.getZoom());
	} catch (error) {
		console.error('Ошибка при изменении вида карты:', error);
	}
}

/**
 * Инициализирует карту при загрузке DOM
 * @param {Object} config - Конфигурация карты
 */
export function initMapOnReady(config = {}) {
	$(function() {
		initMap('map', config);
	});
}

initMapOnReady();