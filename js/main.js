$(document).ready(function(){$(".accordion-tabs").each(function(e){$(this).children("li").first().children("a").addClass("is-active").next().addClass("is-open").show()}),$(".accordion-tabs").on("click","li > a.tab-link",function(e){if($(this).hasClass("is-active"))e.preventDefault();else{e.preventDefault();var i=$(this).closest(".accordion-tabs");i.find(".is-open").removeClass("is-open").hide(),$(this).next().toggleClass("is-open").toggle(),i.find(".is-active").removeClass("is-active"),$(this).addClass("is-active")}})}),$(".js-accordion-trigger").bind("click",function(e){jQuery(this).parent().find(".submenu").slideToggle("fast"),jQuery(this).parent().toggleClass("is-expanded"),e.preventDefault()});







