/**
 * Created by DaiCQ on 07/10/2019.
 */
var app = angular.module('ospism', ["ngSanitize"]);
app.controller('unitEditCtrl', ['$scope', '$http', '$q', '$timeout', '$sce', function ($scope, $http, $q, $timeout, $sce) {
    $scope.unitId = unitId;
    $scope.searchCondition = {parentId: $scope.unitId, name: "", address:""};
    $scope.page = page;
    $scope.pageCol = page;
    $scope.units = [];
    $scope.subUnits = [];
    $scope.listChucVu = "";

    //set default tab to TCCC
    $scope.tab_active = 1;

    /*    init();
        function init(){
            $scope.search();
        }*/

    getSubUnitByParent();


    $scope.clearCondition = function () {
        $scope.searchCondition.name = "";
        $scope.searchCondition.address = "";
    };

    function getSubUnitByParent() {

        $http.get(preUrl + "/system/unit/api-search-page", {
            params: {
                parentId: $scope.searchCondition.parentId,
                name: $scope.searchCondition.name,
                address: $scope.searchCondition.address
            }
        })
            .then(function (response) {
                $scope.page = response.data;
                $scope.page.pageList = getPageList($scope.page);
                $scope.page.pageCount = getPageCount($scope.page);
            });
    }

    $scope.searchSubUnitOfParent = function () {
        $http.get(preUrl + "/system/unit/api-search-page", {
            params: {
                parentId: $scope.searchCondition.parentId,
                name: $scope.searchCondition.name,
                address: $scope.searchCondition.address
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

            $http.get(preUrl + "/system/unit/api-search-page", {
                params: {
                    p: pageNumber,
                    parentId: $scope.searchCondition.parentId,
                    name: $scope.searchCondition.name,
                    address: $scope.searchCondition.address
                }
            })
                .then(function (response) {
                    $scope.page = response.data;
                    $scope.page.pageList = getPageList($scope.page);
                    $scope.page.pageCount = getPageCount($scope.page);
                });
        }

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

    $scope.subUnitEdit = {};
    $scope.messageEditSubUnit = "";
    $scope.messageSubUnit="";
    $scope.editSubUnit = function (subUnit) {
        $scope.subUnitEdit = angular.copy(subUnit);
    };

    $scope.actionEditSubUnit = function (subUnit) {
        $http.post(preUrl + "/system/unit/edit-sub-unit", subUnit, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
            .then(function (response) {
                    if (response.data === true) {
                        $('#editSubUnit').modal('hide');
                        /*$window.location.href = preUrl + '/social/international-topic/list';*/
                    } else {
                        $scope.messageEditSubUnit = "Sửa thất bại";
                    }
                },
                function (response) {
                    console.log("lỗi gọi api getAllTopic");
                });
    };

    $scope.subUnitAdd = {name: "", address: "", phone: "", parentId: unitId};
    /*$scope.messageEditSubUnit = "";*/
    $scope.actionAddSubUnit = function () {
        if (validateSubUnit($scope.subUnitAdd) === false) {
            return;
        }
        $http.post(preUrl + "/system/unit/add-sub-unit", $scope.subUnitAdd, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
            .then(function (response) {
                    if (response.data === true) {
                        $('#addSubUnit').modal('hide');
                        /*$window.location.href = preUrl + '/social/international-topic/list';*/
                        $scope.searchSubUnitOfParent();
                    } else {
                        $scope.messageAddSubUnit = "Thêm mới thất bại";
                    }
                },
                function (response) {
                    console.log("lỗi gọi api getAllTopic");
                });
    };

    $scope.subUnitIdDelete = "";
    $scope.deleteSubUnit = function (id) {
        $scope.subUnitIdDelete = id;
    }

    $scope.actionDeleteSubUnit = function (id) {
        $http.post(preUrl + "/system/unit/delete-sub-unit", id, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
            .then(function (response) {
                    if (response.data === true) {
                        $('#deleteSubUnit').modal('hide');
                        /*$window.location.href = preUrl + '/social/international-topic/list';*/
                        $scope.messageSubUnit="Xóa thành công!";
                        $scope.searchSubUnitOfParent();
                    }
                    else{
                        $('#deleteSubUnit').modal('hide');
                        $scope.messageSubUnit="Xóa thất bại! Các nhóm mặc định không được phép xóa: Nhóm quản lý cộng tác viên đăng ký mới.";
                    }
                },
                function (response) {
                    console.log("lỗi gọi api getAllTopic");
                });
    }

    function validateSubUnit(subUnit) {
        $scope.messageAddSubUnit_Name = "";
        if (subUnit.name === "") {
            $scope.messageAddSubUnit_Name = "Tên nhóm không được để trống";
            return false;
        }
        return true;
    }


    /* HÀM XỬ LÝ DỮ LIỆU CỘNG TÁC VIÊN THUỘC NHÓM*/
    $scope.searchColOfSubUnitCondition = {subUnitId: "", fullName:"", phone:"", rank:""};
    $scope.colOfSubUnit = {fullName: "", description: "", address: "", phone: "", email: "",
        passport:"", workAddress:"", socialAccount:"", rank:{id:"", name:""}, userCreated:"", userCreated:"",
        userUpdated:"", dateCreated:"", dateUpdated:"", deleted: 0, unitId: $scope.unitId, subUnitId: $scope.searchColOfSubUnitCondition.subUnitId};
    $scope.ranks = [];
    $scope.users = [];
    $scope.subUnitId = "";
    $scope.subUnit = "";


    $scope.listColOfSubUnit = function (subUnit) {
        $scope.subUnit = subUnit;
        $http.get(preUrl + "/collaborators/account/search-page", {
            params: {
                subUnitId: $scope.subUnit.id
            }
        })
            .then(function (response) {
                $scope.pageCol = response.data;
                $scope.pageCol.pageList = getPageList($scope.pageCol);
                $scope.pageCol.pageCount = getPageCount($scope.pageCol);
            });
    };

    $scope.loadPageColOfSubUnit = function (pageNumber) {
        if (pageNumber >= 1) {
            $http.get(preUrl + "/collaborators/account/search-page", {
                params: {
                    p: pageNumber,
                    subUnitId: $scope.subUnit.id,
                    fullName: $scope.searchColOfSubUnitCondition.fullName,
                    phone: $scope.searchColOfSubUnitCondition.phone,
                    rank: $scope.searchColOfSubUnitCondition.rank
                }
            })
                .then(function (response) {
                    $scope.pageCol = response.data;
                    $scope.pageCol.pageList = getPageList($scope.pageCol);
                    $scope.pageCol.pageCount = getPageCount($scope.pageCol);
                });
        }

    };

    $scope.searchColOfSubUnit = function () {
            $http.get(preUrl + "/collaborators/account/search-page", {
                params: {
                    p: 1,
                    subUnitId: $scope.subUnit.id,
                    fullName: $scope.searchColOfSubUnitCondition.fullName,
                    phone: $scope.searchColOfSubUnitCondition.phone,
                    rank: $scope.searchColOfSubUnitCondition.rank
                }
            })
                .then(function (response) {
                    $scope.pageCol = response.data;
                    $scope.pageCol.pageList = getPageList($scope.pageCol);
                    $scope.pageCol.pageCount = getPageCount($scope.pageCol);
                });

    };

    $scope.clearSearchColOfSubUnitCondition = function(){
        $scope.searchColOfSubUnitCondition.fullName ="";
        $scope.searchColOfSubUnitCondition.phone="";
        $scope.searchColOfSubUnitCondition.rank = "";
    }

    $scope.showFormAddCol = function(){
        /*$scope.colOfSubUnit.fullName= "";
        description: "", address: "", phone: "", email: "",
            passport:"", workAddress:"", socialAccount:"", rank:"", userCreated:"", userCreated:"",
            userUpdated:"", dateCreated:"", dateUpdated:"", deleted: 0, unitId:""};*/
    }

    $scope.actionAddColOfSubUnit = function () {
        if(validateCol($scope.colOfSubUnit)===false){
            return;
        }
        else{
            $scope.colOfSubUnit.unitId = $scope.subUnit.id;
            $http.post(preUrl + "/collaborators/account/api-add", $scope.colOfSubUnit, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data === true) {
                            $('#addColOfSubUnit').modal('hide');
                            /*$window.location.href = preUrl + '/social/international-topic/list';*/
                            $scope.listColOfSubUnit($scope.subUnit);
                        } else {
                            $scope.messageAddColOfSubUnit = "Thêm mới thất bại";
                        }
                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });
        }
    }

    $scope.colOfSubUnitEdit = {};
    $scope.showFormEditCol = function(col){
        $scope.colOfSubUnitEdit = col;
    }

    $scope.actionEditColOfSubUnit = function () {
        if(validateCol($scope.colOfSubUnitEdit)===false){
            return;
        }
        else{
            $scope.colOfSubUnitEdit.unitId = $scope.subUnit.id;
            $http.post(preUrl + "/collaborators/account/api-edit", $scope.colOfSubUnitEdit, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data === true) {
                            $('#editColOfSubUnit').modal('hide');
                            /*$window.location.href = preUrl + '/social/international-topic/list';*/
                            $scope.listColOfSubUnit($scope.subUnit);
                        } else {
                            $scope.messageEditColOfSubUnit = "Chỉnh sửa";
                        }
                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });
        }
    }

    $scope.colIdOfSubUnitDelete = "";
    $scope.deleteColOfSubUnit = function(id){
        $scope.colIdOfSubUnitDelete = id;
    }

    $scope.actionDeleteColOfSubUnit = function(colId){
        $http.post(preUrl + "/collaborators/account/api-delete", colId, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
            .then(function (response) {
                    if (response.data === true) {
                        $('#deleteColOfSubUnit').modal('hide');
                        /*$window.location.href = preUrl + '/social/international-topic/list';*/
                        $scope.listColOfSubUnit($scope.subUnit);
                    }
                },
                function (response) {
                    console.log("lỗi gọi api getAllTopic");
                });
    }

    $scope.colOfSubUnitMessage = {fullName:"", rank:""};
    function validateCol(item){
        $scope.colOfSubUnitMessage.fullName="";
        $scope.colOfSubUnitMessage.rank="";
        if(item.fullName===""){
            $scope.colOfSubUnitMessage.fullName="Tên cộng tác viên không được để trống!";
            return false;
        }
        if(item.rank.id===""){
            $scope.colOfSubUnitMessage.rank="Cấp bậc không được để trống!";
            return false;
        }
        return true;

    }

    //lấy danh sách
    $http.get(preUrl + "/rank-collaborators/list/all")
        .then(function (response) {
            $scope.ranks = response.data;
        });

    $http.get(preUrl + "/system/user/list-not-collaborator")
        .then(function (response) {
            $scope.users = response.data;
        });


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

        $http.get(preUrl+"/collaborators/account/changeRank", {params: {col_id:col.id, rank_id:rank.id}})
            .then(function (response) {
                if (response.data === true) {
                    $('#changeRank').modal('hide');
                    /*$window.location.href = preUrl + '/social/international-topic/list';*/
                    $scope.listColOfSubUnit($scope.searchColOfSubUnitCondition.subUnitId);
                }

            });
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

