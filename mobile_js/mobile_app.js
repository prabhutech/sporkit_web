// Initialize the Parse object first.
Parse.initialize("fyDP4zl5WB5CxosiOccG8uAA90xhA48nipoX36oo", "Vq7qc3pqWdM7OfNHZ2gwXWHrIq7ydLBaOSEMLkxe");

var SporkitMobileApp = angular.module('SporkitMobileApp', ['SporkitServiceModule', 'SporkitControllerModule', 'SporkitDirectiveModule']);
SporkitMobileApp.run(function($rootScope) {
    window.fbAsyncInit = function() {
        //Once the Facebook JavaScript SDK is loaded, initialize FB and Parse.FacebookUtils

        Parse.FacebookUtils.init({
            appId : '491653977599476',
            status : true,
            cookie : true,
            xfbml : true
        });

        FB.getLoginStatus(function(response) {
            $rootScope.$broadcast('get-fb-login-status', response);
        });

    }; ( function(d) {
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
});

SporkitMobileApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : 'mobile_views/MyPlateMobile.html'
    }).when('/myplate', {
        templateUrl : 'mobile_views/MyPlateMobile.html'
    }).when('/takephoto', {
        templateUrl : 'mobile_views/TakePhotoMobile.html'
    }).when('/search', {
        templateUrl : 'mobile_views/SearchMobile.html'
    }).when('/profile', {
        templateUrl : 'mobile_views/ProfileMobile.html'
    });
}); 

angular.element(document).ready(function(){
    angular.bootstrap($(document.body), ['SporkitMobileApp']);
});
