import $ from 'jquery';
import { updateFavoritesDisplay } from './favorites.js';

/**
 * Инициализирует функционал загрузки дополнительных объектов
 */
export function initLoadMore() {
    $('.filter-content .load_more').on('click', load_more_objects);
}

function load_more_objects() {
    var page = $('#page').val();
    var param = $('#param').val();
    var r = $('#r').val();
    var lng = $('#lng').val();
    var id_page = $('#id_page').val();

    $('#page').remove();
    $('#param').remove();
    $('#r').remove();
    $('#lng').remove();
    $(".load_more div").remove();

    $('.filter-preloader').removeClass('d-none');

    $.post("/", { 
        request: 'get_next_page', 
        params: { page: page, param: param, r: r, lng: lng, id_page: id_page } 
    }, GetNextPageCallback);

    return false;
}

function GetNextPageCallback(response) {
    var data = $.parseJSON(response);

    console.log('GetNextPageCallback');

    if (data.success) {
        console.log('success');

        $(".filter-content .tl-center").remove();
        $(".filter-content .row.mb-20").append(data.success);
        $(".filter-content").append(data.next_page);

        if (data.next_page != "")
            $('.filter-content .load_more').on('click', load_more_objects);

        // Реинициализация слайдеров после загрузки новых элементов
        reinitObjectItemSliders();

		updateFavoritesDisplay();
        
        $('.filter-preloader').addClass('d-none');
    }
}

/**
 * Реинициализирует слайдеры элементов объектов после загрузки новых
 */
function reinitObjectItemSliders() {
    if ($(".object-item__slider").length) {
        $(".object-item__slider").each(function () {
            if ($(this).hasClass('slick-initialized')) {
                $(this).slick('destroy');
            }

            var dots = $(this).closest('.slider-block').find('.slider-dots');
            var nextArrow = $(this).closest('.slider-block').find('.slider-nav__arrow--next');
            var prevArrow = $(this).closest('.slider-block').find('.slider-nav__arrow--prev');

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