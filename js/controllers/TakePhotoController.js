SporkitApp.controller('TakePhotoController', ['$scope', 'Facebook',
function($scope, Facebook) {
    $scope.food = {};
    $scope.saveFood = function() {
        var Users = Parse.Object.extend("User");
        var Foods = Parse.Object.extend("Food");

        var currentUser = Parse.User.current();
        var food = new Foods({
            name : $scope.food.name
        });
        food.relation("createdBy").add(currentUser);
        food.save();
    };
}]);