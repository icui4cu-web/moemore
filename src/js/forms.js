// Модуль для работы с формами
import $ from 'jquery';
import 'jquery-mask-plugin';
import 'jquery-validation';

/**
 * Инициализирует маски для телефонных номеров
 */
export function initPhoneMask() {
	$('.js-phone').mask('+38 (000) 000-00-00');
}

/**
 * Инициализирует валидацию форм
 */
export function initFormValidation() {
	// Валидация полей при потере фокуса
	$('.js-validate .form__input').on('blur keyup', function () {
		if ($(".js-validate").valid()) {
			$('.js-validate .btn').removeClass('disabled');
		} else {
			$('.js-validate .btn').addClass('disabled');
		}
	});

	// Обработка отправки форм
	$(".js-validate").on("submit", function (e) {
		e.preventDefault();
		const isValid = $(".js-validate").valid();

		if (isValid && grecaptcha.getResponse().length > 0) {
			$('.js-validate .form__captcha').removeClass('error');
			$('.js-validate .btn').addClass('disabled');
			const formData = new FormData(this);

			const data = {};
			formData.forEach((value, key) => {
				data[key] = value;
			});

			fetch($(this).attr('action'), {
				method: $(this).attr('method'),
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			}).then(() => {
				window.location.href = '/contacts_access_ru.html';
			}).catch(() => {
				// Обработка ошибок
			}).finally(() => {
				this.reset();
				grecaptcha.reset();
				$('.js-validate .btn').removeClass('disabled');
			});
		} else {
			$('.js-validate .btn').addClass('disabled');
		}
		if (grecaptcha.getResponse().length === 0) {
			$('.js-validate .form__captcha').addClass('error');
		}

		return false;
	});

	// Настройка валидации для каждой формы
	// $(".js-validate").each(function () {
	// 	$(this).validate({
	// 		ignore: [],
	// 		groups: {
	// 			phoneNumber: "message name email"
	// 		},
	// 		rules: {
	// 			message: {
	// 				required: true,
	// 			},
	// 			name: {
	// 				required: true,
	// 			},
	// 			email: {
	// 				required: true,
	// 			},
	// 		},
	// 		messages: {
	// 			message: {
	// 				required: "Пожалуйста, проверьте корректность введенной информации.",
	// 			},
	// 			name: {
	// 				required: "Пожалуйста, проверьте корректность введенной информации.",
	// 			},
	// 			email: {
	// 				required: "Пожалуйста, проверьте корректность введенной информации.",
	// 			},
	// 		},
	// 		onfocusout: function (element) {
	// 			$(element).valid();
	// 		},
	// 		errorPlacement: function (error, element) {
	// 			element.closest('.form').find(".form__error").append(error);
	// 		}
	// 	});
	// });
}