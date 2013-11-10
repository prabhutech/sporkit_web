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

    $scope.findMatchingFoodFromPearson = function(selectedFood) {
        //$scope.selectedFood = selectedFood;
        Facebook.getRelatedProductsWallmart(selectedFood);
        Facebook.findMatchingFoodFromPearson(selectedFood);
    };

    $scope.$on('findMatchingFoodFromPearson-onsuccess', function(event, response) {
        $scope.matchingFoodFromPearson = response.results[0];
        Facebook.getRecipeForPearsonFood(response.results[0]);
        console.dir($scope.matchingFoodFromPearson);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.$on('getRecipeForPearsonFood-onsuccess', function(event, response) {
        $scope.recipeForPearsonFood = response;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.getFoodTime = function(d1) {
        return jQuery.timeago(d1);
    };

    $scope.$on('getRelatedProductsWallmart-onsuccess', function(event, response) {
        $scope.relatedProductsWallmart = response.items;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

}]);
