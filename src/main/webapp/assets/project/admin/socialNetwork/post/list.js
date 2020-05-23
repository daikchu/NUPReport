/**
 * Created by DaiCQ on 29/10/2019.
 */
var app = angular.module('ospism', []);
app.controller('socialPostsCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
    , function ($scope, $http, $filter, $window, $timeout, $q) {

        $scope.internationalTopics = "";

        /*LAY DU LIEU BAI VIET TU API MANG XA HOI;*/
        $scope.keywordQueryGetCountKeyword = "";
        $scope.keywordQueryGetListPosts = "";
        $scope.dateFrom = getLastDayOfNowDDMMYYYY();
        $scope.dateTo = getDateNowDDMMYYYY();
        $scope.numberFrom = 0;//số bản ghi bắt đầu cho mỗi lần request (lấy 10 bản ghi 1) mỗi lần nhấn nút tải thêm
        $scope.dataPosts = "";
        $scope.arrayPosts = [];
        $scope.searchCondition = {
            topicSelected: "",
            keyword: "",
            dateFrom: dateToTimestamp(moment().format('MM/DD/YYYY 00:00:00')),
            dateTo: dateToTimestamp(moment().format('MM/DD/YYYY 23:59:59')),
            postType: "",
            fromPost: "",
            notShowPost: "",
            sentiments: ""
        };
        $scope.orderByType = 'share';
        $scope.topics=[];
        $scope.onloadPageSuccess = false;

        $scope.paramListTypePost = createParamListTypePost();
        $scope.paramListFromPost = createParamListFromPost();
        $scope.paramListNotFindPost = createParamNotFindPost();
        $scope.paramListSentimentsPost = createParamSentimentsPost();

        /*LAY DANH SACH TAT CA CHU DE*/
        $http.get(preUrl + "/social/international-topic/listData")
            .then(function (response) {
                if (response != null && response != 'undefined' && response.status == 200) {
                    $scope.topics = response.data.data.projects;
                    /* $scope.loadBieuDoTronLuongGiaoDich();*/
                }
            });

        //hàm tạo list object param: loại để tìm kiếm
        function createParamListTypePost() {
            var listObjectTypePost = [];
            listObjectTypePost.push({"value": "photo", "name": "Ảnh"});
            listObjectTypePost.push({"value": "link", "name": "Link"});
            listObjectTypePost.push({"value": "status", "name": "Trạng thái"});
            listObjectTypePost.push({"value": "video", "name": "Video"});
            listObjectTypePost.push({"value": "event", "name": "Sự kiện"});
            listObjectTypePost.push({"value": "note", "name": "Ghi chú"});
            listObjectTypePost.push({"value": "album", "name": "Album"});
            listObjectTypePost.push({"value": "music", "name": "Âm nhạc"});
            listObjectTypePost.push({"value": "offer", "name": "Offer"});
            return listObjectTypePost;
        }

        function genlistParamValueSelectedTypePost() {
            var listParam = [];
            if(!$scope.onloadPageSuccess){
                var listObjectParamInit = createParamListTypePost();
                for (var i = 0; i < listObjectParamInit.length; i++) {
                    listParam.push("\"" + listObjectParamInit[i].value + "\"");
                }

            }
            else{
                var selectedValues = $('#multiple-checkboxes-type-post').val();
                if (selectedValues.length > 0) {
                    for (var i = 0; i < selectedValues.length; i++) {
                        listParam.push("\"" + selectedValues[i] + "\"");
                    }
                }
            }

            return listParam;
        }

        //hàm tạo list object param: bài viết từ để tìm kiếm
        function createParamListFromPost() {
            var listObjectFromPost = [];
            listObjectFromPost.push({"value": "page_post", "name": "Trang"});
            listObjectFromPost.push({"value": "user_post", "name": "Cá nhân"});
            listObjectFromPost.push({"value": "group_post", "name": "Nhóm"});
            return listObjectFromPost;
        }

        function genlistParamValueSelectedFromPost() {
            var listParam = [];
            if(!$scope.onloadPageSuccess){
                var listObjectParamInit = createParamListFromPost();
                for (var i = 0; i < listObjectParamInit.length; i++) {
                    listParam.push("\"" + listObjectParamInit[i].value + "\"");
                }

            }
            else{
                var selectedValues = $('#multiple-checkboxes-from-post').val();
                if (selectedValues.length > 0) {
                    for (var i = 0; i < selectedValues.length; i++) {
                        listParam.push("\"" + selectedValues[i] + "\"");
                    }
                }
            }


            return listParam;
        }

        //hàm tạo list object param: không tìm bài viết để tìm kiếm
        function createParamNotFindPost() {
            var listObjectNotFindPost = [];
            listObjectNotFindPost.push({"value": "profile picture", "name": "Hình ảnh đại diện"});
            listObjectNotFindPost.push({"value": "cover photo", "name": "Đổi ảnh bìa"});
            listObjectNotFindPost.push({"value": "shared", "name": "Chia sẻ bài viết"});
            listObjectNotFindPost.push({"value": "was live", "name": "Đã livestream"});
            listObjectNotFindPost.push({"value": "is live now", "name": "Đang livestream"});
            listObjectNotFindPost.push({"value": "ban_hang", "name": "Bán hàng"});
            return listObjectNotFindPost;
        }

        function genlistParamValueSelectedNotFindPost() {
            var selectedValues = $('#multiple-checkboxes-not-search-post').val();
            var listParam = [];
            if (selectedValues.length > 0) {
                for (var i = 0; i < selectedValues.length; i++) {
                    listParam.push(JSON.stringify("\"" + selectedValues[i] + "\""));
                }
            }
            return listParam;
        }

        //hàm tạo list object param: sắc thái bài viết để tìm kiếm
        function createParamSentimentsPost() {
            var listObjectSentimentsPost = [];
            listObjectSentimentsPost.push({"value": "POS", "name": "Tích cực"});
            listObjectSentimentsPost.push({"value": "NEU", "name": "Trung tính"});
            listObjectSentimentsPost.push({"value": "NEG", "name": "Tiêu cực"});
            return listObjectSentimentsPost;
        }

        function genlistParamValueSelectedSentimentsPost() {
            var listParam = [];
            if(!$scope.onloadPageSuccess){
                var listObjectParamInit = createParamSentimentsPost();
                for (var i = 0; i < listObjectParamInit.length; i++) {
                    listParam.push("\"" + listObjectParamInit[i].value + "\"");
                }

            }
            else{
                var selectedValues = $('#multiple-checkboxes-sentiment-post').val();
                if (selectedValues.length > 0) {
                    for (var i = 0; i < selectedValues.length; i++) {
                        listParam.push("\"" + selectedValues[i] + "\"");
                    }
                }
            }

            return listParam;
        }


        var NUMBER_DATA_PAGE = 10;
        /*START XỬ LÝ DỮ LIỆU CHO TAB DANH SÁCH BÀI VIẾT*/

        $scope.getDataPostsAndCountKeyWord = function (orderByType) {
            $scope.orderByType = orderByType;
            getDataPostsWithOrderByType();
        };

        //generate query for api get data, params: timeFrom, timeTo, orderByType(share, like, time)
        function genQueryGetListPosts(fromNumber) {
            var paramTypePost = genlistParamValueSelectedTypePost();
            var paramPostSentiments = genlistParamValueSelectedSentimentsPost();
            var dataQueryGetListPosts = "{\"from\": \"" + fromNumber + "\",\n" +
                "    \"size\": 10,\n" +
                "  \"projectId\": \"" + $scope.searchCondition.topicSelected + "\",\n" +
                "    \"orderBy\": \"" + $scope.orderByType + "\",\n" +
                "  \"filter\": {\n" +
                "    \"keyword\": \"" + $scope.searchCondition.keyword + "\",\n" +
                "    \"gte\":" + $scope.searchCondition.dateFrom + ",\n" +
                "    \"lte\": " + $scope.searchCondition.dateTo + ",\n" +
                "    \"docType\": [" + genlistParamValueSelectedFromPost() + "],\n" +
                "    \"not\": [" + genlistParamValueSelectedNotFindPost() + "],\n" +
                "    \"type\": [" + (paramTypePost.length === $scope.paramListTypePost.length ? "" : paramTypePost) + "],\n" +
                "    \"sentiment\": [" + (paramPostSentiments.length === $scope.paramListSentimentsPost.length ? "" : paramPostSentiments) + "]\n" +
                "  }\n" +
                "}";
            return dataQueryGetListPosts;
        }

        getDataPostMain();

        function getDataPostMain() {
            var dataQueryGetListPosts = genQueryGetListPosts($scope.numberFrom, $scope.orderByType);
            $('#loading').show();
            $('#not_found_data_message').hide();
            $('#content_posts').hide();
            getPostsData(dataQueryGetListPosts);
        }

        //lấy dữ liệu danh sách bài viết theo phân trang
        $scope.getMorePostsData = function () {
            var numberFrom = $scope.numberFrom + NUMBER_DATA_PAGE;
            var dataQueryGetListPosts = genQueryGetListPosts(numberFrom);
            //$('.btn').button('loading');
            getPostsData(dataQueryGetListPosts);
            $scope.numberFrom = numberFrom;
        };

        //hàm xử lý tìm kiếm dữ liệu khi click nút tìm kiếm
        $scope.search = function () {
            var checkConditionSearch = checkSearchCondition();
            if(checkConditionSearch === false){
                return;
            }
            $scope.dataPosts = {};
            $scope.arrayPosts = [];
            getDataPostMain();
        };

        $scope.searchByKeyClicked = function (keyClicked) {
            /* $scope.searchCondition.keyword = JSON.stringify("\""+keyClicked+"\"");*/
            $scope.searchCondition.keyword = keyClicked;
            $scope.dataPosts = {};
            $scope.arrayPosts = [];
            getDataPostMain();
        }

        $scope.searchConditionMessage = {postType:"", postFrom:"", sentiment:""};
        function checkSearchCondition(){
            $scope.searchConditionMessage.postType="";
            $scope.searchConditionMessage.postFrom="";
            $scope.searchConditionMessage.sentiment="";
            var listParamPostType = genlistParamValueSelectedTypePost();
            var listParamPostFrom = genlistParamValueSelectedFromPost();
            var listParamSentiment = genlistParamValueSelectedSentimentsPost();
            if(listParamPostType.length===0){
                $scope.searchConditionMessage.postType = "Chọn ít nhất một loại bài viết!";
                return false;
            }
            if(listParamPostFrom.length===0){
                $scope.searchConditionMessage.postFrom = "Chọn ít nhất một nguồn bài viết!";
                return false;
            }
            if(listParamSentiment.length===0){
                $scope.searchConditionMessage.sentiment = "Chọn ít nhất một sắc thái bài viết!";
                return false;
            }
            return true;
        }

        function getDataPostsWithOrderByType() {
            $('#loading').show();
            $('#content_posts').hide();
            $scope.dataPosts = "";
            $scope.arrayPosts = [];
            var dataQueryGetListPosts = genQueryGetListPosts($scope.numberFrom);
            getPostsData(dataQueryGetListPosts);
        }

        //lấy dữ liệu số lượng từ khóa theo lượt chia sẻ, lượt thích, lượt post, dành cho biểu đồ thống kê từ khóa
        function getPostsData(dataQueryGetListPosts) {
            //$scope.arrayPosts=[];
            $http.post(preUrl + "/social/posts/listData", dataQueryGetListPosts, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        $('#loading').hide();
                        if (response.data !== "" && response.data.success !== false) {
                            $scope.dataPosts = response.data.data.hits;
                            if($scope.dataPosts.hits.length===0){
                                $('#not_found_data_message').show();
                                return;
                            }
                            $scope.arrayPosts = addtitionTwoArray($scope.dataPosts.hits, $scope.arrayPosts);
                            console.log("length of dataPosts = " + $scope.dataPosts.hits.length);
                            console.log("length of arrayPosts = " + $scope.arrayPosts.length);
                            getDataCountKeywordByOrderType();
                            $scope.onloadPageSuccess = true;

                            /* $('.btn').button('reset');*/
                        } else {
                            $('#not_found_data_message').show();
                            $('#content_posts').hide();
                        }

                    },
                    function (response) {
                        $('#content_posts').hide();
                        $scope.messageStatus = "Có lỗi xảy ra, hãy thử lại sau!";
                        $("#Message").modal('show');
                    });

        }

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
            if (source.docType == 'group_post') {
                if (source.groupId !== undefined && source.groupId !== '') {
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

        /*END XỬ LÝ DỮ LIỆU CHO TAB DANH SÁCH BÀI VIẾT*/


        /*START XỬ LÝ DỮ LIỆU CHO TAB BIỂU ĐỒ THỐNG KÊ TỪ KHÓA*/

        //generate query for api get posts data, params: timeFrom, timeTo
        function genQueryGetCountKeyword() {
            var paramTypePost = genlistParamValueSelectedTypePost();
            var paramPostSentiments = genlistParamValueSelectedSentimentsPost();
            var dataQueryGetCountKeyword = "{\"size\": 0,\n" +
                "  \"projectId\": \"" + $scope.searchCondition.topicSelected + "\",\n" +
                "    \"orderBy\": \"" + $scope.orderByType + "\",\n" +
                "  \"filter\": {\n" +
                "    \"keyword\": \"" + $scope.searchCondition.keyword + "\",\n" +
                "    \"gte\":" + $scope.searchCondition.dateFrom + ",\n" +
                "    \"lte\": " + $scope.searchCondition.dateTo + ",\n" +
                "    \"docType\": [" + genlistParamValueSelectedFromPost() + "],\n" +
                "    \"not\": [" + genlistParamValueSelectedNotFindPost() + "],\n" +
                "    \"type\": [" + (paramTypePost.length === $scope.paramListTypePost.length ? "" : paramTypePost) + "],\n" +
                "    \"sentiment\": [" + (paramPostSentiments.length === $scope.paramListSentimentsPost.length ? "" : paramPostSentiments) + "]\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"keywordPostCount\": 20,\n" +
                "    \"keywordLikeCount\": 20,\n" +
                "    \"keywordShareCount\": 20\n" +
                "  }\n" +
                "}";
            return dataQueryGetCountKeyword;
        }

        function getDataCountKeywordByOrderType() {
            var dataQueryGetCountKeyword = genQueryGetCountKeyword();
            $scope.dataGetCountKeyword = "";
            $http.post(preUrl + "/social/posts/getCountKeyword", dataQueryGetCountKeyword, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "") {
                            $scope.dataGetCountKeyword = response.data.data.aggregations;
                            $scope.processDataForKeywordStatisticChart();
                            console.log('$scope.dataKeywordShareCount = ' + $scope.dataGetCountKeyword.keywordShareCount);
                        }
                    },
                    function (response) {
                        $scope.messageStatus = "Có lỗi xảy ra, hãy thử lại sau!";
                        /!*$scope.clearDialogPackage();*!/;
                        $("#Message").modal('show');
                    });
        }




        //xử lý dữ liệu cho biểu đồ thống kê từ khóa
        $scope.processDataForKeywordStatisticChart = function () {
            var listData = [];
            var listKey = [];
            var listValue = [];
            var seriesName = '';
            if ($scope.orderByType === 'share') {//for share count
                listData = $scope.dataGetCountKeyword.keywordShareCount.buckets;
                seriesName = 'Chia sẻ';
            } else if ($scope.orderByType === 'like') {//for like count
                listData = $scope.dataGetCountKeyword.keywordLikeCount.buckets;
                seriesName = 'Lượt thích';
            } else {//for post count
                listData = $scope.dataGetCountKeyword.keywordPostCount.buckets;
                seriesName = 'Bài viết';
            }

            for (var i = 0; i < listData.length; i++) {
                listKey.push(listData[i].key);
                if ($scope.orderByType === 'share' || $scope.orderByType === 'like') listValue.push(listData[i].sum.value);
                else listValue.push(listData[i].doc_count);
            }
            canvasChartKeywordStatistic(listKey, listValue, seriesName);
        };

        //vẽ biểu đồ thống kê từ khóa
        function canvasChartKeywordStatistic(listKey, listValue, seriesName) {
            Highcharts.chart('chartKeywordStatistic', {

                title: {
                    text: 'Chart.update',
                    style: {
                        display: 'none'
                    }
                },
                chart: {
                    inverted: true
                    // polar: false
                },

                subtitle: {
                    // text: 'Inverted',
                    style: {
                        display: 'none'
                    }
                },

                xAxis: {
                    // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    categories: listKey
                },
                yAxis: {
                    title: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    type: 'column',
                    colorByPoint: true,
                    // data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    data: listValue,
                    showInLegend: false,
                    name: seriesName
                }]

            });
            $('#loading').hide();
            $('#content_posts').show();
        }

        $scope.showMore = function(id){
            $('.more_post_'+id).hide();
            $('.less_post_'+id).show();
        }

        $scope.showLess = function(id){
            $('.less_post_'+id).hide();
            $('.more_post_'+id).show();
        }

        /*END XỬ LÝ DỮ LIỆU CHO TAB BIỂU ĐỒ THỐNG KÊ TỪ KHÓA*/

//HÀM XỬ LÝ THƯ VIỆN NHẬP KHOẢNG THỜI GIAN
        $(function () {

            /*var start = moment().subtract(29, 'days');*/
            var start = moment();
            var end = moment();

            function cb(start, end) {
                $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
                $scope.searchCondition.dateFrom = dateToTimestamp(start.format('MM/DD/YYYY 00:00:00'));
                $scope.searchCondition.dateTo = dateToTimestamp(end.format('MM/DD/YYYY 23:59:59'));
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