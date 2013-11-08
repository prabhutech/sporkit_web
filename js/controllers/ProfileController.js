SporkitApp.controller('ProfileController', ['$scope', 'Facebook',
function($scope, Facebook) {
    Facebook.userInfo();
    Facebook.getFriends();
    $scope.$on('fb-get-userinfo-onsuccess', function(event, response) {
        $scope.userInfo = response;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
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
