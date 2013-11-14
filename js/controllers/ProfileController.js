SporkitControllerModule.controller('ProfileController', ['$scope', 'Facebook',
function($scope, Facebook) {
    //Facebook.getFriends();
    $scope.currentUser = Parse.User.current();

    $scope.getCurrentLocationAddress = function() {
        var address;
        if ($scope.currentUser.attributes.fbUserData.location) {
            address = $scope.currentUser.attributes.fbUserData.location;
        } else if (Facebook.currentLocationAddress0) {
            address = Facebook.currentLocationAddress0;
        } else {
            address = "Unknown";
        }
        return address;
    };

    $scope.$on('fb-get-friends-onsuccess', function(event, response) {
        $scope.nooffriends = response.data.length;
        // $.each(response.data, function(index, friend) {
        // console.log(friend.name + ' has id:' + friend.id);
        // });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    Facebook.getAllFoods($scope.currentUser);

    $scope.$on('get-all-foods-onsuccess', function(event, response) {
        $scope.foods = response;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
}]);
