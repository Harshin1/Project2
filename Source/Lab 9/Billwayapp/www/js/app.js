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
            alert("success");
            // alert(data[0]._id.$oid);
            if(data==""){
                alert("null");
                  $scope.errormsg = "No user found"       
                        $state.go("firebase");
            }else{
                alert("data : "+data)
                alert("user : "+data[0].name);
            alert("pass : "+data[0].password);
              if (username == data[0].name && password == data[0].password) {
                       // localStorage.setItem("name" , username);
                  
                  var User = (function () {
  // Instance stores a reference to the Singleton
  var instance;

  function init() {
    // Singleton
    // Private methods and variables
    function privateMethod(){
        console.log( "I am logged in" );
    }

    var privateVariable = "I am also logged in";

    return {
      // Public methods
      fullName: function () {
        return instance.firstName +" "+instance.lastName;
      },
      //Public Properties
      firstName : "Harshini",
      lastName : "M"
    };
  };

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
})();
        
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
            alert("success");
            // alert(data[0]._id.$oid);
            if(data==""){
                alert("null");
                  $scope.errormsg = "No user found"       
                        
            }else{
                alert("data : "+data)
                alert("user : "+data[0].name);
                alert("oid : "+data[0]._id.$oid);
            alert("pass : "+data[0].password);
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
            alert("success");
            // alert(data[0]._id.$oid);
            if(data==""){
                alert("null");
                  $scope.errormsg = "No user found"       
                        
            }else{
                alert("data : "+data)
                alert("user : "+data[0].name);
                alert("oid : "+data[0]._id.$oid);
            alert("pass : "+data[0].password);
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
        /*fbAuth.$createUser({email: username, password: password}).then(function(userData) {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });*/
        
        
        
        $state.go("register");
    }
    
    $scope.scan = function() {
        //alert("scan in");
        $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
            
        // Success! Barcode data is here
            //alert("text : "+barcodeData.text);
            //alert("format : "+barcodeData.format);
            text = barcodeData.text;
            format = barcodeData.format;
            $scope.barcode = text;
            $scope.format = format;
            $scope.msg = "Barcode is "+text+" with format "+format
            /*$scope.barcodes.push( "Barcode is "+text+" with format "+format);*/
      },function(error) {
       alert("an error occured");
      });
    }

});

//secure controller

/*imageApp.controller("SecureController", function($scope, $ionicHistory, $firebaseArray, $cordovaCamera) {

    $ionicHistory.clearHistory();  //for clearing user login history

    $scope.images = [];

    var fbAuth = fb.getAuth();
    if(fbAuth) {
        var userReference = fb.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs
        $scope.images = syncArray;
    } else {
        $state.go("firebase");  //directs to firebase page
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }

});*/


imageApp.controller("LoginController", function($scope, $state,$http) {
        var user = localStorage.getItem("name");
    $scope.user = user;
    //alert("user : "+user);
    
    $scope.getWeather = function() {
        alert("in");
    var url = document.getElementById('barcode1').value;
    $http.get('https://api.idolondemand.com/1/api/sync/recognizebarcodes/v1?url='+url+'&apikey=77c8a034-ae01-4f7f-ac7e-f28a5f55b374').success(function(data){
    
      console.log(data);
       
          name = data.barcode[0].text;
                
    $scope.st_place = name;
     $scope.image = url;   
    
        var output= name.slice(-12);
        $scope.st1_place = output;
                     
});
    
    
}; 
    
$scope.getDetails = function() {
    
     
    
    /* var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+document.getElementById('barcode').value+'&format=json';*/
    
    var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc=885909395095&format=json';
    
        alert("url : "+url);
    $http.get(url).success(function(data){
            
       alert("out");
      console.log(data);
       
          name = data.items[0].name;
                
    $scope.end_place = name;
    
                     
});
};    
    

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
