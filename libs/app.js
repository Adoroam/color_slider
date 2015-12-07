var app = angular.module("ang", []);

app.controller('MainController', ['$scope', function($scope) {
//set standby variable
    var standby =[
        {red: "", blue: "", green: ""},
        {red: "", blue: "", green: ""}
    ] ;
    $scope.active = [false, false];
//clear scope colors
    $scope.red = 0;
    $scope.green = 0;
    $scope.blue = 0;
//set local storage to standby or set to clear colors
    if (localStorage.backgroundred) {
        standby =[
            {red: localStorage.backgroundred, green: localStorage.backgroundgreen, blue: localStorage.backgroundblue},
            {red: localStorage.textred, green: localStorage.textgreen, blue: localStorage.textblue}
        ] ;
    }   else {
        standby =[
            {red: 255, green: 255, blue: 255},
            {red: 0, green: 0, blue: 0}
        ] ;
    }

//slider change save to standby and set preview
    $scope.rgbInternal = function(r, g, b, index) {
            standby[index].red = r ; standby[index].green = g ; standby[index].blue = b ;
            var x = 'rgb('+standby[1].red+','+standby[1].green+','+ standby[1].blue+')';
            var y = 'rgb('+standby[0].red+','+standby[0].green+','+ standby[0].blue+')';
            $scope.rgb = {'background-color': y , 'color' : x};           
    }
    $scope.rgbChange = function(r, g, b) {   
        if ($scope.active[1]) {
            $scope.rgbInternal(r, g, b, 1);
        }
        if ($scope.active[0]) {
            $scope.rgbInternal(r, g, b, 0);
        }        
    };

    $scope.set = function(item) {   
        if (item == 'bg') {
            index = 0;
            alt = 1;            
        }
        if (item == 'text') {
            index = 1;    
            alt = 0;
        } 
        if ($scope.active[index] ) {
            $scope.active[index] = false;
            $scope.red = 0; $scope.green = 0; $scope.blue = 0;
        }   else {
            $scope.active[index] = true;
            if (standby[index].red || standby[index].green || standby[index].blue) {
                $scope.red = standby[index].red;
                $scope.green = standby[index].green;
                $scope.blue = standby[index].blue;
            } 
        }
         if ($scope.active[alt]) {
            $scope.active[alt] = false;
        }    
    };
    $scope.applyStyle =  function() {
            localStorage.setItem('textred', standby[1].red);
            localStorage.setItem('textgreen', standby[1].green);
            localStorage.setItem('textblue', standby[1].blue);    
            localStorage.setItem('backgroundred', standby[0].red);
            localStorage.setItem('backgroundgreen', standby[0].green);
            localStorage.setItem('backgroundblue', standby[0].blue);
            var x = 'rgb('+localStorage.backgroundred+','+localStorage.backgroundgreen+','+ localStorage.backgroundblue+')';
            var y = 'rgb('+localStorage.textred+','+localStorage.textgreen+','+ localStorage.textblue+')';
            $scope.bodyStyle = {'background-color' :  x , 'color' : y};         
            $scope.rgb = {'background-color' :  x , 'color' : y};        
    }
    $scope.applyStyle();
    $scope.clearStyle = function() {
        standby = [
            {red: 255, blue: 255, green: 255},
            {red: 0, blue: 0, green: 0}
        ];
        var x = 'rgb('+standby[0].red+','+standby[0].green+','+ standby[0].blue+')';
        var y = 'rgb('+standby[1].red+','+standby[1].green+','+ standby[1].blue+')';
        $scope.rgb = {'background-color' :  x , 'color' : y};        
    }
}]);