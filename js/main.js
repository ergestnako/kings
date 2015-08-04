(function($){
	$(function(){
		setupAccordions();
	});

	function setupAccordions(){
		$('.accordion-container').each(function(i,e){
			setupAccordion(e);
		});
	}

	function setupAccordion(accordion){
		var openFirst = accordion.hasAttribute('data-accordion-openfirst');
		var allPanels = $('.accordion-section', accordion);
		allPanels.addClass('is-closed');
		if(openFirst){
			$(allPanels[0]).addClass('is-open').removeClass('is-closed');
		}
	}

	function accordionClicked(event){
		var thisPanel = $(event.currentTarget).closest('.accordion-section');
		var accordionContainer = thisPanel.closest('.accordion-container');
		var independentPanels = accordionContainer.get(0).hasAttribute('data-accordion-independent');
		var allPanels = $('.accordion-section', accordionContainer);
		var otherPanels = allPanels.not(thisPanel);
		
		if(independentPanels){
			thisPanel.toggleClass('is-closed').toggleClass('is-open');
		} else {
			otherPanels.removeClass('is-open').addClass('is-closed');
			thisPanel.removeClass('is-closed').addClass('is-open');
		}
	}

	$(document).on('click', '.accordion-trigger', accordionClicked);
})(jQuery);

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