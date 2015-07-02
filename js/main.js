$(document).ready(function() {
	$(".accordion-tabs > .tab-header-and-content:first-of-type .tab-link").addClass('is-active');
	$(".accordion-tabs > .tab-header-and-content:first-of-type .tab-content").addClass('is-open').show();

	$(document).on('click', '.tab-link', function(e){
		e.preventDefault();
		var tabLabel = $(this);
		if (!tabLabel.hasClass("is-active")){
			var tabContainer = $(this).closest(".accordion-tabs");
			$('.is-open', tabContainer).removeClass('is-open').hide();
			tabLabel.next().toggleClass("is-open").toggle();
			$('.is-active', tabContainer).removeClass("is-active");
			tabLabel.addClass("is-active");
		}
	});

	$(".js-accordion-trigger").bind("click", function(e) {
		e.preventDefault();
		$(this).parent().find(".submenu").slideToggle("fast");
		$(this).parent().toggleClass("is-expanded");
	});
});

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