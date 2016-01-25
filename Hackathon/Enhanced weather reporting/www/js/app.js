var imageApp=angular.module('starter', ['ionic','ngCordova','firebase']);

var fb = new Firebase("https://brilliant-fire-9489.firebaseio.com/"); //ur firebase url

imageApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

imageApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("firebase", {
            url: "/firebase",
            templateUrl: "templates/firebase.html",
            controller: "FirebaseController",
            cache: false
        })
        .state("secure", {
            url: "/secure",
            templateUrl: "templates/secure.html",
            controller: "SecureController"
        })
    .state("login", {
            url: "/login",
            templateUrl: "templates/homepage.html",
            controller: "LoginController"
        })
    .state("register", {
            url: "/register",
            templateUrl: "templates/register.html",
            controller: "RegistrationController"
        });
    $urlRouterProvider.otherwise('/firebase');
});

imageApp.controller("FirebaseController", function($scope,$http, $state, $firebaseAuth, $cordovaBarcodeScanner, $httpParamSerializerJQLike,$q) {

    var fbAuth = $firebaseAuth(fb);
    $scope.barcodes = [];

    $scope.login = function(username, password) {
              
        console.log("inside login function");
        $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/labwork/collections/users?q={name:\''+username+'\'}&apiKey=hxRIlF7p7mAyipFbwWfI3-SCHx6jd7Vv',
           
            contentType: "application/json"
        })
        .success(function(data){
            
            // alert(data[0]._id.$oid);
            if(data==""){
                
                  $scope.errormsg = "No user found"       
                        $state.go("firebase");
            }else{
              
           
              if (username == data[0].name && password == data[0].password) {
                        localStorage.setItem("name" , username);
                  $state.go("login");
                    } else {
                       $scope.errormsg = "Invalid credentials"
                       $state.go("firebase");
                    }
            
            
            }
            

            })
             
        }
    
    $scope.delete = function(username, password) {
              
        console.log("inside login function");
        $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/labwork/collections/users?q={name:\''+username+'\'}&apiKey=hxRIlF7p7mAyipFbwWfI3-SCHx6jd7Vv',
           
            contentType: "application/json"
        })
        .success(function(data){
            
            // alert(data[0]._id.$oid);
            if(data==""){
                alert("null");
                  $scope.errormsg = "No user found"       
                        
            }else{
                
              if (username == data[0].name && password == data[0].password) {
                        /*localStorage.setItem("name" , username);
                  $state.go("login");*/
                  
                  $http({
                      method: 'DELETE' ,   
                url: 'https://api.mongolab.com/api/1/databases/labwork/collections/users/'+data[0]._id.$oid+'?apiKey=hxRIlF7p7mAyipFbwWfI3-SCHx6jd7Vv',

                     }).success(function (data) {
                     alert("deleted");
                      $scope.sucmsg = "User deleted successfully"
                     })                  
                  
                    } else {
                       $scope.errormsg = "Invalid credentials"
                    }           
            
            }            

            })
             
        }
    
     $scope.update = function(username, password) {
              
        console.log("inside login function");
        $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/labwork/collections/users?q={name:\''+username+'\'}&apiKey=hxRIlF7p7mAyipFbwWfI3-SCHx6jd7Vv',
           
            contentType: "application/json"
        })
        .success(function(data){
         
            // alert(data[0]._id.$oid);
            if(data==""){
                alert("null");
                  $scope.errormsg = "No user found"       
                        
            }else{
               
            
              if (username == data[0].name ) {
                        /*localStorage.setItem("name" , username);
                  $state.go("login");*/
                  
                  $http({
                      method: 'PUT' ,   
                url: 'https://api.mongolab.com/api/1/databases/labwork/collections/users/'+data[0]._id.$oid+'?apiKey=hxRIlF7p7mAyipFbwWfI3-SCHx6jd7Vv',
                      data: JSON.stringify( { "$set" : { "password" : password } } ),
                    contentType: "application/json"
                     }).success(function (data) {
                     alert("updated");
                      $scope.sucmsg = "User updated successfully"
                     })                  
                  
                    } else {
                       $scope.errormsg = "Invalid credentials"
                    }           
            
            }            

            })
             
        }
    
    
    

    $scope.register = function(username, password) {
     
        
        
        $state.go("register");
    }
  

});

//secure controller



imageApp.controller("LoginController", function($scope, $state,$http) {
        var user = localStorage.getItem("name");
    $scope.user = user;
    //alert("user : "+user);
    
      
    var map;
        var mapOptions;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();
    $scope.initialize = function () {
          var latLng = new google.maps.LatLng(0, 0); 
          var mapOptions = {
                zoom: 3,
                center: latLng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
     };
    $scope.calcRoute = function () {
       var end = document.getElementById('end').value;
            var start = document.getElementById('source').value;
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    console.log(status);
                }
           
                
        });
    };
    
    
    google.maps.event.addDomListener(window, 'load', $scope.initialize);
    
    $scope.calCoord = function() {
    
        $http.get(   'http://api.wunderground.com/api/36b799dc821d5836/conditions/q/MO/'+document.getElementById('source').value+'.json').success(function(data) {
      console.log(data);
          temps = data.current_observation.temp_f;
                icon = data.current_observation.icon;
                name1 = document.getElementById('source').value;
            $scope.name1 = name1;
    $scope.temps = temps;
            $scope.icon = icon;
            
                     
});
        
        
       
     $http.get('https://maps.googleapis.com/maps/api/directions/json?origin='+document.getElementById('source').value+'&destination='+document.getElementById('end').value+'&key=AIzaSyCSoQH3lMpIVK_32cGNd2lYBEcpQibqsOY').success(function(data){
        
     
          temp1=data.routes[0].legs[0].steps[4].end_location.lat;
           
        temp2=data.routes[0].legs[0].steps[4].end_location.lng;
          
   $scope.temp1= temp1;
    $scope.temp2= temp2;     
   
    })
     
    $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+document.getElementById('lat1').value+'&lon='+document.getElementById('lng1').value+'&APPID=cd5851c27736df9057e4da4b9062ad00').success(function(data) {
     
       weather1 = data.weather[0].main;
        city1 = data.name;
        tempa1 = data.main.temp;
       $scope.weather1 = weather1;
        $scope.city1 = city1;
        $scope.tempa1 = tempa1;
        
    });

     
      $http.get('https://maps.googleapis.com/maps/api/directions/json?origin='+document.getElementById('source').value+'&destination='+document.getElementById('end').value+'&key=AIzaSyCSoQH3lMpIVK_32cGNd2lYBEcpQibqsOY').success(function(data){  
     
          temp3=data.routes[0].legs[0].steps[7].end_location.lat;
           
        temp4=data.routes[0].legs[0].steps[7].end_location.lng;
           $scope.temp3= temp3;
    $scope.temp4= temp4;   
    
    }) 
      
      $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+document.getElementById('lat2').value+'&lon='+document.getElementById('lng2').value+'&APPID=cd5851c27736df9057e4da4b9062ad00').success(function(data) {
     
       
       weather2 = data.weather[0].main;
        city2 = data.name;
        tempa2 = data.main.temp;
       $scope.weather2 = weather2;
        $scope.city2 = city2;
        $scope.tempa2 = tempa2;
         
    });
      
      
       $http.get('https://maps.googleapis.com/maps/api/directions/json?origin='+document.getElementById('source').value+'&destination='+document.getElementById('end').value+'&key=AIzaSyCSoQH3lMpIVK_32cGNd2lYBEcpQibqsOY').success(function(data){
       
        
     
          temp5=data.routes[0].legs[0].steps[9].end_location.lat;
           
        temp6=data.routes[0].legs[0].steps[9].end_location.lng;
          
   $scope.temp5= temp5;
    $scope.temp6= temp6;     
   
    })
     
    $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+document.getElementById('lat3').value+'&lon='+document.getElementById('lng3').value+'&APPID=cd5851c27736df9057e4da4b9062ad00').success(function(data) {
     
       weather3 = data.weather[0].main;
        city3 = data.name;
        tempa3 = data.main.temp;
       $scope.weather3 = weather3;
        $scope.city3 = city3;
        $scope.tempa3 = tempa3;
        
    });
      
           $http.get(   'http://api.wunderground.com/api/36b799dc821d5836/conditions/q/MO/'+document.getElementById('end').value+'.json').success(function(data) {
      console.log(data);
          tempd = data.current_observation.temp_f;
                icon2 = data.current_observation.icon;
                name2 = document.getElementById('end').value;
            $scope.name2 = name2;
    $scope.tempd = tempd;
            $scope.icon2 = icon2;
            
                     
});
     
     
    }
  

});

imageApp.controller("RegistrationController", function($scope,$http, $state, $httpParamSerializerJQLike) {

    $scope.createUser = function() {
               console.log("inside login function");
        var name = document.getElementById("username").value;
        var mobile = document.getElementById("mobile").value;
        var email = document.getElementById("email").value;
        var pass = document.getElementById("pass").value;
        var repass = document.getElementById("username").value;
        
        alert("name : "+name);
        $http({
            method: 'POST',
            url : 'https://api.mongolab.com/api/1/databases/labwork/collections/users?apiKey=hxRIlF7p7mAyipFbwWfI3-SCHx6jd7Vv',
            data: JSON.stringify({
                        name: name,
                        email: email,
                        mobile: mobile,
                          password:pass
                    }),
            contentType: "application/json"
        }).success(function() {
            alert("sucess");
            $scope.userName ="";
            $scope.password ="";
            $scope.email ="";

            $scope.msg ="User created successfully";
            $state.go("firebase");
                })
}
   

});
