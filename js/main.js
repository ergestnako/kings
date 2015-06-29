$(document).ready(function(){$(".accordion-tabs").each(function(e){$(this).children("li").first().children("a").addClass("is-active").next().addClass("is-open").show()}),$(".accordion-tabs").on("click","li > a.tab-link",function(e){if($(this).hasClass("is-active"))e.preventDefault();else{e.preventDefault();var i=$(this).closest(".accordion-tabs");i.find(".is-open").removeClass("is-open").hide(),$(this).next().toggleClass("is-open").toggle(),i.find(".is-active").removeClass("is-active"),$(this).addClass("is-active")}})}),$(".js-accordion-trigger").bind("click",function(e){jQuery(this).parent().find(".submenu").slideToggle("fast"),jQuery(this).parent().toggleClass("is-expanded"),e.preventDefault()});

(function($){
	var navigationBoxClass = '.navigation__box';
	var activeClass = 'is-active';
	var currentlyShownNav = $();
	var overlaySelector = '.overlay';
	var menuSelector = '.navigation__item';
	var delayedHide = null;

	$(document).on('mouseenter', menuSelector, activate);
	$(document).on('mouseleave', menuSelector, function(){
		delayedHide = setTimeout(deactivate, 500);
	});
	/*$(document).on('mouseenter', currentlyShownNav, function(){
		console.log("enter menu");
		cancelTimeout();
	});
	$(document).on('mouseleave', currentlyShownNav, deactivate);*/
	
	function cancelTimeout(){
		console.log("cancel" + delayedHide);
		clearTimeout(delayedHide);
		delayedHide = null;
	}

	function navboxForMenu(menuElement){
		return $(navigationBoxClass, menuElement);
	}

	function activate(event){
		cancelTimeout();
		var targetNavbox = navboxForMenu(event.currentTarget);
		console.log("activate");

		if (targetNavbox[0] != currentlyShownNav[0]){
			currentlyShownNav.removeClass(activeClass);
			targetNavbox.addClass(activeClass);
			currentlyShownNav = targetNavbox;
			currentlyShownNav.on('mouseenter', cancelTimeout);
			currentlyShownNav.on('mouseleave', deactivate);
		}
	}

	function deactivate(event){
		console.log("deactivate");
		cancelTimeout();
		currentlyShownNav.removeClass(activeClass);
		currentlyShownNav.off('mouseenter');
		currentlyShownNav.off('mouseleave');
		currentlyShownNav = $();
	}
})(jQuery);