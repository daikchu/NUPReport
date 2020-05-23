/**
 * Created by DaiCQ on 07/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('statisticListDetectNewsController', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {

    $scope.searchCondition = {
        title: "",
        dateSentFrom: "",
        dateSentTo: "",
        detectFormId: "",
        status: ""
    };
    $scope.page = page;
    $scope.socials = [];
    $scope.detectForms = [];
    $scope.detectStatus = [];
    $scope.socialNetworkTypes = [];

    function getListDetectForm() {
        //api lấy danh sách hình thức phát hiện
        $http.get(preUrl + "/system/detected-form/list/all")
            .then(function (response) {
                if (response != null && response != 'undefined' && response.status == 200) {
                    $scope.detectForms = response.data;
                }

            });
    }


    $scope.getDetectFormById = function (detectFormId) {
        for (var i = 0; i < $scope.detectForms.length; i++) {
            if ($scope.detectForms[i].id === detectFormId) {
                return $scope.detectForms[i]
            }
        }
    };

    $scope.getDetectStatusById = function (detectStartusId) {
        for (var i = 0; i < $scope.detectStatus.length; i++) {
            if ($scope.detectStatus[i].id === detectStartusId) {
                return $scope.detectStatus[i]
            }
        }
    };

    $scope.getStatusNameByCode = function (code) {
        switch (code) {
            case "pending":
                return "Đang xử lý";
            case "reject":
                return "Từ chối";
            case "approved":
                return "Đồng ý";
        }
    };

    $scope.getNetworkTypeById = function (id) {
        for (var i = 0; i < $scope.socialNetworkTypes.length; i++) {
            if ($scope.socialNetworkTypes[i].id == id) {
                return $scope.socialNetworkTypes[i];
            }
        }
    };

    getListDetectForm();


    $('.cc-mainbox').toggleClass('loaded');


    //set default tab to TCCC
    $scope.tab_active = 1;

    function getDetectNews() {
        $http.get(preUrl + "/statistic/detected-news/api-search-page", {
            params: {
                p: 1,
                detectFormId: $scope.searchCondition.detectFormId,
                title: $scope.searchCondition.title,
                status: $scope.searchCondition.status,
                dateSentFrom: $scope.searchCondition.dateSentFrom,
                dateSentTo: $scope.searchCondition.dateSentTo
            }
        })
            .then(function (response) {
                if (response != null && response != 'undefined' && response.status == 200) {
                    $scope.page = response.data;
                    $scope.page.pageCount = getPageCount($scope.page);
                    $scope.page.pageList = getPageList($scope.page);
                    /*      $scope.pageNotaryProcs=$scope.pageNotaryProcs.items;*/
                }

            });
    }


    $scope.search = function () {
        $http.get(preUrl + "/statistic/detected-news/api-search-page", {
            params: {
                p: 1,
                detectFormId: $scope.searchCondition.detectFormId,
                title: $scope.searchCondition.title,
                status: $scope.searchCondition.status,
                dateSentFrom: $scope.searchCondition.dateSentFrom,
                dateSentTo: $scope.searchCondition.dateSentTo
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

            $http.get(preUrl + "/statistic/detected-news/api-search-page", {
                params: {
                    p: pageNumber,
                    detectFormId: $scope.searchCondition.detectFormId,
                    title: $scope.searchCondition.title,
                    status: $scope.searchCondition.status,
                    dateSentFrom: $scope.searchCondition.dateSentFrom,
                    dateSentTo: $scope.searchCondition.dateSentTo
                }
            })
                .then(function (response) {
                    $scope.page = response.data;
                    $scope.page.pageList = getPageList($scope.page);
                    $scope.page.pageCount = getPageCount($scope.page);
                });
        }

    };

    //api lấy danh sách hình thức phát hiện
    $http.get(preUrl + "/system/social-network-type/list/all")
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.socialNetworkTypes = response.data;
            }

        });


    $scope.clearCondition = function () {
        $scope.searchCondition.detectFormId = "";
        $scope.searchCondition.title = "";
        $scope.searchCondition.status = "";
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
    };

    //hàm lấy thông tin loại lệnh tin theo id
    $scope.getTaskTypeById = function (id) {
        for (var i = 0; i < $scope.listTaskType.length; i++) {
            if ($scope.listTaskType[i].id === id) return $scope.listTaskType[i];
        }
    };

    //hàm lấy thông tin loại lệnh tin theo id
    $scope.getTaskStatusByCode = function (code) {
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
    };

    $scope.export = function () {
        window.location.href = preUrl + "/statistic/detected-news/export?detectFormId=" + $scope.searchCondition.detectFormId + "&status=" + $scope.searchCondition.status
            + "&dateSentFrom=" + $scope.searchCondition.dateSentFrom + "&dateSentTo=" + $scope.searchCondition.dateSentTo + "&title=" + $scope.searchCondition.title;
    };


    //HÀM XỬ LÝ THƯ VIỆN NHẬP KHOẢNG THỜI GIAN
    $(function () {

        /*var start = moment().subtract(29, 'days');*/
        var start = moment().startOf('month');
        var end = moment().endOf('month');

        function cb(start, end) {
            $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
            $scope.searchCondition.dateSentFrom = dateToTimestamp(start.format('MM/DD/YYYY 00:00:00'));
            $scope.searchCondition.dateSentTo = dateToTimestamp(end.format('MM/DD/YYYY 23:59:59'));
            /*                $scope.countHourFromDateStartToDateEnd = countHourBetweenTwoDate(new Date($scope.searchCondition.dateFrom), new Date($scope.searchCondition.dateTo));*/
        }

        $('#reportrange').daterangepicker({
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "Áp dụng",
                "cancelLabel": "Hủy",
                "fromLabel": "timeFrom",
                "toLabel": "timeTo",
                "customRangeLabel": "Chỉnh sửa",
                "daysOfWeek": [
                    "CN",
                    "Hai",
                    "Ba",
                    "Tư",
                    "Năm",
                    "Sáu",
                    "Bảy"
                ],
                "monthNames": [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12"
                ],
                "firstDay": 1
            },


            startDate: start,
            endDate: end,
            ranges: {
                'Hôm nay': [moment(), moment()],
                'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '7 ngày trước': [moment().subtract(6, 'days'), moment()],
                '30 ngày trước': [moment().subtract(29, 'days'), moment()],
                'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);
        getDetectNews();


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

