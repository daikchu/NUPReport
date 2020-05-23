/**
 * Created by DaiCQ on 29/10/2019.
 */
app.controller('socialPagesCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
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
        $scope.pageCount = "";
        $scope.listPageShareCount = "";
        $scope.listPageLikeCount = "";
        $scope.listPagePostCount = "";
        $scope.listPageIdsString = "";

        $scope.listPageInfor = "";
        $scope.listPageInforAndCount = [];
        $scope.arrayPageIds = [];
        $scope.topics=[];
        $scope.numberPerPage=10;
        $scope.indexPage=1;
        $scope.dataPerPage=[];
        /*$scope.typeSearch=*/
        var date = new Date();
        var week = getWeekNumber(date);
        var fullYear = date.getFullYear();
        for (var i = 0; i < 10; i++) {
            $scope.listYear.push(fullYear);
            fullYear--;
        }

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
                    listParam.push(JSON.stringify("\""+ selectedValues[i]+"\""));
                }
            }
            return listParam;
        }

        //lấy dữ liệu danh sách trang theo phân trang
        $scope.getMoreFanpagesData = function () {
            $scope.indexPage+=1;
            $scope.dataPerPage = $scope.listPageInforAndCount.slice(0, (($scope.indexPage)*$scope.numberPerPage));
        };



        /* LAY DU LIEU BAI VIET TU API MANG XA HOI*/
        $scope.keywordQueryGetCountKeyword = "";
        $scope.keywordQueryGetListPosts = "";
        $scope.projectId = "";

        $scope.numberFrom = 0;//số bản ghi bắt đầu cho mỗi lần request (lấy 10 bản ghi 1) mỗi lần nhấn nút tải thêm
        $scope.dataPosts = "";
        $scope.arrayPosts = [];
        $scope.paramSearchPost = {
            from:0,
            size: 10,
            topicSelected: "",
            orderBy: "",
            filter_keyword: "",
            filter_lte: dateToTimestamp(moment().format('MM/DD/YYYY 23:59:59')),
            filter_gte: dateToTimestamp(moment().format('MM/DD/YYYY 00:00:00')),
            filter_docType: "[]",
            filter_not: "["+genlistParamValueSelectedNotFindPost()+"]",
            filter_type: "["+genlistParamValueSelectedTypePost()+"]",
            filter_pageIds: "",
            filter_username: "",
            filter_name: "",
            filter_description: "",
            aggs_pagePostCount: 100,
            aggs_pageLikeCount: 100,
            aggs_pageShareCount: 100,
            aggs_pageCount: true
        };
        $scope.paramSearchPageByInfo = {
            from:0,
            size: 10,
            orderBy: "like",
            filter_keyword: "",
            filter_lte: dateToTimestamp(moment().format('MM/DD/YYYY 23:59:59')),
            filter_gte: dateToTimestamp(moment().format('MM/DD/YYYY 00:00:00')),
            filter_pageIds: "",
            filter_username: "",
            filter_name: "",
            filter_description: "",
        };
        var NUMBER_DATA_PAGE = 10;
        /*START XỬ LÝ DỮ LIỆU CHO TAB DANH SÁCH BÀI VIẾT*/

        //generate query for api get data, params: timeFrom, timeTo, orderByType(share, like, time)
        function genQueryGetListPageInforByListPageId() {
            var data = "{" +
                "    \"ids\": [" + $scope.arrayPageIds + "]" +
                "}";
            return data;
        }


        function getListPageId() {

            var dataQueryGetListPageId = genQueryGetListPageIdInApiSearchPosts();
            var listPageIdString = "";
            var arrayListPageId = [];

            $http.post(preUrl + "/social/posts/listData", dataQueryGetListPageId, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                    if (response.data !== "" && response.data.success !== false) {

                        var dataListPageIdAndCount = response.data;
                        $scope.pageCount = dataListPageIdAndCount.data.aggregations.pageCount.value;
                        if($scope.pageCount===0){
                            $('#loading').hide();
                            $('#not_found_data_message').show();
                            return;
                        }

                        for (var i = 0; i < dataListPageIdAndCount.data.aggregations.pagePostCount.buckets.length; i++) {
                            listPageIdString += " " + dataListPageIdAndCount.data.aggregations.pagePostCount.buckets[i].key;
                            /*arrayListPageId.push( ""+dataListPageIdAndCount.data.aggregations.userShareCount.buckets[i].key+"'");*/
                            arrayListPageId.push("\"" + dataListPageIdAndCount.data.aggregations.pagePostCount.buckets[i].key + "\"");
                            $scope.listPageIdsString = listPageIdString.substr(1);
                        }
                        $scope.arrayPageIds = arrayListPageId;

                        console.log("listPageIdsString return by method getListPageId() = " + $scope.listPageIdsString);
                        getListPageCountByListPageId();
                    }
                    else {
                        $('#not_found_data_message').show();
                        $('#loading').hide();
                    }
                });


        }

        //get list user count by list user id
        var flg_getListPageCountByListPageId = 0;

        function getListPageCountByListPageId() {
            var listPageIdString = $scope.listPageIdsString;
            var dataQueryGetListPageCountByListPageId = "{" +
                /*                "    \"size\": \"" + $scope.paramSearchPost.size + "\",\n" +*/
                /*"  \"projectId\": \"" + $scope.paramSearchPost.topicSelected + "\",\n" +*/
                "  \"filter\": {\n" +
                "    \"pageIds\": \"" + listPageIdString + "\",\n" +
                "    \"keyword\": \"" + $scope.paramSearchPost.filter_keyword + "\",\n" +
                "    \"lte\":" + $scope.paramSearchPost.filter_lte + ",\n" +
                "    \"gte\":" + $scope.paramSearchPost.filter_gte + ",\n" +
                "    \"docType\": " + $scope.paramSearchPost.filter_docType + ",\n" +
                "    \"not\":" + $scope.paramSearchPost.filter_not + ",\n" +
                "    \"type\":" + $scope.paramSearchPost.filter_type + "\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"pagePostCount\":" + $scope.paramSearchPost.aggs_pagePostCount + ",\n" +
                "    \"pageLikeCount\":" + $scope.paramSearchPost.aggs_pageLikeCount + ",\n" +
                "    \"pageShareCount\":" + $scope.paramSearchPost.aggs_pageShareCount + ",\n" +
                "    \"pageCount\":" + $scope.paramSearchPost.aggs_pageCount + "\n" +
                "  }\n" +
                "}";


            //       var dataQueryGetListPageCountByListPageId = genQueryGetListPageCountByListPageIdInApiSearchPosts(dateToTimestamp($scope.dateFrom), dateToTimestamp($scope.dateTo));

            $http.post(preUrl + "/social/posts/listData", dataQueryGetListPageCountByListPageId, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            console.log("response = " + response.data.data.took);
                            var dataListPageCountByListPageId = response.data;
                            $scope.listPageLikeCount = dataListPageCountByListPageId.data.aggregations.pageLikeCount.buckets;
                            $scope.listPagePostCount = dataListPageCountByListPageId.data.aggregations.pagePostCount.buckets;
                            $scope.listPageShareCount = dataListPageCountByListPageId.data.aggregations.pageShareCount.buckets;

                            console.log("listPageIdsString 2 = " + $scope.listPageIdsString);
                            flg_getListPageCountByListPageId = 1;
                            getListPageInforByListPageId();

                        }
                    },
                    function (response) {
                        console.log("lỗi gọi api getPostsData");
                    });

        }


        //hàm xử lý lấy danh sách thông tin user bằng danh sách user id
        function getListPageInforByListPageId() {
            var dataQueryGetListPageInforByListPageId = genQueryGetListPageInforByListPageId();

            $http.post(preUrl + "/social/pages/listData", dataQueryGetListPageInforByListPageId, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            console.log("data response getPagesData = " + response.data);
                            /* result = response.data.data;*/
                            var dataListPageInforByListPageId = response.data;
                            $scope.listPageInfor = dataListPageInforByListPageId.data.docs;
                        }
                        $scope.getListPageFoundByShareCountOrder();
                    },
                    function (response) {
                        console.log("có lỗi xảy ra tại hàm getPagesData");
                    }, 1000);

        }

        //generate query for api get data, params: timeFrom, timeTo, orderByType(share, like, time)
        function genQueryGetListPageIdInApiSearchPosts() {
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
                "    \"pagePostCount\":" + $scope.paramSearchPost.aggs_pagePostCount + ",\n" +
                "    \"pageLikeCount\":" + $scope.paramSearchPost.aggs_pageLikeCount + ",\n" +
                "    \"pageShareCount\":" + $scope.paramSearchPost.aggs_pageShareCount + ",\n" +
                "    \"pageCount\":" + $scope.paramSearchPost.aggs_pageCount + "\n" +
                "  }\n" +
                "}";
            return data;
        }

        //generate query for api get data, params: timeFrom, timeTo, orderByType(share, like, time)
        function genQueryGetListPageCountByListPageIdInApiSearchPosts() {
            console.log("$scope.listPageIdsString get param = " + $scope.listPageIdsString);
            var data = "{" +
                "    \"size\": \"" + $scope.paramSearchPost.size + "\",\n" +
                "  \"projectId\": \"" + $scope.paramSearchPost.topicSelected + "\",\n" +
                "  \"filter\": {\n" +
                "    \"pageIds\": \"" + $scope.listPageIdsString + "\",\n" +
                "    \"keyword\": \"" + $scope.paramSearchPost.filter_keyword + "\",\n" +
                "    \"lte\":" + $scope.paramSearchPost.filter_lte + ",\n" +
                "    \"gte\":" + $scope.paramSearchPost.filter_gte + ",\n" +
                "    \"docType\": " + $scope.paramSearchPost.filter_docType + ",\n" +
                "    \"not\":" + $scope.paramSearchPost.filter_not + ",\n" +
                "    \"type\":" + $scope.paramSearchPost.filter_type + "\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"pagePostCount\":" + $scope.paramSearchPost.aggs_pagePostCount + ",\n" +
                "    \"pageLikeCount\":" + $scope.paramSearchPost.aggs_pageLikeCount + ",\n" +
                "    \"pageShareCount\":" + $scope.paramSearchPost.aggs_pageShareCount + ",\n" +
                "    \"pageCount\":" + $scope.paramSearchPost.aggs_pageCount + "\n" +
                "  }\n" +
                "}";

            console.log("data genQueryGetListPageCountByListPageIdInApiSearchPosts = " + data);
            return data;
        }


        //get list user and count by share count order
        var flg_getListPageFoundByShareCountOrder = 0;

        $scope.getListPageFoundByShareCountOrder = function() {
            $scope.indexPage=1;
            var listPages = $scope.listPageInfor;
            $scope.listPageInforAndCount = [];


            for (var j = 0; j < $scope.listPageShareCount.length; j++) {
                for (var i = 0; i < listPages.length; i++) {
                    var thisPage = {"pageInfor": "", "shareCount": 0, "likeCount": 0, "postCount": 0};
                    if (listPages[i].found === true) {

                        if ($scope.listPageShareCount[j].key === listPages[i]._id) {
                            thisPage.shareCount = $scope.listPageShareCount[j].sum.value;
                            thisPage.pageInfor = listPages[i]._source;
                            $scope.listPageInforAndCount.push(thisPage);
                            break;
                        }

                    }

                }


            }
            $('#share').show();
            $('#like').hide();
            $('#post').hide();
            $('#loading').hide();
            $('#content_fanpage').show();

            $scope.dataPerPage = $scope.listPageInforAndCount.splice(0, ($scope.indexPage*$scope.numberPerPage));
        }

        //get list user and count by like count order
        $scope.getListPageFoundByLikeCountOrder = function () {
            $scope.indexPage=1;

            var listPages = $scope.listPageInfor;
            $scope.listPageInforAndCount = [];

            for (var j = 0; j < $scope.listPageLikeCount.length; j++) {
                for (var i = 0; i < listPages.length; i++) {
                    var thisPage = {"pageInfor": "", "shareCount": 0, "likeCount": 0, "postCount": 0};
                    if (listPages[i].found === true) {

                        if ($scope.listPageLikeCount[j].key === listPages[i]._id) {
                            thisPage.likeCount = $scope.listPageLikeCount[j].sum.value;
                            thisPage.pageInfor = listPages[i]._source;
                            $scope.listPageInforAndCount.push(thisPage);
                            break;
                        }


                    }

                }

            }
            $('#share').hide();
            $('#like').show();
            $('#post').hide();
            $scope.dataPerPage = $scope.listPageInforAndCount.splice(0, ($scope.indexPage*$scope.numberPerPage));
        };

        //get list user and count by post count order
        $scope.getListPageFoundByPostCountOrder = function () {
            $scope.indexPage=1;

            var listPages = $scope.listPageInfor;
            $scope.listPageInforAndCount = [];
            for (var j = 0; j < $scope.listPagePostCount.length; j++) {

                var thisPage = {"pageInfor": "", "shareCount": 0, "likeCount": 0, "postCount": 0};

                for (var i = 0; i < listPages.length; i++) {
                    if (listPages[i].found === true) {
                        if ($scope.listPagePostCount[j].key === listPages[i]._id) {
                            thisPage.postCount = $scope.listPagePostCount[j].doc_count;
                            thisPage.pageInfor = listPages[i]._source;
                            $scope.listPageInforAndCount.push(thisPage);
                            break;
                        }

                    }

                }
            }

            $('#share').hide();
            $('#like').hide();
            $('#post').show();
            $scope.dataPerPage = $scope.listPageInforAndCount.splice(0, ($scope.indexPage*$scope.numberPerPage));
        };



        function addtitionTwoArray(arraySource, arrayTarget) {
            for (var i = 0; i < arraySource.length; i++) {
                arrayTarget.push(arraySource[i]);
            }
            return arrayTarget;
        }



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
                if (source.sourceName !== undefined) {
                    return source.story.substring(source.sourceName.length);
                }

            }

        };

        $scope.getTotalResult = function () {
            if($scope.listPageInforAndCount > 100){
                return $scope.pageCount;
            }
            else return $scope.listPageInforAndCount.length;
        }

        $scope.getNumberResultShowPerPage = function () {
            if($scope.listPageInforAndCount > 100){
                return 100;
            }
            else return $scope.listPageInforAndCount.length;
        }

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
            getListPageId();
        }
        //hàm xử lý tìm kiếm khi nhấn button search
        $scope.search=function(){
            if($scope.paramSearchPost.filter_keyword.trim()===""){
                $scope.paramSearchPost.filter_keyword="";
            }
            var checkConditionSearch = checkSearchCondition();
            if(checkConditionSearch === false){
                return;
            }

            $('#content_fanpage').hide();
            $('#not_found_data_message').hide();
            $('#loading').show();
            $scope.paramSearchPost.filter_type = "["+genlistParamValueSelectedTypePost()+"]";
            $scope.paramSearchPost.filter_not = "["+genlistParamValueSelectedNotFindPost()+"]";
            getListPageId();
            $('#dataSearchByPost').show();
            $('#dataSearchByInfo').hide();
        }

        //hàm xử lý tìm kiếm khi nhấn button search tìm kiếm theo thông tin
        $scope.typeSearch = "byPost";
        $scope.totalFanPagesByInfo=0;
        $scope.indexPageByInfo=0;
        $scope.listPageInfor=[];

        $scope.searchByInfo=function(){
            $scope.arrayPosts=[];
            $scope.typeSearch="byInfo";

            if($scope.paramSearchPageByInfo.filter_name.trim()===""){
                $scope.paramSearchPageByInfo.filter_name="";
            }
            if($scope.paramSearchPageByInfo.filter_username.trim()===""){
                $scope.paramSearchPageByInfo.filter_username="";
            }
            if($scope.paramSearchPageByInfo.filter_description.trim()===""){
                $scope.paramSearchPageByInfo.filter_description="";
            }


            $('#content_fanpage').hide();
            $('#not_found_data_message').hide();
            $('#loading').show();
            callApiSearchPageInfoByInfo();
        }



        function callApiSearchPageInfoByInfo(){
            var searchParam = genParamSearchByInfo();
            $http.post(preUrl + "/social/pages/search", searchParam, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            console.log("data response getPagesData = " + response.data);
                            /* result = response.data.data;*/
                            var dataListPageInforByListPageId = response.data;
                            $scope.listPageInforEachSearch = dataListPageInforByListPageId.data.hits.hits;
                            $scope.totalFanPagesByInfo = dataListPageInforByListPageId.data.hits.total;

                            $scope.arrayPosts = addtitionTwoArray($scope.listPageInforEachSearch, $scope.arrayPosts);
                        }
                        /*$scope.getListPageFoundByShareCountOrder();*/
                        $('#content_fanpage').show();
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
            /*if($scope.paramSearchPageByInfo.filter_pageIds!==""){*/
                if(!isUrlValid($scope.paramSearchPageByInfo.filter_pageIds)){
                    querySearchByInfo = "{\n" +
                        "  \"from\": "+$scope.paramSearchPageByInfo.from+",\n" +
                        "  \"size\": "+$scope.paramSearchPageByInfo.size+",\n" +
                        "  \"orderBy\": \""+$scope.paramSearchPageByInfo.orderBy+"\",\n" +
                        "  \"filter\": {\n" +
                        "    \"username\": \""+$scope.paramSearchPageByInfo.filter_pageIds+"\",\n" +
                        "    \"name\": \""+$scope.paramSearchPageByInfo.filter_name+"\",\n" +
                        "    \"description\": \""+$scope.paramSearchPageByInfo.filter_description+"\"\n" +
                        "  }\n" +
                        "}";
                }
                else {
                    querySearchByInfo = "{\n" +
                        "  \"from\": "+$scope.paramSearchPageByInfo.from+",\n" +
                        "  \"size\": "+$scope.paramSearchPageByInfo.size+",\n" +
                        "  \"orderBy\": \""+$scope.paramSearchPageByInfo.orderBy+"\",\n" +
                        "  \"filter\": {\n" +
                        "    \"link\": \""+$scope.paramSearchPageByInfo.filter_pageIds+"\",\n" +
                        "    \"name\": \""+$scope.paramSearchPageByInfo.filter_name+"\",\n" +
                        "    \"description\": \""+$scope.paramSearchPageByInfo.filter_description+"\"\n" +
                        "  }\n" +
                        "}";
                }

           /* }*/
          /*  else{
                querySearchByInfo = "{\n" +
                    "  \"from\": "+$scope.paramSearchPageByInfo.from+",\n" +
                    "  \"size\": "+$scope.paramSearchPageByInfo.size+",\n" +
                    "  \"orderBy\": \""+$scope.paramSearchPageByInfo.orderBy+"\",\n" +
                    "  \"filter\": {\n" +
                    "    \"username\": \""+$scope.paramSearchPageByInfo.filter_pageIds+"\"\n" +
                    "    \"link\": \""+$scope.paramSearchPageByInfo.filter_pageIds+"\",\n" +
                    "    \"name\": \""+$scope.paramSearchPageByInfo.filter_name+"\",\n" +
                    "    \"description\": \""+$scope.paramSearchPageByInfo.filter_description+"\"\n" +
                    "  }\n" +
                    "}";
            }*/

            return querySearchByInfo;
        }

        //lấy dữ liệu danh sách trang theo phân trang
        $scope.getMoreFanpagesDataByInfo = function () {
            $scope.indexPageByInfo+=1;
            $scope.paramSearchPageByInfo.from = ($scope.indexPageByInfo * $scope.numberPerPage) + $scope.paramSearchPageByInfo.size;
            /*$('#content_fanpage').hide();
            $('#not_found_data_message').hide();
            $('#loading').show();*/
            callApiSearchPageInfoByInfo();
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