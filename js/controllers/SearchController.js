SporkitApp.controller('SearchController', ['$scope', 'Facebook',
function($scope, Facebook) {
    $scope.isLoading = true;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
        $scope.isLoading = false;
    }

    function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        latlon = new google.maps.LatLng(lat, lon);
        mapholder = document.getElementById('mapholder');
        mapholder.style.height = '250px';
        mapholder.style.width = '100%';

        var myOptions = {
            center : latlon,
            zoom : 14,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            mapTypeControl : false,
            navigationControlOptions : {
                style : google.maps.NavigationControlStyle.SMALL
            }
        };
        var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
        var marker = new google.maps.Marker({
            position : latlon,
            map : map,
            title : "You are here!"
        });
        $scope.isLoading = false;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
        $scope.isLoading = false;
    }

}]);