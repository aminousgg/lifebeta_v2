var api_url="http://10.64.5.40/api/digihc/";
var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    on: {
        pageBeforeIn: function(event, page) {

        },
        pageAfterIn: function(event, page) {

        },
        pageInit: function(event, page) {
          authenticate(page.app,function(){
            var apps = page.app;
            apps.router.navigate('/login/');
          });
          if(gettoken()!=undefined){
            get_nama(page.app, function(data){
              $(".greeting").html('Hai, '+data);
              $("#nama").html(data);
            });
          }
          var storage = getstorage_flash();
          if(storage != undefined){
            get_foto(function(data){
              $("#foto_profile").html('<img class="circle-img pos-center" src="'+data+'" alt="">');
            });
          }
          $("#home").addClass('tab-link-active');
          $("#agenda").removeClass('tab-link-active');
          $("#bantuan").removeClass('tab-link-active');
          $("#profile").removeClass('tab-link-active');
        },
        pageBeforeRemove: function(event, page) {
        },
    }
  },
  {
    path: '/notifications/',
    componentUrl: './views/notifications/',
  },
  {
    path: '/login/',
    componentUrl: './views/auth/login.html',
  },
  {
    path: '/sales/',
    componentUrl: './views/sales/clients.html',
  },
  {
    path: '/eoffice/',
    componentUrl: './views/eoffice/eoffice.html',
  },
  {
    path: '/kinerja/',
    componentUrl: './views/kinerja/kinerja.html',
  },
  {
    path: '/faskes/',
    componentUrl: './views/faskes/faskes.html',
  },
  {
    path: '/koperasi/',
    componentUrl: './views/koperasi/koperasi.html',
  },
  {
    path: '/cuti/',
    componentUrl: './views/cuti/cuti.html',
  },
  {
    path: '/info-cuti/',
    componentUrl: './views/cuti/info_cuti.html',
  },
  {
    path: '/tahunan/',
    componentUrl: './views/cuti/tahunan.html',
  },
  {
    path: '/ijin/',
    componentUrl: './views/ijin/ijin.html',
  },
  {
    path: '/profile/',
    componentUrl: './views/profile/profile.html',
  },
  {
    path: '/bantuan/',
    componentUrl: './views/bantuan',
  },
  {
    path: '/agenda/',
    componentUrl: './views/agenda/agenda.html',
  },
  {
    path: '/gaji/',
    componentUrl: './views/gaji',
  },
  {
    path: '/gaji/:no_slip',
    componentUrl: './views/gaji/slip.html',
  },
  {
    path: '/mydoc/',
    componentUrl: './views/mydoc/mydoc.html',
  }
];
