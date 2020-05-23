/**
 * Created by DaiCQ on 29/10/2019.
 */
app.controller('socialTopicListCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
    , function ($scope, $http, $filter, $window, $timeout, $q) {
        $scope.year = "";
        $scope.month = "";
        $scope.week = "";
        $scope.showMonth = false;
        $scope.showWeek = false;
        $scope.showYear = false;
        $scope.type = "";
        $scope.listYear = [];
        $scope.nameTitle = "tuần này";


        $scope.internationalTopics = "";
        $scope.topics = [];
        $scope.topicsFull = [];
        $scope.valueSearchFacebookAccount = "";
        $scope.valueSearchFanpage = "";
        $scope.sumTopic = 0;

        $scope.topic = {
            id: "",
            name: "",
            count: {},
            minPost: 10,
            createdTime: "",
            lastUpdatedTime: "",
            keywords: [],
            notKeywords: [],
            users: [],
            page: [],
            alertEmail: "",
            alertEmailCc: [],
            alertSkip: 0,
            alertTimestamp: 1,
            hasAlert: true,
            isPublic: true,
        };
        $scope.message = "";

        getAllTopic();

        function getAllTopic() {
            $http.get(preUrl + "/social/international-topic/listData", {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            $scope.topics = response.data.data.projects;
                            $scope.topicsFull = response.data.data.projects;
                            $scope.sumTopic = $scope.topics.length;
                            processPage();
                        }
                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });
        }

        $scope.edit = function (topic) {
            $scope.topicEdit = angular.copy(topic);
            if ($scope.topicEdit.hasAlert === true) {
                $('#select_alert').show();
            } else $('#select_alert').hide();

            if($scope.topicEdit.users.length > 0){
                $('#showFacebookAccountAdded').show();
            }

            if($scope.topicEdit.pages.length > 0){
                $('#showFapageAdded').show();
            }
        };


        $scope.updateTopic = function () {
            var dataSendApi = {};
            var keywords = getListKeyword();
            var keywordExcept = getListKeywordExcept();
            var emailCC = getListEmailCC();
            $scope.topicEdit.keywords = keywords;
            $scope.topicEdit.notKeywords = keywordExcept;
            $scope.topicEdit.alertEmailCc = emailCC;
            if(validate($scope.topicEdit)===false){
                return;
            }
            dataSendApi.data = $scope.topicEdit;
            dataSendApi.id = $scope.topicEdit._id;
            $http.post(preUrl + "/social/international-topic/update", $scope.topicEdit, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data.success === true) {
                            $('#editForm').modal('toggle');
                            getAllTopic();
                            $scope.topicEdit="";
                            $window.location.href = preUrl + '/social/international-topic/list?msgFlg=editTrue';
                            //$window.location.href = preUrl + '/social/international-topic/list';
                        }
                        else{
                            $scope.message = "Chỉnh sửa chủ đề thất bại!"
                        }
                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });

        };

        $scope.cancelUpdate = function(){
            $window.location.href = preUrl + '/social/international-topic/list';
        }

        $scope.messageTopicName = "";
        $scope.messageKeywordAndFanpageAndAccount = "";
        function validate(topic){
            $scope.messageTopicName = "";
            $scope.messageKeywordAndFanpageAndAccount = "";
            if(topic.name===""){
                $scope.messageTopicName = "Tên chủ đề không được bỏ trống!";
                return false;
            }
            if(topic.keywords.length===0 && topic.pages.length===0 && topic.users.length===0){
                $scope.messageKeywordAndFanpageAndAccount = "Bạn chưa thêm từ khóa, trang hoặc trang cá nhân để theo dõi!";
                return false;
            }
            return true;
        }

        function getListKeyword() {
            var keywords = [];
            $("#keyword").children("ul").children("li").each(function () {
                var keyword = $.trim($(this).text());
                if (keyword !== '\n' && keyword !== '\r' && jQuery.inArray( keyword, keywords )) keywords.push(keyword);
            });
            return keywords;
        }


        function getListKeywordExcept() {
            var keywordsExcept = [];
            $("#keyWordExcept").children("ul").children("li").each(function () {
                var keyword = $.trim($(this).text());
                if (keyword !== '\n' && keyword !== '\r' && jQuery.inArray( keyword, keywordsExcept )) keywordsExcept.push(keyword);
               // keywordsExcept.push($(this).text());
            });
            return keywordsExcept;
        }

        function getListEmailCC() {
            var emailCC = [];
            $("#alert_email").children("ul").children("li").each(function () {
                emailCC.push($(this).text());
            });
            return emailCC;
        }

        $scope.removeFacebookAccount = function (id) {
            var length = $scope.topicEdit.users.length;
            for (var i = 0; i < length; i++) {
                if ($scope.topicEdit.users[i].id === id) {
                    $scope.topicEdit.users.splice(i,1);
                    length = $scope.topicEdit.users.length;
                    $("span").remove('#' + id);
                    break;
                }
            }
            //check để ẩn label danh sách tài khoản đã thêm
            if($scope.topicEdit.users.length===0){
                $('#showFacebookAccountAdded').hide();
            }
        };

        $scope.removeFanpageAccount = function (id) {
            var length = $scope.topicEdit.pages.length;
            for (var i = 0; i < length; i++) {
                if ($scope.topicEdit.pages[i].id === id) {
                    $scope.topicEdit.pages.splice(i,1);
                    $('#fanpage_' + id).remove();
                    /*                    $('div[id="fanpage_"+id+""]').remove();
                                        document.getElementById("fanpage_"+id).remove();*/
                    break;
                }
            }
            //check để ẩn label danh sách tài khoản đã thêm
            if($scope.topicEdit.pages.length===0){
                $('#showFapageAdded').hide();
            }

        };


        $scope.messageSearchFacebookAccount="";
        $scope.facebookAccountSearch = function (valueSearch) {
            valueSearch = $.trim(valueSearch);
            if(valueSearch===""){
                $scope.messageSearchFacebookAccount="Vui lòng nhập đường dẫn!";
                return;
            }
            var param = "{\n" +
                "  \"from\": 0,\n" +
                "  \"size\": 10,\n" +
                "  \"filter\": {\n" +
                "    \"link\": \"" + valueSearch + "\"\n" +
                "  }\n" +
                "}";

            $http.post(preUrl + "/social/users/search", param, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            var listResult = response.data.data.hits.hits;
                            if (listResult.length > 0) {
                                $scope.valueSearchFacebookAccount = "";
                                /*                                $('#add-facebook').append( "<div class=\"mb-2\">\n" +
                                                                    "                              <span class=\"mr-3\">\n" +
                                                                    "                                <span style=\"cursor: pointer; color: #00aced;\" ng-click=\"removeFacebookAccount()\"><i\n" +
                                                                    "                                        class=\"fa fa-remove fa-lg\"></i></span>\n" +
                                                                    "                              </span>\n" +
                                                                    "                                    <span class=\"mr-3\"><img\n" +
                                                                    "                                            src=\"https://graph.facebook.com/"+listResult[0]._source.userId+"/picture?height=25&amp;width=25\"></span>\n" +
                                                                    "                                    <span class=\"mr-3\"><a class=\"a-blue\"\n" +
                                                                    "                                                          href=\"https://facebook.com/"+listResult[0]._source.userId+"\" target=\"_blank\">"+listResult[0]._source.name+"</a></span>\n" +
                                                                    "                                </div>" );*/

                                /*var checkExist = checkExistElementInArrayObject(listResult[0]._source.userId, $scope.topicEdit.users, "id");
                                if(!checkExist){*/
                                    $scope.topicEdit.users.push({
                                        "name": listResult[0]._source.name,
                                        "id": listResult[0]._source.userId
                                    });
                                    $('#alert_not_found_facebookAccount').hide();
                              /*  }*/

                            } else {
                                $('#alert_not_found_facebookAccount').show();
                            }

                        }

                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });
        };

        $scope.fanpageSearch = function (valueSearch) {
            if(valueSearch===""){
                return;
            }
            var param = "{\n" +
                "  \"from\": 0,\n" +
                "  \"size\": 10,\n" +
                "  \"filter\": {\n" +
                "    \"username\": \"" + valueSearch + "\"\n" +
                "  }\n" +
                "}";

            $http.post(preUrl + "/social/pages/search", param, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            var listResult = response.data.data.hits.hits;
                            if (listResult.length > 0) {
                                $scope.valueSearchFanpage = "";
                                /*                                $('#add-fanpage').append("<div class=\"mb-2\">\n" +
                                                                    "                              <span class=\"mr-3\">\n" +
                                                                    "                                <span style=\"cursor: pointer; color: #00aced;\" ng-click=\"removeFanpageAccount()\"><i\n" +
                                                                    "                                        class=\"fa fa-remove fa-lg\"></i></span>\n" +
                                                                    "                              </span>\n" +
                                                                    "                                    <span class=\"mr-3\"><img\n" +
                                                                    "                                            src=\"https://graph.facebook.com/"+listResult[0]._source.pageId+"/picture?height=25&amp;width=25\"></span>\n" +
                                                                    "                                    <span class=\"mr-3\"><a class=\"a-blue\"\n" +
                                                                    "                                                          href=\"https://facebook.com/"+listResult[0]._source.pageId+"\">"+listResult[0]._source.name+"</a></span>\n" +
                                                                    "                                </div>");*/
                                $scope.topicEdit.pages.push({
                                    "name": listResult[0]._source.name,
                                    "id": listResult[0]._source.pageId
                                });
                                $('#alert_not_found_fanpage').hide();
                            } else {
                                $('#alert_not_found_fanpage').show();
                            }

                        }

                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });
        };

        $scope.checkSelectGiveAlert = function () {
            if ($scope.topicEdit.hasAlert === true) {
                $('#select_alert').hide();
                $scope.topicEdit.hasAlert = false;
            } else {
                $('#select_alert').show();
                $scope.topicEdit.hasAlert = true;
            }
        };

        $scope.deleteItem = "";
        $scope.deleteItem = function (id) {
            $scope.deleteItem = id;
        };

        $scope.deleteTopic = function () {
            $http.post(preUrl + "/social/international-topic/delete", $scope.deleteItem, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data.success === true) {
                            $('#deleteItem').modal('hide');
                            $scope.message = "Xóa chủ đề thành công!";
                            getAllTopic();
                            $window.location.href = preUrl + '/social/international-topic/list?msgFlg=deleteTrue';
                        }
                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });
        }

        $scope.searchCondition = {keyword:""};

        $scope.search = function(){
            var arrResultSearch = [];
            for(var i=0;i<$scope.topicsFull.length;i++){
                if($scope.topicsFull[i].name.toLowerCase().includes($scope.searchCondition.keyword.toLowerCase())){
                    arrResultSearch.push($scope.topicsFull[i]);
                }
            }
            $scope.topics = arrResultSearch;
            processPage();

        }




        $scope.indexPage = 1;
        $scope.numberPerPage = 25;
        $scope.countIndexPerPage = 0;
        $scope.pageCount = 0;
        $scope.pageList = []

        function processPage(){
            $scope.countIndexPerPage = countIndexWithPage();
            $scope.pageCount = getPageCount();
            $scope.pageList = getPageList();
        }

        $scope.loadPage = function (pageNumber) {
            if (pageNumber >= 1) {
                $scope.indexPage = pageNumber;
            }

        };


        function countIndexWithPage(){
            return ($scope.numberPerPage * ($scope.indexPage-1))+1;
                //$scope.countIndexPerPage = (numPerPage * ($scope.indexPage-1))+1;
        }


        function getPageCount() {
            var pageCount=Math.ceil($scope.topics.length/$scope.numberPerPage);
            return pageCount;
        }

        /*TRợ giúp tính toán số trang hiển thị khi hiện page*/
        function getPageList() {
            var pages=[];
            var from = $scope.indexPage  - 3;
            var to = $scope.indexPage + 5;
            if (from < 0) {
                to -= from;
                from = 1;
            }

            if (from < 1) {
                from = 1;
            }

            if (to > $scope.pageCount) {
                to = $scope.pageCount;
            }

            for (var i=from; i<=to; i++ ) {
                pages.push(i);
            }
            return pages;
        }


    }]);