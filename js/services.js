var FacebookProvider = angular.module('FacebookProvider', []);
FacebookProvider.service('Facebook', function($rootScope) {
    var Food = Parse.Object.extend("Food");
    var foodQuery = new Parse.Query(Food);
    var createResponse = function(id, response) {
        if (response) {
            $rootScope.$broadcast(id + '-onsuccess', response);
        } else {
            $rootScope.$broadcast(id + '-onerror');
        }
    };
    return {
        currentUser : Parse.User.current(),
        userInfo : function() {
            FB.api("/me", function(response) {
                createResponse('fb-get-userinfo', response);
            });
        },
        getFriends : function() {
            FB.api('/me/friends', function(response) {
                createResponse('fb-get-friends', response);
            });
        },
        getAllFoods : function(user) {
            if (user) {
                foodQuery.equalTo("createdBy", user);
            }
            foodQuery.find(function(response) {
                createResponse('get-all-foods', response);
            });
        },
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
                    FB.api("/me", function(response) {
                        if (response) {
                            console.dir(response);
                            var currentUser = Parse.User.current();
                            currentUser.set("fbUserData", response);
                            currentUser.save();
                        }
                    });
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
    return promise;
});

