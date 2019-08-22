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
function setauth(object) {
	localStorage.setItem("digihc_flash",JSON.stringify(object));
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
function getstorage_flash(){
  if(localStorage.getItem("digihc_flash") != undefined){
    var local=localStorage.getItem("digihc_flash");
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
				// console.log(data.response);
				setauth(data.response);
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

function get_nama(apps,callback){
	var token = gettoken();
		apps.request({
			url: api_url+'auth/authenticate',
			method: 'POST',
			dataType: 'json',
			data: {token:token},
			success: function (data) {
				apps.preloader.hide();
				if(typeof callback == "function"){
					callback(data.response.nama);
				}
			},
			error: function(data){

			}
		});
}
function get_foto(callback) {
	var flash = getstorage_flash();
	// console.log(flash);
	if(flash.pegawai_id!=undefined){
		var src = api_url+"media/show_image/"+flash.pegawai_id;
		if(typeof callback == "function"){
			callback(src);
		}
	}else {
		var src = 'user-logo.jpg';
		if(typeof callback == "function"){
			callback(src);
		}
	}
}

function get_foto2(apps, callback){
		var flash = getstorage_flash();
		if(flash.pegawai_id != undefined){
				var src = api_url+"media/show_image/"+flash.pegawai_id;
				if(typeof callback == "function"){
						callback(src);
				} else {
						callback();
				}
		} else {
				var src = "user-logo.jpg";
				if(typeof callback == "function"){
						callback(src);
				}
		}
}

function get_biodata(apps, callback){
		var token = gettoken();
		apps.request({
			url: api_url+'pegawai/biodata',
			method: 'POST',
			dataType: 'json',
			data: {token:token},
			success: function (data) {
				apps.preloader.hide();
				if(data.status.code == 200){
					if(typeof callback == "function"){
						callback(data.response[0]);
					}
				}else {
					callback('kosong');
				}
			},
			error: function(data){

			}
		});
}

function get_pendidikan(apps, callback){
		var token			= gettoken();
		apps.request({
				url				: api_url+"pegawai/riwayat_pendidikan/",
				method		: "POST",
				dataType	: "JSON",
				data			: {token:token},
				success		: function (data) {
						apps.preloader.hide();
						res = JSON.parse(data);
						if(res.status.code == 200){
								if(typeof callback == "function"){
										callback(res);
								}
						}
				},
				error 		: function(data) {

				}
		})
}

function get_karir(apps, callback){
		var token			= gettoken();
		apps.request({
				url				: api_url+"pegawai/riwayat_karir/",
				method		: "POST",
				dataType	: "JSON",
				data			: {token:token},
				success		: function(data) {
						apps.preloader.hide();
						res = JSON.parse(data);
						if(res.status.code == 200){
								if(typeof callback == "function"){
										callback(res);
								}
						}
				}
		})
}

function get_payroll(apps, callback){
		var token		= gettoken();
		apps.request({
				url					: api_url+"pegawai/payroll",
				method			: "POST",
				dataType		: "JSON",
				data				: {token:token},
				success			: function(data) {
						apps.preloader.hide();
						res = JSON.parse(data);
						if(res.status.code == 200){
								if(typeof callback == "function"){
										callback(res);
								}
						}
				}
		});
}

function get_payrollslip(apps, no_slip, callback){
		var token		= gettoken();
		apps.request({
				url					: api_url+"pegawai/payroll_detail",
				method			: "POST",
				dataType		: "JSON",
				data				: {token:token, no_slip:no_slip},
				success			: function(data) {
						res = JSON.parse(data);
						if(res.status.code == 200){
								if(typeof callback == "function"){
										callback(res);
								}
						}
				}
		})
}

function rupiah(num){
	var num = num == null ? 0:num;
	num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
            num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num*100+0.50000000001);
            cents = num%100;
            num = Math.floor(num/100).toString();

        if(cents<10)
            cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
                num = num.substring(0,num.length-(4*i+3))+'.'+
                num.substring(num.length-(4*i+3));

        return (((sign)?'':'-') + 'Rp ' + num + ',' + cents);
}

function toWords(s) {
		var th = ['', 'Ribu', 'Juta', 'Milyar', 'Triliyun'];
		var dg = ['Nol', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
		var tn = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];
		var tw = ['Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'Ratus ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');
}

function list_tahun_cuti(apps, callback){
	var token		= gettoken();
	apps.request({
			url					: api_url+"cuti/info_cuti_bydate",
			method			: "POST",
			dataType		: "JSON",
			data				: {token:token},
			success			: function(data) {
					apps.preloader.hide();
					data = JSON.parse(data);
					if(data.status.code == 200){
							if(typeof callback == "function"){
									callback(data.response);
							}
					}
			}
	});
}
function detail_cuti_tahun(apps, thn, callback){
	var token		= gettoken();
	apps.request({
			url					: api_url+"cuti/info_cuti_tahunan",
			method			: "POST",
			dataType		: "JSON",
			data				: {token:token, tahun:thn},
			success			: function(data) {
					apps.preloader.hide();
					data = JSON.parse(data);
					if(data.status.code == 200){
							if(typeof callback == "function"){
									callback(data.response);
							}
					}
			}
	});
}
function disable_event(apps,  callback){
	var year =2019;
	apps.request({
			url					: api_url+"cuti/getharilibur",
			method			: "POST",
			dataType		: "JSON",
			data				: {tahun:year},
			success			: function(data) {
					apps.preloader.hide();
					data = JSON.parse(data);
					if(data.status.code == 200){
							if(typeof callback == "function"){
									callback(data.response);
							}
					}
			}
	});
}


function logout(){
	app.dialog.confirm('Klik Ok untuk logout', function () {
		localStorage.clear();
		redirect('/login/');
  });
}
