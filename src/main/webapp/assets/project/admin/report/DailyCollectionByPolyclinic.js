
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('DailyCollectionByPolyclinicController', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {

    $scope.searchCondition = {polyclinic: "", dateFrom: "", dateTo: ""};
    $scope.resultReport = [];
    $scope.polyclinics = [];


    $('.cc-mainbox').toggleClass('loaded');

    function hide_loader() {
        $(".cc-mainbox").removeClass("loaded");
        $('#loader-wrapper').remove();
        //event.preventDefault();
    }

    //api lấy danh sách loại lệnh tin
    $http.get(preUrl + "/params/getListPolyclinicsParam")
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.polyclinics = response.data;
            }

        });

    $http.get(preUrl + "/report/getDataDailyCollectionByPolyclinic", {
        params: {
            polyclinic: $scope.searchCondition.polyclinic,
            dateFrom: $scope.searchCondition.dateFrom,
            dateTo: $scope.searchCondition.dateTo
        }
    })
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.resultReport = response.data;
                hide_loader();
            }

        });

    $scope.search = function () {

        $http.get(preUrl + "/report/getDataDailyCollectionByPolyclinic", {
            params: {
                polyclinic: $scope.searchCondition.polyclinic,
                dateFrom: $('#dateFrom').val(),
                dateTo: $('#dateTo').val()
            }
        })
            .then(function (response) {
                $scope.resultReport = response.data;
            });
    };


    $scope.export = function () {
        var polyclinicName = $( "#polyclinic option:selected" ).text();
        $scope.searchCondition.dateFrom = $('#dateFrom').val();
        $scope.searchCondition.dateTo = $('#dateTo').val();
        window.location.href = preUrl + "/report/export-DailyCollectionByPolyclinic?polyclinic=" + $scope.searchCondition.polyclinic
            + "&dateFrom=" + $scope.searchCondition.dateFrom + "&dateTo=" + $scope.searchCondition.dateTo + "&polyclinicName="+polyclinicName
    };


    $scope.clearCondition = function () {
        $scope.searchCondition.polyclinic = "";
        $scope.searchCondition.dateFrom = "";
        $scope.searchCondition.dateTo = "";
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

