var $$ = Dom7;
// Framework7 App main instance
var app  = new Framework7({
	root: '#app', // App root element
	id: 'com.myapp.test',
	name: 'Framework7', // App name
	theme: 'ios',
	view: {
		iosDynamicNavbar: false,
		xhrCache: false,
	},
	photoBrowser: {
		type: 'popup',
	},
	popup: {
		closeByBackdropClick: false,
	},
	actions: {
		convertToPopover: false,
		grid: true,
	},
	// App routes
	routes: routes,
	on: {
		pageInit(page) {
		},
	pageAfterIn(page) {
		},
	}
});
// Sidebar
! function($) {
    "use strict";
    var Sidemenu = function() {
        this.$menuItem = $("#sidebar-menu a");
    };
	Sidemenu.prototype.init = function() {
		var $this = this;
		$this.$menuItem.on('click', function(e) {
		if ($(this).parent().hasClass("submenu")) {
			e.preventDefault();
		}
		if (!$(this).hasClass("subdrop")) {
			$("ul", $(this).parents("ul:first")).slideUp(350);
			$("a", $(this).parents("ul:first")).removeClass("subdrop");
			$(this).next("ul").slideDown(350);
			$(this).addClass("subdrop");
		} else if ($(this).hasClass("subdrop")) {
			$(this).removeClass("subdrop");
			$(this).next("ul").slideUp(350);
		}
	});
		$("#sidebar-menu ul li.submenu a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
	},
	$.Sidemenu = new Sidemenu;
}(window.jQuery),
$(document).ready(function($) {
	var calendarDefault = app.calendar.create({
  input: '#bod'
});
	$.Sidemenu.init();
});
function gettoken(){
  if(localStorage.getItem("digihc") != undefined){
    var local=localStorage.getItem("digihc");
    local = JSON.parse(local);
    return local.token;
  }else{
    return undefined;
  }
}
function settoken(object){
	localStorage.setItem("digihc",JSON.stringify(object));
}
function getstorage(){
  if(localStorage.getItem("digihc") != undefined){
    var local=localStorage.getItem("digihc");
    local = JSON.parse(local);
    return local;
  }else{
    return undefined;
  }
}
function redirect(url,option={}){
  app.router.navigate(url,option);
}
function pesan(message,position="bottom",duration=2000){
  app.toast.create({
    text: message,
    position: position,
    closeTimeout: duration,
  }).open();
}
function encrypt(msg){
	//future to encrypt message, but now still plain
	return msg;
}
function authenticate(apps,callback){
  var token = gettoken();
	if(token == undefined){
		if (typeof callback == "function") {
				callback();
		}
	}else{
		apps.preloader.show();
		apps.request({
			url: api_url+'auth/authenticate',
			method: 'POST',
			dataType: 'json',
			data: {token:token},
			success: function (data) {
				apps.preloader.hide();
				if(data.status.code != 200){
					if (typeof callback == "function") {
							callback();
					}
				}
			},
			error: function(data){
				apps.preloader.hide();
				if (typeof callback == "function") {
						callback();
				}
			}
		});
	}
}
