/**
 * Created by DaiCQ on 29/10/2019.
 */
app.controller('socialUsersCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
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
        $scope.userCount = "";
        $scope.listUserShareCount = "";
        $scope.listUserLikeCount = "";
        $scope.listUserPostCount = "";
        $scope.listUserIdsString = "";
        $scope.topics=[];

        $scope.listUserInfor = "";
        $scope.listUserInforAndCount = [];
        $scope.arrayUserIds = [];
        $scope.numberPerPage=10;
        $scope.indexPage=1;
        $scope.dataPerPage=[];
        $scope.arrayUsers=[];


        var date = new Date();
        var week = getWeekNumber(date);
        var fullYear = date.getFullYear();
        for (var i = 0; i < 10; i++) {
            $scope.listYear.push(fullYear);
            fullYear--;
        }

        $scope.internationalTopics = "";
        $scope.paramListTypePost = createParamListTypePost();
        $scope.paramListNotFindPost = createParamNotFindPost();

        /*LAY DANH SACH TAT CA CHU DE*/
        $http.get(preUrl + "/social/international-topic/listData")
            .then(function (response) {
                if (response != null && response != 'undefined' && response.status == 200) {
                    $scope.topics = response.data.data.projects;
                    /* $scope.loadBieuDoTronLuongGiaoDich();*/
                }
            });

        //hàm tạo list object param: loại để tìm kiếm
        function createParamListTypePost(){
            var listObjectTypePost = [];
            listObjectTypePost.push({"value":"photo", "name":"Ảnh"});
            listObjectTypePost.push({"value":"link", "name":"Link"});
            listObjectTypePost.push({"value":"status", "name":"Trạng thái"});
            listObjectTypePost.push({"value":"video", "name":"Video"});
            listObjectTypePost.push({"value":"event", "name":"Sự kiện"});
            listObjectTypePost.push({"value":"note", "name":"Ghi chú"});
            listObjectTypePost.push({"value":"album", "name":"Album"});
            listObjectTypePost.push({"value":"music", "name":"Âm nhạc"});
            listObjectTypePost.push({"value":"offer", "name":"Offer"});
            return listObjectTypePost;
        }

        function genlistParamValueSelectedTypePost() {
            var selectedValues = $('#multiple-checkboxes-type-post').val();
            var listParam=[];
            if(selectedValues.length >0){
                for(var i=0;i<selectedValues.length;i++){
                    listParam.push("\"" + selectedValues[i] + "\"");
                }
            }
            return listParam;
        }

        //hàm tạo list object param: không tìm bài viết để tìm kiếm
        function createParamNotFindPost(){
            var listObjectNotFindPost = [];
            listObjectNotFindPost.push({"value":"profile picture", "name":"Hình ảnh đại diện"});
            listObjectNotFindPost.push({"value":"cover photo", "name":"Đổi ảnh bìa"});
            listObjectNotFindPost.push({"value":"shared", "name":"Chia sẻ bài viết"});
            listObjectNotFindPost.push({"value":"was live", "name":"Đã livestream"});
            listObjectNotFindPost.push({"value":"is live now", "name":"Đang livestream"});
            listObjectNotFindPost.push({"value":"ban_hang", "name":"Bán hàng"});
            return listObjectNotFindPost;
        }

        function genlistParamValueSelectedNotFindPost() {
            var selectedValues = $('#multiple-checkboxes-not-search-post').val();
            var listParam=[];
            if(selectedValues.length >0){
                for(var i=0;i<selectedValues.length;i++){
                    listParam.push(JSON.stringify("\"" + selectedValues[i] + "\""));
                }
            }
            return listParam;
        }



        /* LAY DU LIEU BAI VIET TU API MANG XA HOI*/
        $scope.keywordQueryGetCountKeyword = "";
        $scope.keywordQueryGetListPosts = "";
        $scope.projectId = "";
/*        $scope.dateFrom = getLastDayOfNowDDMMYYYY();
        $scope.dateTo = getDateNowDDMMYYYY();*/
        $scope.numberFrom = 0;//số bản ghi bắt đầu cho mỗi lần request (lấy 10 bản ghi 1) mỗi lần nhấn nút tải thêm
        $scope.dataPosts = "";
        $scope.arrayPosts = [];
        $scope.paramSearchPost = {
            size: 0,
            topicSelected: "",
            orderBy: "",
            filter_keyword: "",
            filter_lte: dateToTimestamp(moment().format('MM/DD/YYYY 23:59:59')),
            filter_gte: dateToTimestamp(moment().format('MM/DD/YYYY 00:00:00')),
            filter_docType: "[]",
            filter_not: "["+genlistParamValueSelectedNotFindPost()+"]",
            filter_type: "["+genlistParamValueSelectedTypePost()+"]",
            filter_pageIds: "",
            aggs_userPostCount: 100,
            aggs_userLikeCount: 100,
            aggs_userShareCount: 100,
            aggs_userCount: true
        };
        $scope.paramSearchUserByInfo = {
            from:0,
            size: 10,
            orderBy: "like",
            filter_keyword: "",
            filter_lte: dateToTimestamp(moment().format('MM/DD/YYYY 23:59:59')),
            filter_gte: dateToTimestamp(moment().format('MM/DD/YYYY 00:00:00')),
            filter_userIds: "",
            filter_username: "",
            filter_name: "",
            filter_link: "",
            filter_description: "",
            filter_localtion: "",
            filter_hometown: ""
        };
        var NUMBER_DATA_PAGE = 10;
        /*START XỬ LÝ DỮ LIỆU CHO TAB DANH SÁCH BÀI VIẾT*/


        //generate query for api get data, params: timeFrom, timeTo, orderByType(share, like, time)
        function genQueryGetListUserInforByListUserId() {
            var data = "{" +
                "    \"ids\": [" + $scope.arrayUserIds + "]" +
                "}";
            return data;
        }


        function getListUserId() {

            var dataQueryGetListUserId = genQueryGetListUserIdInApiSearchPosts();
            var listUserIdString = "";
            var arrayListUserId = [];

            $http.post(preUrl + "/social/posts/listData", dataQueryGetListUserId, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                    if (response.data !== "" && response.data.success !== false) {
                        console.log("response method getListUserId() = " + response.data.data.took);
                        var dataListUserIdAndCount = response.data;
                        $scope.userCount = dataListUserIdAndCount.data.aggregations.userCount.value;
                        if($scope.userCount===0){
                            $('#loading').hide();
                            $('#not_found_data_message').show();
                            return;
                        }
                        for (var i = 0; i < dataListUserIdAndCount.data.aggregations.userPostCount.buckets.length; i++) {
                            listUserIdString += " " + dataListUserIdAndCount.data.aggregations.userPostCount.buckets[i].key;
                            /*arrayListUserId.push( ""+dataListUserIdAndCount.data.aggregations.userShareCount.buckets[i].key+"'");*/
                            arrayListUserId.push("\"" + dataListUserIdAndCount.data.aggregations.userPostCount.buckets[i].key + "\"");
                            $scope.listUserIdsString = listUserIdString.substr(1);
                        }
                        $scope.arrayUserIds = arrayListUserId;

                        console.log("listUserIdsString return by method getListUserId() = " + $scope.listUserIdsString);
                        getListUserCountByListUserId();
                    }
                    else {
                        $('#not_found_data_message').show();
                        $('#loading').hide();
                    }
                });


        }

        //get list user count by list user id
        var flg_getListUserCountByListUserId = 0;

        function getListUserCountByListUserId() {
            var listUserIdString = $scope.listUserIdsString;
            var dataQueryGetListUserCountByListUserId = "{" +
                /*                "    \"size\": \"" + $scope.paramSearchPost.size + "\",\n" +*/
                /*                "  \"projectId\": \"" + $scope.projectId + "\",\n" +*/
                "  \"filter\": {\n" +
                "    \"userIds\": \"" + listUserIdString + "\",\n" +
                "    \"keyword\": \"" + $scope.paramSearchPost.filter_keyword + "\",\n" +
                "    \"lte\":" + $scope.paramSearchPost.filter_lte + ",\n" +
                "    \"gte\":" + $scope.paramSearchPost.filter_gte + ",\n" +
                "    \"docType\": " + $scope.paramSearchPost.filter_docType + ",\n" +
                "    \"not\":" + $scope.paramSearchPost.filter_not + ",\n" +
                "    \"type\":" + $scope.paramSearchPost.filter_type + "\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"userPostCount\":" + $scope.paramSearchPost.aggs_userPostCount + ",\n" +
                "    \"userLikeCount\":" + $scope.paramSearchPost.aggs_userLikeCount + ",\n" +
                "    \"userShareCount\":" + $scope.paramSearchPost.aggs_userShareCount + ",\n" +
                "    \"userCount\":" + $scope.paramSearchPost.aggs_userCount + "\n" +
                "  }\n" +
                "}";


            //       var dataQueryGetListUserCountByListUserId = genQueryGetListUserCountByListUserIdInApiSearchPosts(dateToTimestamp($scope.dateFrom), dateToTimestamp($scope.dateTo));

            $http.post(preUrl + "/social/posts/listData", dataQueryGetListUserCountByListUserId, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            console.log("response = " + response.data.data.took);
                            var dataListUserCountByListUserId = response.data;
                            $scope.listUserLikeCount = dataListUserCountByListUserId.data.aggregations.userLikeCount.buckets;
                            $scope.listUserPostCount = dataListUserCountByListUserId.data.aggregations.userPostCount.buckets;
                            $scope.listUserShareCount = dataListUserCountByListUserId.data.aggregations.userShareCount.buckets;

                            console.log("listUserIdsString 2 = " + $scope.listUserIdsString);
                            flg_getListUserCountByListUserId = 1;
                            getListUserInforByListUserId();

                        }
                    },
                    function (response) {
                        console.log("lỗi gọi api getPostsData");
                    });

        }


        //hàm xử lý lấy danh sách thông tin user bằng danh sách user id
        function getListUserInforByListUserId() {
            var dataQueryGetListUserInforByListUserId = genQueryGetListUserInforByListUserId();

            $http.post(preUrl + "/social/users/listData", dataQueryGetListUserInforByListUserId, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            console.log("data response getUsersData = " + response.data);
                            /* result = response.data.data;*/
                            var dataListUserInforByListUserId = response.data;
                            $scope.listUserInfor = dataListUserInforByListUserId.data.docs;
                        }
                        $scope.getListUserFoundByShareCountOrder();
                    },
                    function (response) {
                        console.log("có lỗi xảy ra tại hàm getUsersData");
                    }, 1000);

        }

        //generate query for api get data, params: timeFrom, timeTo, orderByType(share, like, time)
        function genQueryGetListUserIdInApiSearchPosts() {
            var data = "{" +
                "    \"size\": \"" + $scope.paramSearchPost.size + "\",\n" +
                "  \"projectId\": \"" + $scope.paramSearchPost.topicSelected + "\",\n" +
                "  \"filter\": {\n" +
                "    \"keyword\": \"" + $scope.paramSearchPost.filter_keyword + "\",\n" +
                "    \"lte\":" + $scope.paramSearchPost.filter_lte + ",\n" +
                "    \"gte\":" + $scope.paramSearchPost.filter_gte + ",\n" +
                "    \"docType\": " + $scope.paramSearchPost.filter_docType + ",\n" +
                "    \"not\":" + $scope.paramSearchPost.filter_not + ",\n" +
                "    \"type\":" + $scope.paramSearchPost.filter_type + "\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"userPostCount\":" + $scope.paramSearchPost.aggs_userPostCount + ",\n" +
                "    \"userLikeCount\":" + $scope.paramSearchPost.aggs_userLikeCount + ",\n" +
                "    \"userShareCount\":" + $scope.paramSearchPost.aggs_userShareCount + ",\n" +
                "    \"userCount\":" + $scope.paramSearchPost.aggs_userCount + "\n" +
                "  }\n" +
                "}";
            return data;
        }

        //generate query for api get data, params: timeFrom, timeTo, orderByType(share, like, time)
        function genQueryGetListUserCountByListUserIdInApiSearchPosts(timeFrom, timeTo) {
            console.log("$scope.listUserIdsString get param = " + $scope.listUserIdsString);
            var data = "{" +
                "    \"size\": \"" + $scope.paramSearchPost.size + "\",\n" +
                "  \"projectId\": \"" + $scope.paramSearchPost.topicSelected + "\",\n" +
                "  \"filter\": {\n" +
                "    \"userIds\": \"" + $scope.listUserIdsString + "\",\n" +
                "    \"keyword\": \"" + $scope.paramSearchPost.filter_keyword + "\",\n" +
                "    \"lte\":" + timeTo + ",\n" +
                "    \"gte\":" + timeFrom + ",\n" +
                "    \"docType\": " + $scope.paramSearchPost.filter_docType + ",\n" +
                "    \"not\":" + $scope.paramSearchPost.filter_not + ",\n" +
                "    \"type\":" + $scope.paramSearchPost.filter_type + "\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"userPostCount\":" + $scope.paramSearchPost.aggs_userPostCount + ",\n" +
                "    \"userLikeCount\":" + $scope.paramSearchPost.aggs_userLikeCount + ",\n" +
                "    \"userShareCount\":" + $scope.paramSearchPost.aggs_userShareCount + ",\n" +
                "    \"userCount\":" + $scope.paramSearchPost.aggs_userCount + "\n" +
                "  }\n" +
                "}";

            console.log("data genQueryGetListUserCountByListUserIdInApiSearchPosts = " + data);
            return data;
        }


        //get list user and count by share count order
        var flg_getListUserFoundByShareCountOrder = 0;

        $scope.getListUserFoundByShareCountOrder = function() {
            var listUsers = $scope.listUserInfor;
            $scope.listUserInforAndCount = [];

            for (var j = 0; j < $scope.listUserShareCount.length; j++) {
                for (var i = 0; i < listUsers.length; i++) {
                    var thisUser = {"userInfor": "", "shareCount": 0, "likeCount": 0, "postCount": 0};
                    if (listUsers[i].found === true) {

                        if ($scope.listUserShareCount[j].key === listUsers[i]._id) {
                            thisUser.shareCount = $scope.listUserShareCount[j].sum.value;
                            thisUser.userInfor = listUsers[i]._source;
                            $scope.listUserInforAndCount.push(thisUser);
                            break;
                        }

                    }

                }


            }
            $('#share').show();
            $('#like').hide();
            $('#post').hide();
            $('#loading').hide();
            $('#content_users').show();

        }

        //get list user and count by like count order
        $scope.getListUserFoundByLikeCountOrder = function () {
            var listUsers = $scope.listUserInfor;
            $scope.listUserInforAndCount = [];

            for (var j = 0; j < $scope.listUserLikeCount.length; j++) {
                for (var i = 0; i < listUsers.length; i++) {
                    var thisUser = {"userInfor": "", "shareCount": 0, "likeCount": 0, "postCount": 0};
                    if (listUsers[i].found === true) {

                        if ($scope.listUserLikeCount[j].key === listUsers[i]._id) {
                            thisUser.likeCount = $scope.listUserLikeCount[j].sum.value;
                            thisUser.userInfor = listUsers[i]._source;
                            $scope.listUserInforAndCount.push(thisUser);
                            break;
                        }


                    }

                }

            }
            $('#share').hide();
            $('#like').show();
            $('#post').hide();

        };

        //get list user and count by post count order
        $scope.getListUserFoundByPostCountOrder = function () {
            var listUsers = $scope.listUserInfor;
            $scope.listUserInforAndCount = [];
            for (var j = 0; j < $scope.listUserPostCount.length; j++) {

                var thisUser = {"userInfor": "", "shareCount": 0, "likeCount": 0, "postCount": 0};

                for (var i = 0; i < listUsers.length; i++) {
                    if (listUsers[i].found === true) {
                        if ($scope.listUserPostCount[j].key === listUsers[i]._id) {
                            thisUser.postCount = $scope.listUserPostCount[j].doc_count;
                            thisUser.userInfor = listUsers[i]._source;
                            $scope.listUserInforAndCount.push(thisUser);
                            break;
                        }

                    }

                }
            }

            $('#share').hide();
            $('#like').hide();
            $('#post').show();


            /*            for (var i = 0; i < listUsers.length; i++) {
                            var thisUser = {"userInfor": "", "shareCount": 0, "likeCount": 0, "postCount": 0};
                            if (listUsers[i].found === true) {

                                for (var j = 0; j < $scope.listUserPostCount.length; j++) {
                                    if ($scope.listUserPostCount[j].key === listUsers[i]._id) {
                                        thisUser.postCount = $scope.listUserPostCount[j].doc_count;
                                        break;
                                    }
                                }
                                thisUser.userInfor = listUsers[i]._source;
                                $scope.listUserInforAndCount.push(thisUser);
                            }

                        }*/
        };


        $scope.getDataPostsWithOrderByType = function (orderByType) {
            if (orderByType === "share") {

            } else if (orderByType === "like") {

            } else if (orderByType === "postCount") {

            }
            $scope.dataPosts = "";
            $scope.arrayPosts = [];


        };


        function addtitionTwoArray(arraySource, arrayTarget) {
            for (var i = 0; i < arraySource.length; i++) {
                arrayTarget.push(arraySource[i]);
            }
            return arrayTarget;
        }


        //lấy dữ liệu danh sách bài viết theo phân trang
        /*        $scope.getMorePostsData = function (orderByType) {
                    var numberFrom = $scope.numberFrom + NUMBER_DATA_PAGE;
                    var dataQueryGetListPosts = genQueryGetListPosts(dateToTimestamp($scope.dateFrom), dateToTimestamp($scope.dateTo), numberFrom, orderByType);
                    getPostsData(dataQueryGetListPosts);
                    $scope.numberFrom = numberFrom;
                };*/

        //param: type (value are group_post, page_post, user_post)
        $scope.getIdSocialNetworkBydocType = function (source) {
            switch (source.docType) {
                case 'group_post':
                    return source.groupId;
                case 'page_post':
                    return source.pageId;
                case 'user_post':
                    return source.sourceName;
            }
        };

        $scope.getStatusPost = function (source) {
            if (source.docType === 'group_post') {
                if (source.groupId !== undefined && source.groupId != '') {
                    return 'đã đăng trong nhóm';
                }
            } else {
                /* var sourceName = source.sourceName;
                 var story = source.story;
                 var result = story.substring(sourceName.length);*/
                if (source.ourceName !== undefined) {
                    return source.story.substring(source.sourceName.length);
                }

            }

        };

        /*END XỬ LÝ DỮ LIỆU CHO TAB DANH SÁCH BÀI VIẾT*/


        /*START XỬ LÝ DỮ LIỆU CHO TAB BIỂU ĐỒ THỐNG KÊ TỪ KHÓA*/


        function getLastDayOfNowDDMMYYYY() {
            var today = new Date();
            today.setDate(today.getDate() - 1);//trước hôm nay 1 ngày
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            return today;
        }

        function getDateNowDDMMYYYY() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            return today;
        }


        /* getJSONAsync();*/
        init();

        function init() {
            getListUserId();
        }

        //hàm xử lý tìm kiếm khi nhấn button search
        $scope.search = function(){
            if($scope.paramSearchPost.filter_keyword.trim()===""){
                $scope.paramSearchPost.filter_keyword="";
            }
            var checkConditionSearch = checkSearchCondition();
            if(checkConditionSearch === false){
                return;
            }

            $('#loading').show();
            $('#not_found_data_message').hide();
            $('#content_users').hide();
            $scope.paramSearchPost.filter_type = "["+genlistParamValueSelectedTypePost()+"]";
            $scope.paramSearchPost.filter_not = "["+genlistParamValueSelectedNotFindPost()+"]";
            getListUserId();
            $('#dataSearchByPost').show();
            $('#dataSearchByInfo').hide();
        }


        //hàm xử lý tìm kiếm khi nhấn button search tìm kiếm theo thông tin
        $scope.typeSearch = "byPost";
        $scope.totalUsersByInfo=0;
        $scope.indexUserByInfo=0;
        $scope.listUserInfor=[];

        $scope.searchByInfo=function(){
            $scope.typeSearch="byInfo";
            $scope.arrayUsers=[];

            if($scope.paramSearchUserByInfo.filter_name.trim()===""){
                $scope.paramSearchUserByInfo.filter_name="";
            }
            if($scope.paramSearchUserByInfo.filter_username.trim()===""){
                $scope.paramSearchUserByInfo.filter_username="";
            }
            if($scope.paramSearchUserByInfo.filter_description.trim()===""){
                $scope.paramSearchUserByInfo.filter_description="";
            }


            $('#content_users').hide();
            $('#not_found_data_message').hide();
            $('#loading').show();
            callApiSearchUserInfoByInfo();
        }



        function callApiSearchUserInfoByInfo(){
            var searchParam = genParamSearchByInfo();
            $http.post(preUrl + "/social/users/search", searchParam, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            console.log("data response getUsersData = " + response.data);
                            /* result = response.data.data;*/
                            var dataListUserInfor = response.data;
                            $scope.listUserInforEachSearch = dataListUserInfor.data.hits.hits;
                            $scope.totalUsersByInfo = dataListUserInfor.data.hits.total;

                            $scope.arrayUsers = addtitionTwoArray($scope.listUserInforEachSearch, $scope.arrayUsers);
                        }
                        /*$scope.getListPageFoundByShareCountOrder();*/
                        $('#content_users').show();
                        $('#not_found_data_message').hide();
                        $('#loading').hide();
                        $('#dataSearchByPost').hide();
                        $('#dataSearchByInfo').show();
                    },
                    function (response) {
                        console.log("có lỗi xảy ra tại hàm getPagesData");
                    }, 1000);
        }

        function genParamSearchByInfo() {

            var querySearchByInfo="";
            if($scope.paramSearchUserByInfo.filter_link!==""){
                querySearchByInfo = "{\n" +
                    "  \"from\": "+$scope.paramSearchUserByInfo.from+",\n" +
                    "  \"size\": "+$scope.paramSearchUserByInfo.size+",\n" +
                    "  \"orderBy\": \""+$scope.paramSearchUserByInfo.orderBy+"\",\n" +
                    "  \"filter\": {\n" +
                    "    \"link\": \""+$scope.paramSearchUserByInfo.filter_link+"\"\n" +
                    "  }\n" +
                    "}";
            }
            else{
                querySearchByInfo = "{\n" +
                    "  \"from\": "+$scope.paramSearchUserByInfo.from+",\n" +
                    "  \"size\": "+$scope.paramSearchUserByInfo.size+",\n" +
                    "  \"orderBy\": \""+$scope.paramSearchUserByInfo.orderBy+"\",\n" +
                    "  \"filter\": {\n" +
                    "    \"name\": \""+$scope.paramSearchUserByInfo.filter_name+"\",\n" +
                    "    \"location\": \""+$scope.paramSearchUserByInfo.filter_localtion+"\",\n" +
                    "    \"hometown\": \""+$scope.paramSearchUserByInfo.filter_hometown+"\"\n" +
                    "  }\n" +
                    "}";
            }

            return querySearchByInfo;
        }

        //lấy dữ liệu danh sách trang theo phân trang
        $scope.getMoreUsersDataByInfo = function () {
            $scope.indexUserByInfo+=1;
            $scope.paramSearchUserByInfo.from = ($scope.indexUserByInfo * $scope.numberPerPage) + $scope.paramSearchUserByInfo.size;
            /*$('#content_fanpage').hide();
            $('#not_found_data_message').hide();
            $('#loading').show();*/
            callApiSearchUserInfoByInfo();
        };


        $scope.searchConditionMessage = {postType:"", postFrom:""};
        function checkSearchCondition(){
            $scope.searchConditionMessage.postType="";
            $scope.searchConditionMessage.postFrom="";
            var listParamPostType = genlistParamValueSelectedTypePost();
            if(listParamPostType.length===0){
                $scope.searchConditionMessage.postType = "Chọn ít nhất một loại bài viết!";
                return false;
            }
            return true;
        }

        $scope.getTotalResult = function () {
            if($scope.userCount > 100){
                return $scope.userCount;
            }
            else return $scope.listUserInforAndCount.length;
        }

        $scope.getNumberResultShowPerPage = function () {
            if($scope.listUserInforAndCount > 100){
                return 100;
            }
            else return $scope.listUserInforAndCount.length;
        }


        /*END XỬ LÝ DỮ LIỆU CHO TAB BIỂU ĐỒ THỐNG KÊ TỪ KHÓA*/

//HÀM XỬ LÝ THƯ VIỆN NHẬP KHOẢNG THỜI GIAN
        $(function () {

            /*var start = moment().subtract(29, 'days');*/
            var start = moment();
            var end = moment();

            function cb(start, end) {
                $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
                $scope.paramSearchPost.filter_gte = dateToTimestamp(start.format('MM/DD/YYYY 00:00:00'));
                $scope.paramSearchPost.filter_lte = dateToTimestamp(end.format('MM/DD/YYYY 23:59:59'));
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

        });
    }]);