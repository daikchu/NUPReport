/**
 * Created by DaiCQ on 07/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('rankListCtrl', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {

    $scope.searchCondition = {name: ""};
    $scope.page = page;
    $scope.ranks = [];

    $http.get(preUrl + "/system/rank-collaborators/api-search-page", {
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
        $http.get(preUrl + "/system/rank-collaborators/api-search-page", {
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

            $http.get(preUrl + "/system/rank-collaborators/api-search-page", {
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



    $scope.clearCondition = function () {
        $scope.searchCondition.name = "";
    };


    function convertToDashString(string) {
        var result = "";
        var arr_string = string.split(" ");
        for (var i = 0; i < arr_string.length; i++) {
            result += arr_string[i] + "-";
        }
        return result.substr(0, result.length - 1);
    }

    $scope.rankEdit = {};
    $scope.messageEditRank = "";
    $scope.editRank = function (item) {
        $scope.rankEdit = item;
    };

    $scope.actionEditRank = function () {
        if (validateRankEdit($scope.rankEdit) === false) {
            return;
        }
        $http.post(preUrl + "/system/rank-collaborators/edit", $scope.rankEdit, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
            .then(function (response) {
                    if (response.data === true) {
                        $('#editRank').modal('hide');
                        /*$window.location.href = preUrl + '/social/international-topic/list';*/
                    } else {
                        $scope.messageEditRank = "Sửa thất bại";
                    }
                },
                function (response) {
                    console.log("lỗi gọi api getAllTopic");
                });
    };

    $scope.rankAdd = {name: "", point: "", description: ""};
    /*$scope.messageEditSubUnit = "";*/
    $scope.actionAddRank = function () {
        if (validateRank($scope.rankAdd) === false) {
            return;
        }
        $http.post(preUrl + "/system/rank-collaborators/add", $scope.rankAdd, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
            .then(function (response) {
                    if (response.data === true) {
                        $('#addRank').modal('hide');
                        /*$window.location.href = preUrl + '/social/international-topic/list';*/
                    } else {
                        $scope.messageAddRank = "Thêm mới thất bại";
                    }
                },
                function (response) {
                    console.log("lỗi gọi api getAllTopic");
                });
    };

    function validateRank(item) {
        $scope.messageAddRank_Name = "";
        if (item.name === "") {
            $scope.messageAddRank_Name = "Tên cấp bậc không được để trống";
            return false;
        }
        if (item.point === "") {
            $scope.messageAddRank_Point = "Số điểm không được để trống";
            return false;
        }
        return true;
    }

    function validateRankEdit(item) {
        $scope.messageEditRank_Name = "";
        if (item.name === "") {
            $scope.messageEditRank_Name = "Tên cấp bậc không được để trống";
            return false;
        }
        if (item.point === "") {
            $scope.messageEditRank_Point = "Số điểm không được để trống";
            return false;
        }
        return true;
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

