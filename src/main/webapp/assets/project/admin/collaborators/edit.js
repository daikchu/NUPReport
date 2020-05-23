/**
 * Created by DaiCQ on 11/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('collaboratorsEditCtrl', ['$scope', '$http', '$q','$timeout','$sce','$window', function ($scope, $http, $q,$timeout,$sce, $window) {


    $scope.page = page;
    $scope.ranks= "";
    $scope.unitId = unitId;
    $scope.subUnitId = subUnitId;
    $scope.units = [];
    $scope.subUnits = [];

/*    $http.get(preUrl+"/collaborators/account/search-page", {params: {p:1, fullName: $scope.searchCondition.fullName,
            phone: $scope.searchCondition.phone,  passport: $scope.searchCondition.passport, email: $scope.searchCondition.email,
            rank: $scope.searchCondition.rank, subUnitId: $scope.searchCondition.subUnitId}})
        .then(function (response) {
            if(response!=null && response!='undefined' && response.status==200){
                $scope.page=response.data;
                $scope.page.pageCount=getPageCount($scope.page);
                $scope.page.pageList=getPageList($scope.page);
            }

        });*/



    $http.get(preUrl + "/system/unit/list/all")
        .then(function (response) {
            $scope.units = response.data;
        });

    $scope.getSubUnitByParent = function (parentId) {
        $('#unitId').val(parentId);
        $http.get(preUrl + "/system/unit/list-by-parent-id", {
            params: {
                parentId: parentId
            }
        })
            .then(function (response) {
                $scope.subUnits = response.data;
                if($scope.subUnits.length>0) $scope.subUnitId = $scope.subUnits[0].id;
                //  return response.data;
            });
    }

    $scope.setValueSubUnitId = function(id){
        $('#subUnitId').val(id);
    }

    //get list sub unit by parent unit
    $http.get(preUrl + "/system/unit/list-by-parent-id", {
        params: {
            parentId: unitId
        }
    })
        .then(function (response) {
            $scope.subUnits = response.data;
            //  return response.data;
        });

    //query get all ranks
    $http.get(preUrl+"/system/rank-collaborators/list/all")
        .then(function (response) {
            $scope.ranks=response.data;
        });



    function convertToDashString(string) {
        var result = ""
        var arr_string = string.split(" ");
        for(var i = 0; i<arr_string.length; i++){
            result+=arr_string[i]+"-";
        }
        return result.substr(0, result.length-1);
    }

    $scope.itemDeleteId=0;
    $scope.deleteItem=function (id) {
        $scope.itemDeleteId=0;
        if(id>0){
            $scope.itemDeleteId=id;
        }
    }

    function getRankByOrder(order){
        var ranks = $scope.ranks;
        for(var i=0;i<ranks.length;i++){
            if(ranks[i].order===order){
                return ranks[i];
            }
        }
    }


    $scope.thisRank = {};
    $scope.thisColChangeRank = "";
    $scope.changeRank = function(rank, col){
        $scope.thisRank = rank;
        $scope.thisColChangeRank = col;
    }
    $scope.upRank = function (rank) {
        if(rank.order < $scope.ranks.length){
            var newOrder = rank.order + 1;
            $scope.thisRank = getRankByOrder(newOrder);
        }

    }

    $scope.downRank = function (rank) {
        if(rank.order > 1){
            var newOrder = rank.order - 1;
            $scope.thisRank = getRankByOrder(newOrder);
        }

    }

    $scope.apiChangeRank = function (rank, col) {
        col.rank = rank;
        /* $http.post(preUrl + "/collaborators/account/changeRank", col, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
             .then(function (response) {
                     if (response.data.success === true) {
                         $window.location.href = preUrl+'/collaborators/account/list';
                     }
                 },
                 function (response) {
                     console.log("lỗi gọi api getAllTopic");
                 });*/

        $http.get(preUrl+"/collaborators/account/changeRank", {params: {col_id:col.id, rank_id:rank.id}})
            .then(function (response) {
                if (response.data === true) {
                    $window.location.href = preUrl+'/collaborators/account/list';
                }

            });
    }


}]);

/*When click my-enter*/
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

