var app = angular.module("ang", []);

app.controller('MainController', ['$scope', function($scope) {
    var standbyTxt = {red: "", blue: "", green: ""};
    var standbyBg = {red: "", blue: "", green: ""};
//pull local storage backgrounds
    if (localStorage.redBg) {
        $scope.red = 0;
        standbyBg.red =  localStorage.redBg;
    }   else {
        $scope.red = 0;
        standbyBg.red =  0;
    }
    if (localStorage.greenBg) {
        $scope.green = 0;
         standbyBg.green =  localStorage.greenBg;
    }   else {
        $scope.green = 0;
        standbyBg.green = 0;
    }
    if (localStorage.blueBg) {
        $scope.blue =0;
        standbyBg.blue = localStorage.blueBg;
    }   else {
        $scope.blue = 0;
        standbyBg.blue = 0;
    }
//pull local storage text
    if (localStorage.redTxt) {
        $scope.red = 0;
        standbyTxt.red = localStorage.redTxt;
    }   else {
        $scope.red = 0;
        standbyTxt.red = 0;
    }
    if (localStorage.greenTxt) {
        $scope.green = 0;
        standbyTxt.green =  localStorage.greenTxt;
    }   else {
        $scope.green = 0;
        standbyTxt.green = 0;
    }
    if (localStorage.blueTxt) {
        $scope.blue = 0;
        standbyTxt.blue =  localStorage.blueTxt;
    }   else {
        $scope.blue = 0;
        standbyTxt.blue = 0;
    }
//slider change save to standby
    $scope.rgbChange = function(r, g, b) {   
        if ($scope.activeTxt) {
            pullTxt = 'rgb('+r+','+g+','+ b+')';
            standbyTxt.red = r ;
            standbyTxt.green = g ;
            standbyTxt.blue = b ;
            stay = 'rgb('+standbyBg.red+','+standbyBg.green+','+ standbyBg.blue+')';
            $scope.rgb = {'background-color': stay , 'color' : pullTxt};     
        }
        if ($scope.activeBg) {
            pullBg = 'rgb('+r+','+g+','+ b+')';
            standbyBg.red = r ;
            standbyBg.green = g ;
            standbyBg.blue = b ;        
            stay = 'rgb('+standbyTxt.red+','+standbyTxt.green+','+ standbyTxt.blue+')';
            $scope.rgb = {'background-color' :  pullBg , 'color' : stay};     
        }        
    };

    $scope.setText = function(r, g, b) {   
        if ($scope.activeTxt) {
            $scope.activeTxt = false;
            $scope.red = 0;
            $scope.green = 0;
            $scope.blue = 0;
        }   else {
            $scope.activeTxt = true;
            if (standbyTxt.red) {$scope.red = standbyTxt.red;} 
            if (standbyTxt.green) {$scope.green = standbyTxt.green;}  
            if (standbyTxt.blue) {$scope.blue = standbyTxt.blue;}   
        }
         if ($scope.activeBg) {
            $scope.activeBg = false;
        }    
    };

     $scope.setBg = function(r, g, b) {   
        if ($scope.activeBg) {
            $scope.activeBg = false;
            $scope.red = 0;
            $scope.green = 0;
            $scope.blue = 0;
        }   else {
            $scope.activeBg = true;
            if (standbyBg.red) {$scope.red = standbyBg.red;} 
            if (standbyBg.green) {$scope.green = standbyBg.green;}  
            if (standbyBg.blue) {$scope.blue = standbyBg.blue;}   
        }
         if ($scope.activeTxt) {
            $scope.activeTxt = false;
        }  
    };
    $scope.applyStyle =  function() {
            localStorage.setItem('redTxt', standbyTxt.red);
            localStorage.setItem('greenTxt', standbyTxt.green);
            localStorage.setItem('blueTxt', standbyTxt.blue);    
            localStorage.setItem('redBg', standbyBg.red);
            localStorage.setItem('greenBg', standbyBg.green);
            localStorage.setItem('blueBg', standbyBg.blue);
            applyTxt = 'rgb('+localStorage.redTxt+','+localStorage.greenTxt+','+ localStorage.blueTxt+')';
            applyBg = 'rgb('+localStorage.redBg+','+localStorage.greenBg+','+ localStorage.blueBg+')';
            $scope.bodyStyle = {'background-color' :  applyBg , 'color' : applyTxt};         
            $scope.rgb = {'background-color' :  applyBg , 'color' : applyTxt};        
    }
    $scope.applyStyle();
    $scope.clearStyle = function() {
        standbyTxt = {red: 0, blue: 0, green: 0};
        standbyBg = {red: 255, blue: 255, green: 255};
        applyTxt = 'rgb('+standbyTxt.red+','+standbyTxt.green+','+ standbyTxt.blue+')';
        applyBg = 'rgb('+standbyBg.red+','+standbyBg.green+','+ standbyBg.blue+')';
        $scope.rgb = {'background-color' :  applyBg , 'color' : applyTxt};        
    }
}]);