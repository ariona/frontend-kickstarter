/**
 * Mobile Menu Module
 * =================================
 * @author: Ariona, Rian
 * @url: http://ariona.net
 */

class MobileMenu {

	constructor(opt) {
		this.opt = opt;

		this.triggerButton  = document.querySelector(this.opt.triggerButton);
		this.mobileMenuWrap = document.querySelector(this.opt.mobileMenuWrap);
		this.desktopMenu    = document.querySelector(this.opt.desktopMenu);
		this.mobileMenu     = document.querySelector(this.opt.mobileMenu);

		this.init();
		this.initEvents();
	}

	init() {
		// Clone primary menu to mobile menu
		this.mobileMenu.appendChild(this.desktopMenu.cloneNode(true));

		const menuItem = this.mobileMenu.querySelectorAll('.menu-item-has-children > a');

		// Add button to menu which has children
		Array.from(menuItem).forEach(item => {
			const btn = document.createElement('button');
			btn.classList.add('open-sub');
			btn.innerHTML = 'Open';
			item.appendChild(btn);
		});
	}

	initEvents() {
		// Trigger opening mobile menu wrapper
		this.triggerButton.addEventListener('click', event => {
			event.target.classList.toggle('is-active');
			this.mobileMenuWrap.classList.toggle('is-active');
		});

		// Trigger opening sub-menu
		this.mobileMenu.addEventListener('click', function(event) {
			if (event.target && event.target.matches('.open-sub')) {
				event.target.parentNode.parentNode.classList.toggle('is-active');
				event.target.parentNode.nextElementSibling.classList.toggle('is-active');
			}
		});

		// Dismiss mobile menu if clicked outside of context;
		document.addEventListener('click', event=>{
			if( event.target.closest(this.opt.mobileMenuWrap) || event.target.closest(this.opt.triggerButton) ) return;

			this.mobileMenuWrap.classList.remove('is-active');
			this.triggerButton.classList.remove('is-active');
		});
	}
}

export default MobileMenu;

/* *
 * USAGE
 * =================================

new MobileMenu({
	triggerButton  : '#mobile-menu-trigger',  // Mobile menu trigger button e.g hamburger button
	mobileMenuWrap : '#mobile-menu-wrap',     // Mobile menu wrapper to be toggled
	desktopMenu    : '#primary-menu',       // Desktop menu to be cloned
	mobileMenu     : '#mobile-menu'       // Mobile menu target for cloned menu
});

*/