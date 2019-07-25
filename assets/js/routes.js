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
    path: '/ijin/',
    componentUrl: './views/ijin/ijin.html',
  },
  {
    path: '/profile/',
    componentUrl: './views/profile/profile.html',
  }

];
