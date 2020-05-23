
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('DailyCollectionByKiosksController', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {

    $scope.searchCondition = {polyclinic: "", dateFrom: "", dateTo: "", kioskId:"", terminalId:""};
    $scope.page = page;

    $scope.polyclinics = [];
    $scope.terminals = [];


    //api lấy danh sách params polyclinics
    $http.get(preUrl + "/params/getListPolyclinicsParam")
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.polyclinics = response.data;
            }

        });

    //api lấy danh sách params kioskId
    $http.get(preUrl + "/params/getListQsoftTerminalParam")
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.terminals = response.data;
            }

        });




    $http.get(preUrl + "/report/getPageDailyCollectionByKiosksReport", {
        params: {
            p: 1,
            polyclinic: $scope.searchCondition.polyclinic,
            dateFrom: $scope.searchCondition.dateFrom,
            dateTo: $scope.searchCondition.dateTo,
            kioskId: $scope.searchCondition.kioskId,
            terminalId: $scope.searchCondition.terminalId
        }
    })
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.page = response.data;
                $scope.page.pageCount = getPageCount($scope.page);
                $scope.page.pageList = getPageList($scope.page);
            }

        });

    $scope.search = function () {

        /* var assignDateFrom = $('#fromDate_assignDate').val();
         var assignDateTo = $('#toDate_assignDate').val();
         var endDateFrom = $('#fromDate_endDate').val();
         var endDateTo = $('#toDate_endDate').val();*/

        $http.get(preUrl + "/report/getPageDailyCollectionByKiosksReport", {
            params: {
                p: 1,
                polyclinic: $scope.searchCondition.polyclinic,
                dateFrom: $scope.searchCondition.dateFrom,
                dateTo: $scope.searchCondition.dateTo,
                kioskId: $scope.searchCondition.kioskId,
                terminalId: $scope.searchCondition.terminalId
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

            $http.get(preUrl + "/report/getPageDailyCollectionByKiosksReport", {
                params: {
                    p: pageNumber,
                    polyclinic: $scope.searchCondition.polyclinic,
                    dateFrom: $scope.searchCondition.dateFrom,
                    dateTo: $scope.searchCondition.dateTo,
                    kioskId: $scope.searchCondition.kioskId,
                    terminalId: $scope.searchCondition.terminalId
                }
            })
                .then(function (response) {
                    $scope.page = response.data;
                    $scope.page.pageList = getPageList($scope.page);
                    $scope.page.pageCount = getPageCount($scope.page);
                });
        }

    };

    $scope.export = function () {
        window.location.href = preUrl + "/statistic/task/export?taskCode=" + $scope.searchCondition.code + "&taskName=" + $scope.searchCondition.name
            + "&taskStatus=" + $scope.searchCondition.status + "&resultEvaluation=" + $scope.searchCondition.resultEvaluation
            + "&assignDateFrom=" + $scope.searchCondition.assignDateFrom + "&assignDateTo=" + $scope.searchCondition.assignDateTo
            + "&endDateFrom=" + $scope.searchCondition.endDateFrom + "&endDateTo=" + $scope.searchCondition.endDateTo
            + "&levelJoin=" + $scope.searchCondition.levelJoin;
    };


    $scope.clearCondition = function () {
        $scope.searchCondition.polyclinic = "";
        $scope.searchCondition.dateFrom = "";
        $scope.searchCondition.dateTo = "";
        $scope.searchCondition.kioskId = "";
        $scope.searchCondition.terminalId = "";
    };

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

