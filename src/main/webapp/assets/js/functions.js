(function($){
	$(document).ready(function (){
		$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('.cc-up').fadeIn();
				$('.cc-header').addClass('ccScHd');
			} else {
				$('.cc-up').fadeOut();
				$('.cc-header').removeClass('ccScHd');
			}
		});

		$(document).on( "click",".cc-up", function() {
			$("html, body").animate({ scrollTop: 0 }, 600);
			return false;
		});

		$(document).on( "click",".cc-mnic", function() {
			$('.cc-menutop').toggleClass('mnshow');
		});

		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 3,
			spaceBetween: 15,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				550: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				350: {
					slidesPerView: 1,
					spaceBetween: 10,
				}
			}
		});
	});
})(window.jQuery);