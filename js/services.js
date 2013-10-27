var FacebookProvider = angular.module('FacebookProvider', []);
FacebookProvider.service('Facebook', function($rootScope) {
    currentUser = Parse.User.current();
    return {
        getLoginStatus : function() {
            FB.getLoginStatus(function(response) {
                $rootScope.$broadcast('get-fb-login-status', response);
            });
        },
        login : function() {
            Parse.FacebookUtils.logIn(null, {
                success : function(user) {
                    if (!user.existed()) {
                        console.log("User signed up and logged in through Facebook!");
                    } else {
                        console.log("User logged in through Facebook!");
                    }
                    $rootScope.$broadcast('fb-login-onsuccess');
                },
                error : function(user, error) {
                    alert("User cancelled the Facebook login or did not fully authorize.");
                    $rootScope.$broadcast('fb-login-onerror');
                }
            });
        },
        logout : function() {
            FB.logout(function(response) {
                if (response) {
                    $rootScope.$broadcast('fb-logout-onsuccess');
                } else {
                    $rootScope.$broadcast('fb-logout-onerror');
                }
            });
        },
        unsubscribe : function() {
            FB.api("/me/permissions", "DELETE", function(response) {
                $rootScope.$broadcast('fb-unsubscribe-onresult', response);
            });
        }
    };
});

