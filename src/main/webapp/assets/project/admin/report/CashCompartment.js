
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('CashCompartmentController', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {

    $scope.searchCondition = {code: "", name: "", status: "", resultEvaluation:"", levelJoin:"",
        assignDateFrom:"", assignDateTo:"", endDateFrom:"", endDateTo:""};
    $scope.page = page;
    $scope.listDonVi = "";
    $scope.listChucVu = "";
    $scope.listTaskType = "";


    $('.cc-mainbox').toggleClass('loaded');

    function hide_loader() {
        $(".cc-mainbox").removeClass("loaded");
        $('#loader-wrapper').remove();
        //event.preventDefault();
    }

    //api lấy danh sách loại lệnh tin
    $http.get(preUrl + "/statistic/task/type/list")
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.listTaskType = response.data;
            }

        });

    //set default tab to TCCC
    $scope.tab_active = 1;

    $http.get(preUrl + "/statistic/task/api-search-page-web", {
        params: {
            p: 1,
            taskCode: $scope.searchCondition.code,
            taskName: $scope.searchCondition.name,
            taskStatus: $scope.searchCondition.status,
            resultEvaluation: $scope.searchCondition.resultEvaluation,
            assignDateFrom: $scope.searchCondition.assignDateFrom,
            assignDateTo: $scope.searchCondition.assignDateTo,
            endDateFrom: $scope.searchCondition.endDateFrom,
            endDateTo: $scope.searchCondition.endDateTo,
            levelJoin: $scope.searchCondition.levelJoin
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

        /* var assignDateFrom = $('#fromDate_assignDate').val();
         var assignDateTo = $('#toDate_assignDate').val();
         var endDateFrom = $('#fromDate_endDate').val();
         var endDateTo = $('#toDate_endDate').val();*/

        $http.get(preUrl + "/statistic/task/api-search-page-web", {
            params: {
                p: 1,
                taskCode: $scope.searchCondition.code,
                taskName: $scope.searchCondition.name,
                taskStatus: $scope.searchCondition.status,
                resultEvaluation: $scope.searchCondition.resultEvaluation,
                assignDateFrom: $('#fromDate_assignDate').val(),
                assignDateTo: $('#toDate_assignDate').val(),
                endDateFrom: $('#fromDate_endDate').val(),
                endDateTo: $('#toDate_endDate').val(),
                levelJoin: $scope.searchCondition.levelJoin
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

            $http.get(preUrl + "/statistic/task/api-search-page-web", {
                params: {
                    p: pageNumber,
                    taskCode: $scope.searchCondition.code,
                    taskName: $scope.searchCondition.name,
                    taskStatus: $scope.searchCondition.status,
                    resultEvaluation: $scope.searchCondition.resultEvaluation,
                    assignDateFrom: $scope.searchCondition.assignDateFrom,
                    assignDateTo: $scope.searchCondition.assignDateTo,
                    endDateFrom: $scope.searchCondition.endDateFrom,
                    endDateTo: $scope.searchCondition.endDateTo,
                    levelJoin: $scope.searchCondition.levelJoin
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
        $scope.searchCondition.name = "";
        $scope.searchCondition.code = "";
        $scope.searchCondition.status = "";
        $scope.searchCondition.resultEvaluation = "";
        $scope.searchCondition.assignDateFrom = "";
        $scope.searchCondition.assignDateTo = "";
        $scope.searchCondition.levelJoin = "";
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

    //hàm lấy thông tin loại lệnh tin theo id
    $scope.getTaskTypeById = function(id){
        for(var i = 0;i<$scope.listTaskType.length;i++){
            if($scope.listTaskType[i].id===id) return $scope.listTaskType[i];
        }
    }

    //hàm lấy thông tin loại lệnh tin theo id
    $scope.getTaskStatusByCode = function(code){
        switch (code) {
            case 1:
                return "Đã tạo";
            case 2:
                return "Đã giao";
            case 3:
                return "Đang thực hiện";
            case 4:
                return "Gần đến hạn";
            case 5:
                return "Quá hạn";
            case 6:
                return "Kết thúc";
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

