/**
 * Created by DaiCQ on 10/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('postFormListCtrl', ['$scope', '$http', '$q','$timeout','$sce', function ($scope, $http, $q,$timeout,$sce) {

    $scope.searchCondition={name:""};
    $scope.page = page;

    /*call api lấy danh sách trang đầu tiên*/
    $http.get(preUrl+"/system/post-form/search-page", {params: {p:1, name: $scope.searchCondition.name,}})
        .then(function (response) {
            if(response!=null && response!='undefined' && response.status==200){
                $scope.page=response.data;
                $scope.page.pageCount=getPageCount($scope.page);
                $scope.page.pageList=getPageList($scope.page);
            }

        });

    /*call api tìm kiếm danh sách*/
    $scope.search=function () {
        $http.get(preUrl+"/system/post-form/search-page", {params: {p:1, name: $scope.searchCondition.name}})
            .then(function (response) {
                $scope.page=response.data;
                $scope.page.pageList=getPageList($scope.page);
                $scope.page.pageCount=getPageCount($scope.page);
            });
    };

    /*call api tìm kiếm danh sách theo phân trang*/
    $scope.loadPage=function (pageNumber) {
        if(pageNumber>=1){

            $http.get(preUrl+"/system/post-form/search-page", {params: {p:pageNumber, name: $scope.searchCondition.name}})
                .then(function (response) {
                    $scope.page=response.data;
                    $scope.page.pageList=getPageList($scope.page);
                    $scope.page.pageCount=getPageCount($scope.page);
                });
        }

    };

    /*Xóa điều kiện tìm kiếm*/
    $scope.clearCondition=function () {
        $scope.searchCondition.name="";
    };

    /*Xóa bản ghi*/
    $scope.itemDeleteId=0;
    $scope.deleteItem=function (id) {
        $scope.itemDeleteId=0;
        if(id>0){
            $scope.itemDeleteId=id;
        }
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

