
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('TransactionErrorReportController', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {

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




    $http.get(preUrl + "/report/getPageDataTransactionErrorReport", {
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

         $scope.searchCondition.dateFrom = $('#dateFrom').val();
        $scope.searchCondition.dateTo = $('#dateTo').val();

        $http.get(preUrl + "/report/getPageDataTransactionErrorReport", {
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

            $http.get(preUrl + "/report/getPageDataTransactionErrorReport", {
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


    $(document).ready(function () {

        /*lay ngay hien tại để gán max cho datepicker*/
        var now = new Date();
        var endDate = ("0" + now.getDate()).slice(-2) + '/' + ("0" + (now.getMonth() + 1)).slice(-2) + '/' + now.getFullYear();
        /*khu vực viet câm' nhập các ký tự trên bàn phím*/
        var digitsOnly = /[1234567890]/g;
        var forDate = /[1234567890/]/g;
        var NoOnly = /[~]/g;
        var integerOnly = /[0-9\.]/g;
        var alphaOnly = /[A-Za-z]/g;

        $('#fromDate_assignDate').datepicker({
            format: "dd/mm/yyyy",
            startDate: "01/01/1900",
            endDate: endDate,
            forceParse: false,
            language: 'vi'
        }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });



    });

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

