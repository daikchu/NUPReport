/**
 * Created by DaiCQ on 11/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('collaboratorsManageByIdDetailCtrl', ['$scope', '$http', '$q','$timeout','$sce','$window', function ($scope, $http, $q,$timeout,$sce, $window) {


    $scope.page = page;
    $scope.ranks= "";
    $scope.unitId = "";
    $scope.subUnitId = "";
    $scope.units = [];
    $scope.subUnits = [];
    $scope.detectNews = [];
    $scope.colId = colId;

    $scope.searchCondition = {title:"", timeFrom: "", timeTo: "", detectFormId: "", status:""};
    $scope.pageDetectNews = page;
    $scope.pageTasks = page;
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

            }) ;
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
            case "send":
                return "Đã gửi";
            case "pending":
                return "Đang xử lý";
            case "reject":
                return "Từ chối";
            case "approved":
                return "Đồng ý";
            case "toTask":
                return "Thành lệnh tin";
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

    $http.get(preUrl + "/statistic/detected-news/api-search-page-of-col", {
        params: {
            p: 1,
            orderType:"desc",
            fieldOrder:"dateSend",
            userProcess: $scope.colId,
            timeFrom: $scope.searchCondition.timeFrom,
            timeTo: $scope.searchCondition.timeTo,
            detectFormId: $scope.searchCondition.detectFormId
        }
    })
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.pageDetectNews = response.data;
                $scope.pageDetectNews.pageCount = getPageCount($scope.pageDetectNews);
                $scope.pageDetectNews.pageList = getPageList($scope.pageDetectNews);
                /*      $scope.pageNotaryProcs=$scope.pageNotaryProcs.items;*/
            }

        });

    $scope.loadPageDetectNews = function (pageNumber) {
        if (pageNumber >= 1) {

            $http.get(preUrl + "/statistic/detected-news/api-search-page-of-col", {
                params: {
                    p: pageNumber,
                    userProcess: $scope.colId
                }
            })
                .then(function (response) {
                    $scope.pageDetectNews = response.data;
                    $scope.pageDetectNews.pageList = getPageList($scope.pageDetectNews);
                    $scope.pageDetectNews.pageCount = getPageCount($scope.pageDetectNews);
                });
        }

    };


    $http.get(preUrl + "/statistic/task/api-search-page-of-col", {
        params: {
            p: 1,
            userProcess: $scope.colId
        }
    })
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.pageTasks = response.data;
                $scope.pageTasks.pageCount = getPageCount($scope.pageTasks);
                $scope.pageTasks.pageList = getPageList($scope.pageTasks);
                /*      $scope.pageNotaryProcs=$scope.pageNotaryProcs.items;*/
            }

        });

    $scope.loadPageTasks = function (pageNumber) {
        if (pageNumber >= 1) {

            $http.get(preUrl + "/statistic/task/api-search-page-of-col", {
                params: {
                    p: pageNumber,
                    userProcess: $scope.colId
                }
            })
                .then(function (response) {
                    $scope.pageTasks = response.data;
                    $scope.pageTasks.pageList = getPageList($scope.pageTasks);
                    $scope.pageTasks.pageCount = getPageCount($scope.pageTasks);
                });
        }

    };

    $('.nav-tabs a[href="#info_tasks"]').tab('show');

    //api lấy danh sách hình thức phát hiện
    $http.get(preUrl + "/system/social-network-type/list/all")
        .then(function (response) {
            if (response != null && response != 'undefined' && response.status == 200) {
                $scope.socialNetworkTypes = response.data;
            }

        });


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
                return "Hết hạn";
            case 6:
                return "Kết thúc";
        }
    };

    function dateToTimestamp(date) {
        /*date=date.split("-");
        var newDate=date[1]+"/"+date[0]+"/"+date[2];
        var result = new Date(date).getTime();*/
        date = date.split("/");
        var newDate = date[1] + "/" + date[0] + "/" + date[2];
        /*var result = new Date(newDate).getTime();*/
        /*var test = Date.parse('02/13/2009 23:31:30')/1000;*/
        var result = new Date(date).getTime();
        console.log('time lte from date: ' + date + ' = ' + result);
        /*alert(new Date(date).getTime());*/
        return result;
    }

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

