// Nav search focus animation 
$('#nav-search').focus(function() {
	$(this).parents('.complementary').addClass('focused');
});
$('#nav-search').blur(function() {
	$(this).parents('.complementary').removeClass('focused');
});

// Smooth scroll links
$('a').smoothScroll();

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

//A bit messy in places, could possibly be cleaned up a little
//Using Pointer Events because sanity!
//Mice show on hover and navigate on click
//Touch shows on touch
//Pen currently treated as touch for this scenario, I think best to stick with that
//Included ability to include a close button on the modal if wanted, can remove this
//CSS work needed to make the modal colours work and to redesign the drop down when in modal mode,
//Rather than overriding styles between is-modal and is-dropdown I think best to have them as parent selectors for situations where they would conflict
(function($){
	var navigationBoxClass = '.navigation__box';
	var modalClass = 'is-modal';
	var dropdownClass = 'is-dropdown';
	var currentlyShownNav = $('');
	var menuSelector = '.navigation__item';
	var delayedHide = null;
	var overlay = $('<div class="overlay"></div>');
	$(document.body).append(overlay);

	$(menuSelector).attr('touch-action', 'none');

	$(menuSelector).on('pointerenter', function(event){
		if(event.originalEvent.pointerType == "mouse" && !currentlyShownNav.hasClass(modalClass)){
			activateDropdown(event);
		}
	});
	$(menuSelector).on('pointerleave', function(event){
		if(event.originalEvent.pointerType == "mouse"){
			delayedHide = setTimeout(deactivateDropdown, 500);
		}		
	});
	$(menuSelector).on('pointerdown', function(event){
		if(event.originalEvent.pointerType != "mouse"){
			event.preventDefault();
			activateModal(event);
		}
	});

	function cancelTimeout(){
		clearTimeout(delayedHide);
		delayedHide = null;
	}

	function navboxForMenu(menuElement){
		return $(navigationBoxClass, menuElement);
	}

	function activateDropdown(event){
		cancelTimeout();
		if (!$(event.currentTarget).hasClass('has-sub')){
			deactivateDropdown();
			return;
		}

		var targetNavbox = navboxForMenu(event.currentTarget);

		if (targetNavbox[0] != currentlyShownNav[0]){
			currentlyShownNav.removeClass(dropdownClass);
			targetNavbox.addClass(dropdownClass);
			currentlyShownNav = targetNavbox;
			currentlyShownNav.on('pointerenter', cancelTimeout);
			currentlyShownNav.on('pointerleave', deactivateDropdown);
		}
	}

	function deactivateDropdown(){
		cancelTimeout();
		currentlyShownNav.removeClass(dropdownClass);
		currentlyShownNav.off('pointerenter');
		currentlyShownNav.off('pointerleave');
		currentlyShownNav = $('');
	}

	function activateModal(event){
		deactivateDropdown();
		var targetNavbox = navboxForMenu(event.currentTarget);
		if (targetNavbox.length == 0){
			return;
		}

		currentlyShownNav = targetNavbox;
		overlay.addClass('is-shown');
		currentlyShownNav.addClass(modalClass);
		overlay.on('pointerdown', deactivateModal);
		$('.navigation__close', currentlyShownNav).on('pointerdown', deactivateModal);
	}

	function deactivateModal(){
		currentlyShownNav.removeClass(modalClass);
		$('.navigation__close', currentlyShownNav).off('pointerdown');
		currentlyShownNav = $();
		overlay.removeClass('is-shown');
		overlay.off('pointerdown');
	}
})(jQuery);