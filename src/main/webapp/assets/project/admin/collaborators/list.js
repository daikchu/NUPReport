/**
 * Created by DaiCQ on 11/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('collaboratorsListCtrl', ['$scope', '$http', '$q','$timeout','$sce','$window', function ($scope, $http, $q,$timeout,$sce, $window) {


    $scope.page = page;
    $scope.ranks= "";
    $scope.unitId = unitId !== 0 ? unitId : "";
    $scope.subUnitId = subUnitId !== 0 ? subUnitId : "";
    $scope.units = [];
    $scope.subUnits = [];
    $scope.searchCondition={code:"", fullName:"",phone:"",passport:"", email:"", rank:"", unitId: $scope.unitId, subUnitId: $scope.subUnitId};

    $http.get(preUrl+"/collaborators/account/search-page", {params: {p:1, code:$scope.searchCondition.code, fullName: $scope.searchCondition.fullName,
            phone: $scope.searchCondition.phone,  passport: $scope.searchCondition.passport, email: $scope.searchCondition.email,
            rank: $scope.searchCondition.rank, unitId:$scope.searchCondition.unitId, subUnitId: $scope.searchCondition.subUnitId}})
        .then(function (response) {
            if(response!=null && response!='undefined' && response.status==200){
                $scope.page=response.data;
                $scope.page.pageCount=getPageCount($scope.page);
                $scope.page.pageList=getPageList($scope.page);
            }

        });

    $scope.search=function () {
        $http.get(preUrl+"/collaborators/account/search-page", {params: {p:1, code:$scope.searchCondition.code, fullName: $scope.searchCondition.fullName,
                phone: $scope.searchCondition.phone,  passport: $scope.searchCondition.passport, email: $scope.searchCondition.email,
                rank: $scope.searchCondition.rank, unitId:$scope.searchCondition.unitId, subUnitId: $scope.searchCondition.subUnitId}})
            .then(function (response) {
                if(response!=null && response!='undefined' && response.status==200){
                    $scope.page=response.data;
                    $scope.page.pageCount=getPageCount($scope.page);
                    $scope.page.pageList=getPageList($scope.page);
                    if($scope.pageCount===0){
                        $('#contentTable').hide();
                        $('#message_noContent').show();
                    }
                }
            });
    };

    $scope.loadPage=function (pageNumber) {
        if(pageNumber>=1){

            $http.get(preUrl+"/collaborators/account/search-page", {params: {p:pageNumber, code:$scope.searchCondition.code, fullName: $scope.searchCondition.fullName,
                    phone: $scope.searchCondition.phone,  passport: $scope.searchCondition.passport, email: $scope.searchCondition.email,
                    rank: $scope.searchCondition.rank, unitId:$scope.searchCondition.unitId, subUnitId: $scope.searchCondition.subUnitId}})
                .then(function (response) {
                    if(response!=null && response!='undefined' && response.status==200){
                        $scope.page=response.data;
                        $scope.page.pageCount=getPageCount($scope.page);
                        $scope.page.pageList=getPageList($scope.page);
                    }

                });
        }

    };

    $http.get(preUrl + "/system/unit/list/all")
        .then(function (response) {
            $scope.units = response.data;
        });

    $scope.getSubUnitByParent = function (parentId) {
        if(parentId===''){
            $scope.subUnits = [];
        }
        else{
            $http.get(preUrl + "/system/unit/list-by-parent-id", {
                params: {
                    parentId: parentId
                }
            })
                .then(function (response) {
                    $scope.subUnits = response.data;
                    //  return response.data;
                });
        }


    }

    //query get all ranks
    $http.get(preUrl+"/system/rank-collaborators/list/all")
        .then(function (response) {
            $scope.ranks=response.data;
        });

    $scope.clearCondition=function () {
        $scope.searchCondition.fullName="";
        $scope.searchCondition.phone="";
        $scope.searchCondition.passport="";
        $scope.searchCondition.email="";
        $scope.searchCondition.rank="";
        $scope.searchCondition.unitId="";
        $scope.searchCondition.subUnitId="";
        $scope.searchCondition.code="";
    };


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

    $scope.getUnitById = function(id){
        var units = $scope.units;
        for(var i=0;i<units.length;i++){
            if(units[i].id===id){
                return units[i];
            }
        }
    }

    $scope.getSubUnitById = function(id){
        var subUnits = $scope.subUnits;
        for(var i=0;i<subUnits.length;i++){
            if(subUnits[i].id===id){
                return subUnits[i];
            }
        }
    }

    $scope.getRankById = function(id){
        var ranks = $scope.ranks;
        for(var i=0;i<ranks.length;i++){
            if(ranks[i].id===id){
                return ranks[i];
            }
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
    $scope.changeRank = function(rankId, col){
        $scope.thisRank = $scope.getRankById(rankId);
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

