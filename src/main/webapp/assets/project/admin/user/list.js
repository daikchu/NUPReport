/**
 * Created by DaiCQ on 07/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('userListCtrl', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {

    $scope.searchCondition = {username: "", fullName: "", email: "", status: "", unitId: "", subUnitId: "", codePosition:""};
    $scope.page = page;
    $scope.units = [];
    $scope.subUnits = [];
    $scope.positions=[];
    $scope.isOpenUnitOption=false;
    $scope.isOpenSubUnitOption=false;

    $('.cc-mainbox').toggleClass('loaded');

    function hide_loader() {
        $(".cc-mainbox").removeClass("loaded");
        $('#loader-wrapper').remove();
        //event.preventDefault();
    }

    //set default tab to TCCC
    $scope.tab_active = 1;

    $http.get(preUrl + "/system/user/api-search-page", {
        params: {
            p: 1,
            username: $scope.searchCondition.username,
            fullName: $scope.searchCondition.fullName,
            email: $scope.searchCondition.email,
            status: $scope.searchCondition.status,
            unitId: $scope.searchCondition.unitId,
            subUnitId: $scope.searchCondition.subUnitId,
            codePosition: $scope.searchCondition.codePosition
        }
    })
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.page = response.data;
                $scope.page.pageCount = getPageCount($scope.page);
                $scope.page.pageList = getPageList($scope.page);
                /*      $scope.pageNotaryProcs=$scope.pageNotaryProcs.items;*/
                hide_loader();
            }

        });

    $scope.search = function () {
        $http.get(preUrl + "/system/user/api-search-page", {
            params: {
                p: 1,
                username: $scope.searchCondition.username,
                fullName: $scope.searchCondition.fullName,
                email: $scope.searchCondition.email,
                status: $scope.searchCondition.status,
                unitId: $scope.searchCondition.unitId,
                subUnitId: $scope.searchCondition.subUnitId,
                codePosition: $scope.searchCondition.codePosition
            }
        })
            .then(function (response) {
                $scope.page = response.data;
                $scope.page.pageList = getPageList($scope.page);
                $scope.page.pageCount = getPageCount($scope.page);
            });
    };

    $scope.loadPage = function (pageNumber) {
        if (pageNumber >= 1) {

            $http.get(preUrl + "/system/user/api-search-page", {
                params: {
                    p: pageNumber,
                    username: $scope.searchCondition.username,
                    fullName: $scope.searchCondition.fullName,
                    email: $scope.searchCondition.email,
                    status: $scope.searchCondition.status,
                    unitId: $scope.searchCondition.unitId,
                    subUnitId: $scope.searchCondition.subUnitId,
                    codePosition: $scope.searchCondition.codePosition
                }
            })
                .then(function (response) {
                    $scope.page = response.data;
                    $scope.page.pageList = getPageList($scope.page);
                    $scope.page.pageCount = getPageCount($scope.page);
                });
        }

    };

/*    $scope.changePosition=function(position){
        if(position==='DON_VI'){
            $scope.isOpenUnitOption=true;
            getListUnit();
        }
        else if(position==='NHOM' || position==='CTV'){
            $scope.isOpenUnitOption=true;
            $scope.isOpenSubUnitOption=true;
            getListUnit();
        }
        else {
            $scope.searchCondition.unitId="";
            $scope.searchCondition.subUnitId="";
            $scope.isOpenUnitOption=false;
            $scope.isOpenSubUnitOption=false;
        }
    }*/

    //query get all don vi
    $http.get(preUrl + "/system/unit/list/all")
        .then(function (response) {
            $scope.units = response.data;
        });

/*    function getListUnit(){
        //query get all don vi
        $http.get(preUrl + "/system/unit/list/all")
            .then(function (response) {
                $scope.units = response.data;
            });
    }*/

    $scope.getSubUnitByParent = function (parentId) {
        if(parentId===''){
            $scope.subUnits = [];
            $scope.searchCondition.subUnitId="";
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



    //query get all chuc vu
    $http.get(preUrl + "/position/list/all")
        .then(function (response) {
            $scope.positions = response.data;
        });

/*    //query get all chuc vu by don vi id
    $scope.getListUnitPosition = function (unitId) {
        $http.get(preUrl + "/unit-position/list-by-unit", {
            params: {
                unitId: unitId
            }
        })
            .then(function (response) {
                $scope.listChucVu = response.data;
            });
    };*/


    $scope.clearCondition = function () {
        $scope.searchCondition.username = "";
        $scope.searchCondition.fullName = "";
        $scope.searchCondition.email = "";
        $scope.searchCondition.status = "";
        $scope.searchCondition.unitId = "";
        $scope.searchCondition.subUnitId = "";
        $scope.searchCondition.codePosition = "";
    };


    function convertToDashString(string) {
        var result = "";
        var arr_string = string.split(" ");
        for (var i = 0; i < arr_string.length; i++) {
            result += arr_string[i] + "-";
        }
        return result.substr(0, result.length - 1);
    }

    $scope.itemDeleteId = 0;
    $scope.deleteItem = function (id) {
        $scope.itemDeleteId = 0;
        if (id > 0) {
            $scope.itemDeleteId = id;
        }
    }


}]);

/*When click my-enter*/
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

