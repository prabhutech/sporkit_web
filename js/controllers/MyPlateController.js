SporkitApp.controller('MyPlateController', ['$scope', 'Facebook',
function($scope, Facebook) {
    var Users = Parse.Object.extend("User");
    var Foods = Parse.Object.extend("Food");

    var currentUser = Facebook.currentUser;
    var food = new Foods({
        name : "Fish fry"
    });
    food.relation("createdBy").add(currentUser);
    food.save();
}]);