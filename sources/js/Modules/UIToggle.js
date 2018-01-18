/**
 * UI Toggle Module
 * =================================
 * @author: Ariona, Rian
 * @url: http://ariona.net
 */

class UIToggle {

	constructor(opt){
		this.opt = this.extend({
			activeClass: 'is-active'
		}, opt);

		this.trigger = document.querySelector(this.opt.trigger);
		this.target  = document.querySelector(this.opt.target);

		this.initEvents();
	}

	// extending default option with user option
	// reference: wallop slider
	extend(origOptions, userOptions){
		var extendOptions = {}, attrname;
		for (attrname in origOptions) { extendOptions[attrname] = origOptions[attrname]; }
		for (attrname in userOptions) { extendOptions[attrname] = userOptions[attrname]; }
		return extendOptions;
	}

	initEvents() {
		// Toggle target with it's trigger
		this.trigger.addEventListener('click', () => {
			this.target.classList.toggle(this.opt.activeClass);
		});

		// Dismiss target when clicking outside the context
		document.addEventListener('click', event => {
			if( event.target.closest(this.opt.target) || event.target.closest(this.opt.trigger) ) return;
			this.target.classList.remove(this.opt.activeClass);
		});
	}

}

export default UIToggle;

/* *
 * USAGE
 * =================================

new UIToggle({
	trigger     : '#mini-cart-toggle',
	target      : '.cart',
	activeClass : 'is-active'
});

*/