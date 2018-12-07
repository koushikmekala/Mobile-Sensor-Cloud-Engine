sensorCloudApp.controller('addSensorController',function($scope,$http){
	$scope.storedStatus=true;
	$scope.sensorStatus=false;
	$scope.submit=function(){
		$http({
			method: "POST",
			url : '/saveSensor',
			data:{
				"sensorID":$scope.sensorID,
				"sensorType":$scope.sensorType,
				"sensorHub":$scope.sensorHub,
				"sensorDimensions":$scope.sensorDimensions,
				"sensorSignalType":$scope.sensorSignalType,
				"sensorSignalSpeed":$scope.sensorSignalSpeed,
				"sensorPins":$scope.sensorPins,
				"sensorOutputSignal":$scope.sensorOutputSignal,
				"sensorInstallationDate":$scope.sensorInstallationDate,
				"sensorLatitude":$scope.sensorLatitude,
				"sensorLongitude":$scope.sensorLongitude,
				"sensorCity":$scope.sensorCity,
				"sensorStatus":$scope.sensorStatus
					
			}
		}).success(function(result) {
			if(result.status == "success"){
				$scope.storedStatus=false;
				swal({title: "Successfully Stored!",  imageUrl: "images/thumbs-up.jpg"});
				setTimeout(function(){
					window.location.reload();
				}, 3000);
			}
			else if(result.status=="fail")
			{
				swal({title: result.msg,  type:"error"});
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
	};
	$http({
        method : "GET",
        url : "/getSensorHubsList"
    }).then(function mySucces(response) {
    	$scope.sensorHubs = response.data.msg;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
});
