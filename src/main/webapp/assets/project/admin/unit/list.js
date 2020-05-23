/**
 * Created by DaiCQ on 07/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('unitListCtrl', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {

    $scope.searchCondition = {name: ""};
    $scope.page = page;
    $scope.units = [];
    $scope.subUnits = [];
    $scope.listChucVu = "";

    //set default tab to TCCC
    $scope.tab_active = 1;

/*    init();
    function init(){
        $scope.search();
    }*/

    $http.get(preUrl + "/system/unit/api-search-page", {
        params: {
            p: 1,
            name: $scope.searchCondition.name
        }
    })
        .then(function (response) {
            $scope.page = response.data;
            $scope.page.pageList = getPageList($scope.page);
            $scope.page.pageCount = getPageCount($scope.page);
        });

    $scope.search = function () {
        $http.get(preUrl + "/system/unit/api-search-page", {
            params: {
                p: 1,
                name: $scope.searchCondition.name
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
                    name: $scope.searchCondition.name
                }
            })
                .then(function (response) {
                    $scope.page = response.data;
                    $scope.page.pageList = getPageList($scope.page);
                    $scope.page.pageCount = getPageCount($scope.page);
                });
        }

    };


    //query get all chuc vu by don vi id
    $scope.getListUnitPosition = function (unitId) {
        $http.get(preUrl + "/unit-position/list-by-unit", {
            params: {
                unitId: unitId
            }
        })
            .then(function (response) {
                $scope.listChucVu = response.data;
            });
    };


    $scope.clearCondition = function () {
        $scope.searchCondition.name = "";
    };

    $scope.getSubUnitByParent = function (parentId) {

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

