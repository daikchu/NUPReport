/**
 * Created by DaiCQ on 29/10/2019.
 */
app.controller('socialTopicAddCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
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
        $scope.topics = "";
        $scope.valueSearchFacebookAccount = "";
        $scope.valueSearchFanpage = "";

        $scope.topicAdd = {
            id: "",
            name: "",
            keywords: [],
            notKeywords: [],
            pages: [],
            users: [],
            type: "",
            isPublic: false,
            hasAlert: false,
            alertEmail: "",
            alertEmailCc: [],
            alertTimestamp: 0,
            alertCriteria: {minPost: 0}
        };

        $scope.addTopic = function () {
            $('#buttonSave').attr("disabled","disabled");
            var keywords = getListKeyword();
            var keywordExcept = getListKeywordExcept();
            var emailCC = getListEmailCC();
            $scope.topicAdd.keywords = keywords;
            $scope.topicAdd.notKeywords = keywordExcept;
            $scope.topicAdd.alertEmailCc = emailCC;

            if (validate($scope.topicAdd) === false) {
                $('#buttonSave').removeAttr("disabled");
                return;
            }

            //  var paramAdd = genParamDataCreate();

            $http.post(preUrl + "/social/international-topic/add", $scope.topicAdd, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data.success === true) {
                            $window.location.href = preUrl + '/social/international-topic/list?msgFlg=addTrue';
                        }
                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });
        };

        $scope.messageTopicName = "";
        $scope.messageKeywordAndFanpageAndAccount = "";

        function validate(topic) {
            $scope.messageTopicName = "";
            $scope.messageKeywordAndFanpageAndAccount = "";
            if (topic.name === "") {
                $scope.messageTopicName = "Tên chủ đề không được bỏ trống!";
                return false;
            }
            if (topic.keywords.length === 0 && topic.pages.length === 0 && topic.users.length === 0) {
                $scope.messageKeywordAndFanpageAndAccount = "Bạn chưa thêm từ khóa, trang hoặc trang cá nhân để theo dõi!";
                return false;
            }
            return true;
        }

        function getListKeyword() {
            var keywords = [];
            $("#keyword").children("ul").children("li").each(function () {
                if ($(this).text() !== '\n' && $(this).text() !== '\r') keywords.push($(this).text());
            });
            return keywords;
        }

        function getListKeywordExcept() {
            var keywordsExcept = [];
            $("#keyWordExcept").children("ul").children("li").each(function () {
                keywordsExcept.push($(this).text());
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
            var length = $scope.topicAdd.users.length;
            for (var i = 0; i < length; i++) {
                if ($scope.topicAdd.users[i].id === id) {
                    $scope.topicAdd.users.splice(i, 1);
                    length = $scope.topicAdd.users.length;
                    $("span").remove('#' + id);
                    break;
                }
            }
            //check để ẩn label danh sách tài khoản đã thêm
            if ($scope.topicAdd.users.length === 0) {
                $('#showFacebookAccountAdded').hide();
            }
        };

        $scope.removeFanpageAccount = function (id) {
            var length = $scope.topicAdd.pages.length;
            for (var i = 0; i < length; i++) {
                if ($scope.topicAdd.pages[i].id === id) {
                    $scope.topicAdd.pages.splice(i, 1);
                    length = $scope.topicAdd.pages.length;
                    $('#fanpage_' + id).remove();
                    /*                    $('div[id="fanpage_"+id+""]').remove();
                                        document.getElementById("fanpage_"+id).remove();*/
                    break;
                }
            }

            //check để ẩn label danh sách tài khoản đã thêm
            if ($scope.topicAdd.pages.length === 0) {
                $('#showFapageAdded').hide();
            }

        };

        $scope.facebookAccountSearch = function (valueSearch) {
            if (valueSearch === "") {
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
                                /*$('#add-facebook').append("<div class=\"mb-2\">\n" +
                                    "                              <span class=\"mr-3\">\n" +
                                    "                                <span style=\"cursor: pointer; color: #00aced;\" ng-click=\"removeFacebookAccount(" + listResult[0]._source.userId + ")\"><i\n" +
                                    "                                        class=\"fa fa-remove fa-lg\"></i></span>\n" +
                                    "                              </span>\n" +
                                    "                                    <span class=\"mr-3\"><img\n" +
                                    "                                            src=\"https://graph.facebook.com/" + listResult[0]._source.userId + "/picture?height=25&amp;width=25\"></span>\n" +
                                    "                                    <span class=\"mr-3\"><a class=\"a-blue\"\n" +
                                    "                                                          href=\"https://facebook.com/" + listResult[0]._source.userId + "\" target=\"_blank\">" + listResult[0]._source.name + "</a></span>\n" +
                                    "                                </div>");*/
                                $scope.topicAdd.users.push({
                                    "name": listResult[0]._source.name,
                                    "id": listResult[0]._source.userId
                                });
                                $('#alert_not_found_facebookAccount').hide();
                                $('#showFacebookAccountAdded').show()
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
            if (valueSearch === "") {
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
                                /*$('#add-fanpage').append("<div class=\"mb-2\">\n" +
                                    "                              <span class=\"mr-3\">\n" +
                                    "                                <span style=\"cursor: pointer; color: #00aced;\" ng-click=\"removeFanpageAccount(" + listResult[0]._source.pageId + ")\"><i\n" +
                                    "                                        class=\"fa fa-remove fa-lg\"></i></span>\n" +
                                    "                              </span>\n" +
                                    "                                    <span class=\"mr-3\"><img\n" +
                                    "                                            src=\"https://graph.facebook.com/" + listResult[0]._source.pageId + "/picture?height=25&amp;width=25\"></span>\n" +
                                    "                                    <span class=\"mr-3\"><a class=\"a-blue\"\n" +
                                    "                                                          href=\"https://facebook.com/" + listResult[0]._source.pageId + "\">" + listResult[0]._source.name + "</a></span>\n" +
                                    "                                </div>");*/
                                $scope.topicAdd.pages.push({
                                    "name": listResult[0]._source.name,
                                    "id": listResult[0]._source.pageId
                                });
                                $('#alert_not_found_fanpage').hide();
                                $('#showFapageAdded').show();
                            } else {
                                $('#alert_not_found_fanpage').show();
                            }

                        }

                    },
                    function (response) {
                        console.log("lỗi gọi api getAllTopic");
                    });
        };

        $scope.topicAdd.isPublic = false;
        $scope.checkSelectShareTopic = function () {
            if ($scope.topicAdd.isPublic === true) {
                $scope.topicAdd.isPublic = false;
            } else {
                $scope.topicAdd.isPublic = true;
            }
        };

        $scope.topicAdd.hasAlert = false;
        $scope.checkSelectGiveAlert = function () {
            if ($scope.topicAdd.hasAlert === true) {
                $('#select_alert').hide();
                $scope.topicAdd.hasAlert = false;
            } else {
                $('#select_alert').show();
                $scope.topicAdd.hasAlert = true;
            }
        }

        /*        $('#select_give_alert').click(function () {
                    if($scope.topicAdd.hasAlert===true){
                        $('#select_alert').hide();
                        $scope.topicAdd.hasAlert=false;
                    }
                    else{
                        $('#select_alert').show();
                        $scope.topicAdd.hasAlert=true;
                    }
        
                });*/


    }]);