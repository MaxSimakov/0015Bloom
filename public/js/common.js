"use strict";
const JSCCommon = {

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			// type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	mobileMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			if (menu.classList.contains("active")) {
				menu.classList.add("close");
				menu.classList.remove("active");
				setTimeout(() => {
					menu.classList.remove("close");
				}, 500);
			}
			else {
				menu.classList.add("active");
			}
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
	datepicker() {
		let pickers = document.querySelectorAll(".input-date-picker-js")
		pickers.forEach(el => {
			new Litepicker({
				element: el,
				singleMode: false,
				showTooltip: false,
				dropdowns: true,
				// resetButton: true,
				position: "bottom right",
				// tooltipText: {
				// 	one: 'night',
				// 	other: 'nights'
				// },
				lang: 'ru-RU',
				format: "DD.MM.YYYY",
			})
		});
		let pickerSingle = document.querySelectorAll(".input-date-picker-single-js")
		pickerSingle.forEach(el => {
			new Litepicker({
				element: el,
				singleMode: true,
				showTooltip: false,
				dropdowns: true,
				// resetButton: true,
				position: "bottom right",
				// tooltipText: {
				// 	one: 'night',
				// 	other: 'nights'
				// },
				lang: 'ru-RU',
				format: "DD.MM.YYYY",
			})
		})

	}
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.getCurrentYear('.currentYear');
	JSCCommon.datepicker();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}


	// modal window

	const sliderAutoJs = new Swiper('.slider-auto--js', {

		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 0,

	});
	const sSexEducChapter = new Swiper('.sSexEducChapter__slider--js', {

		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 0,
		// loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});

	const sArticleSlider = new Swiper('.mediaContent__slider--js', {

		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 0,
		// loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});

	// var sexEduc = new Typed('.page-head--sexEduc .page-head__title p', {
	// 	strings: ["Знакомство со своим телом", "Добавь гармонию в свою жизнь"],
	// 	typeSpeed: 50,
	// 	backDelay: 5000,
	// 	loop: true,
	// 	loopCount: Infinity,
	// 	backSpeed: 15
	// });

	$('.typed-js').each(function () {

		let thisStings = $(this).data("text");
		var arrayOfStrings = thisStings.split('; ');
		let typed = new Typed(this, {
			strings: arrayOfStrings,
			typeSpeed: 50,
			backDelay: 5000,
			loop: true,
			loopCount: Infinity,
			backSpeed: 15
		});
	});







	$(".sAccess__btn-accordion").click(function () {
		$(this).toggleClass('on')
			.parents('.sAccess__item').find(".sAccess__item-content").slideToggle();
	});

	// $(document).on("click", ".form-wrap__btn-toggle-pass", function() {
	// 	var inputPass = $(this).parents('.form-wrap__password-wrap').find( "input");
	// 	if ($(inputPass).attr('type') == 'password'){
	// 		$(this).addClass('on');
	// 		$(inputPass).attr('type', 'text');
	// 		} else {
	// 		$(this).removeClass('on');
	// 		$(inputPass).attr('type', 'password');
	// 		}
	// 		return false;
	// });

	document.addEventListener("click", function (event) {
		const toggleEv = event.target.closest(".form-wrap__btn-toggle-pass");
		if (!toggleEv) return;
		toggleEv.classList.toggle('on');
		const input = toggleEv.closest('.form-wrap__password-wrap').querySelector('input');
		const type = input.getAttribute(
			'type') === 'password' ? 'text' : 'password';
		input.setAttribute('type', type);
	}, { passive: true });



	const mask = document.querySelector('.menu-mobile ul');
	const mainModal = document.querySelector('.menu-mobile');

	mainModal.addEventListener('mousemove', (e) => {
		mainModal.style.setProperty('--x', (e.clientX) + 'px');
		mainModal.style.setProperty('--y', (e.clientY) + 'px');
	}, { passive: true });
	// mainModal.onmousemove = function (e) {
	// }

	var wow = new WOW(
		{
			animateClass: 'animate__animated', // animation css class (default is animated)
			mobile: false       // trigger animations on mobile devices (default is true)
		}
	);
	wow.init();

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }