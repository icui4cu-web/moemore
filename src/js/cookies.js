// Модуль для работы с cookies

/**
 * Устанавливает cookie
 * @param {string} name - Имя cookie
 * @param {any} value - Значение cookie
 * @param {number} days - Количество дней до истечения
 */
export function setCookie(name, value, days = 365) {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${date.toUTCString()};path=/`;
	console.log(`Cookie set: ${name}=${JSON.stringify(value)}`);
}

/**
 * Получает значение cookie
 * @param {string} name - Имя cookie
 * @returns {any} Значение cookie или пустой массив
 */
export function getCookie(name) {
	const matches = document.cookie.match(new RegExp(
		`(?:^|; )${name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1')}=([^;]*)`
	));
	const value = matches ? JSON.parse(decodeURIComponent(matches[1])) : [];
	console.log(`Cookie get: ${name}=${JSON.stringify(value)}`);
	return value;
}