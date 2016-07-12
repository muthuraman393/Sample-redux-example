var navCtrl = app.controller('navCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$filter','$http','Entry','$timeout' ,function($scope, $rootScope, $routeParams, $location, $filter,$http,Entry,$timeout) {
    $scope.homeitems = [{
        nameid: 'ford_1',
        src: 'img/puzzle/casa3x2/fiesta/Ford_Original.png',
        car: 'fiesta'
    }, {
        nameid: 'ford_2',
        src: 'img/puzzle/casa3x2/focus/Ford_Original.png',
        car: 'focus'
    }, {
        nameid: 'ford_3',
        src: 'img/puzzle/casa3x2/fusion/Ford_Original.png',
        car: 'fusion'
    }, {
        nameid: 'ford_4',
        src: 'img/puzzle/casa3x2/mustang/Ford_Original.png',
        car: 'mustang'
    }];

    $scope.query = {}
    $scope.queryBy = '$'

    /*$http.get("assets/api/data.json")
    .then(function(response) {
        $scope.list2 = response.data;
    });*/

    var entries = Entry.query().$promise.then(function(value) {
    //$timeout(function () {
    //alert('asd');
    console.log(value);
    $scope.list2 = value;
    $scope.recordloader = true;
    //}, 2000);
    }); //query() returns all the entries

    

    

    angular.forEach($scope.list2, function(item) {
        item.Selected = false;
    });
    $scope.boolChangeClass = false;
    $scope.visiblecompose = true; //to true
    $scope.visiblepencil = false;
    $scope.visiblecross = true;
    //$scope.visibleinnerreadmail = [];
    $scope.visibleinnermailopensend = true;
    $scope.tickboxunselected = false;
    $scope.toreplyclass = false;
    $scope.recordloader = false;


    $scope.composeopen = function() {
        $scope.visiblecompose = true; //to false

        if ($scope.visiblecross == false && $scope.visiblepencil == true) {
            $scope.visiblepencil = false;
            $scope.visiblecross = true;

        } else {
            $scope.visiblecross = false;
            $scope.visiblepencil = true;
            $scope.visiblecompose = false;

        }

    };
    $scope.composeclose = function() {
        //$scope.visiblecompose = true;
    };


    $scope.innermailopen = function(index) {
       //alert(index+'open');
       console.log($scope.list2[index]);
       $scope.closeallinnermails();
       $scope.list2[index].visibleinnerreadmail = 'open'; 

        
    };

    $scope.closeallinnermails = function(index) {
        angular.forEach($scope.list2, function(item) {
        item.visibleinnerreadmail = 'close';
        });
    };


    $scope.stateChanged = function(tickid, qId) {
         var falsecount = 0;
        if ($scope.list2[tickid].Selected == false) {
            //alert('test'+$scope.list2[tickid].Selected+'_innermail'+$scope.visibleinnermail);
            $scope.visibleinnermailopensend = true;
            $scope.toreplyclass = false;
           

            angular.forEach($scope.list2, function(item) { /*to check uncheck master*/
                if (item.Selected == true) {
                    $scope.tickboxunselected = true;
                    return false;
                } else {
                    falsecount = falsecount + 1;

                    if (falsecount == $scope.list2.length) {
                        $scope.tickboxunselected = false;
                        $scope.selectedAll = false;
                    }
                }
            });

        }
        if ($scope.list2[tickid].Selected == true) {
            $scope.visibleinnermailopensend = false;
            $scope.toreplyclass = true;
             
            angular.forEach($scope.list2, function(item) { /*to check uncheck master*/
                if (item.Selected == true) {
                    $scope.tickboxunselected = true;
                    return false;
                } else {
                    falsecount = falsecount + 1;

                    if (falsecount == $scope.list2.length) {
                        $scope.tickboxunselected = false;
                        $scope.selectedAll = false;
                    }
                }
            });

        }

        if(falsecount<=0)
		$scope.tickboxunselected=false;

        console.log($scope.tickboxunselected,falsecount);
        callapplymanual($scope);                  


    };

    var callapplymanual = function($scope){
             
    }


    /* $scope.innermailopensend = function() {
            $scope.visibleinnermailopensend = $scope.visibleinnermailopensend?false:true;
            }; */

    $scope.checkAll = function() {
        $scope.tickboxunselected = false;
        if ($scope.selectedAll) {
            //alert('if'+$scope.selectedAll);
            $scope.selectedAll = true
        } else {
            //alert('else'+$scope.selectedAll);
            $scope.selectedAll = false;
        }
        angular.forEach($scope.list2, function(item) {
            item.Selected = $scope.selectedAll;
        });

    };


}]);