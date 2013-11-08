SporkitApp.controller('MyPlateController', ['$scope', 'Facebook',
function($scope, Facebook) {
    Facebook.getAllFoods();

    $scope.$on('get-all-foods-onsuccess', function(event, response) {
        console.log(response);
        for (var key in response) {
            console.log(response[key].attributes.name);
        }
        $scope.foods = response;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
}]);
