/**
 * Created by DaiCQ on 29/10/2019.
 */
app.controller('socialUsersDetailCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
    , function ($scope, $http, $filter, $window, $timeout, $q) {
        $scope.userId = userId;
        $scope.userInfo = "";
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
        $scope.topics = [];

        /* LAY DU LIEU BAI VIET TU API MANG XA HOI*/
        $scope.keywordQueryGetCountKeyword = "";
        $scope.keywordQueryGetListPosts = "";
        $scope.projectId = "";
        $scope.numberFrom = 0;//số bản ghi bắt đầu cho mỗi lần request (lấy 10 bản ghi 1) mỗi lần nhấn nút tải thêm
        $scope.dataPosts = "";
        $scope.arrayPosts = [];
        $scope.paramSearchPost = {
            from: 0,
            size: 0,
            topicSelected: "",
            orderBy: "time",
            filter_keyword: keywordUrl,
            /*filter_lte: dateToTimestamp(moment().format('MM/DD/YYYY 23:59:59')),
            filter_gte: dateToTimestamp(moment().format('MM/DD/YYYY 00:00:00')),*/
            filter_lte: lteUrl,
            filter_gte: gteUrl,
            filter_docType: "[]",
            filter_pageIds: "",
            aggs_userPostCount: 100,
            aggs_userLikeCount: 100,
            aggs_userShareCount: 100,
            aggs_userCount: true
        };

        $scope.listUserInfor = "";
        $scope.dataStatistic = "";
        $scope.listUserInforAndCount = [];
        $scope.arrayUserIds = [];
        $scope.neg_count = 0;
        $scope.pos_count = 0;
        $scope.neu_count = 0;

        $scope.internationalTopics = "";


        var paramGetUserInfoByUserId = "{\n" +
            "  \"ids\": [\n" +
            "    \"" + $scope.userId + "\"\n" +
            "  ]\n" +
            "}";

        $http.post(preUrl + "/social/users/getUserInfo", paramGetUserInfoByUserId, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
            .then(function (response) {
                if (response.data !== "") {
                    $scope.userInfo = response.data.data.docs[0];

                }
            });


        getPostsData();

        function getPostsData() {
            var queryGetListPosts = genQueryGetListPosts($scope.numberFrom);
            //$scope.arrayPosts=[];
            $http.post(preUrl + "/social/posts/listData", queryGetListPosts, {headers: {'Content-type': 'application/json; charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "" && response.data.success !== false) {
                            $scope.dataPosts = response.data.data.hits;
                            $scope.dataStatistic = response.data.data.aggregations;
                            $scope.neg_count = getDataNumberFromListBuckets($scope.dataStatistic.sentimentsCount.buckets, "NEG");
                            $scope.pos_count = getDataNumberFromListBuckets($scope.dataStatistic.sentimentsCount.buckets, "POS");
                            $scope.neu_count = getDataNumberFromListBuckets($scope.dataStatistic.sentimentsCount.buckets, "NEU");

                            chartKeyword($scope.dataStatistic.keywordPostCount.buckets);
                            $('#loading').hide();
                            if ($scope.dataPosts.hits.length === 0) {
                                $('#not_found_data_message').show();
                                return;
                            }
                            $('#content_fanpage').show();
                            $scope.arrayPosts = addtitionTwoArray($scope.dataPosts.hits, $scope.arrayPosts);
                            console.log("length of dataPosts = " + $scope.dataPosts.hits.length);
                            console.log("length of arrayPosts = " + $scope.arrayPosts.length);

                            /* $('.btn').button('reset');*/
                        } else {
                            $('#content_posts').hide();
                            $('#not_found_data_message').show();
                            $('#loading').hide();
                        }

                    },
                    function (response) {
                        alert('fakse');
                        $('#content_posts').hide();
                        $scope.messageStatus = "Có lỗi xảy ra, hãy thử lại sau!";
                        /!*$scope.clearDialogPackage();*!/;
                        $("#Message").modal('show');
                    });

        }

        $scope.search = function () {
            $('#content_fanpage').hide();
            $('#not_found_data_message').hide();
            $('#loading').show();
            $scope.dataPosts = {};
            $scope.arrayPosts = [];
            getPostsData();
        };

        // Lấy dữ liệu từ list buckets bằng tham số key
        function getDataNumberFromListBuckets(buckets, key) {
            var i = 0;
            for (i; i < buckets.length; i++) {
                if (buckets[i].key === key) {
                    return buckets[i].doc_count;
                }
            }
            return 0;
        }


        var NUMBER_DATA_PAGE = 10;
        /*START XỬ LÝ DỮ LIỆU CHO TAB DANH SÁCH BÀI VIẾT*/


        //generate query for api get data, params: timeFrom, timeTo, orderByType(share, like, time)
        function genQueryGetListPosts(fromNumber) {
            var dataQueryGetListPosts = "{\"from\": \"" + fromNumber + "\",\n" +
                "    \"size\": 10,\n" +
                /*"  \"projectId\": \"" + $scope.searchCondition.topicSelected + "\",\n" +*/
                "    \"orderBy\": \"" + $scope.paramSearchPost.orderBy + "\",\n" +
                "  \"filter\": {\n" +
                "    \"keyword\": \"" + $scope.paramSearchPost.filter_keyword + "\",\n" +
                "    \"userIds\": \"" + $scope.userId + "\",\n" +
                "    \"gte\":" + $scope.paramSearchPost.filter_gte + ",\n" +
                "    \"lte\": " + $scope.paramSearchPost.filter_lte + "\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"mobileCount\": true,\n" +
                "    \"sellCount\": true,\n" +
                "    \"sentimentsCount\": true,\n" +
                "    \"likeCount\": true,\n" +
                "    \"shareCount\": true,\n" +
                "    \"keywordPostCount\": 50,\n" +
                "    \"keywordLikeCount\": 50,\n" +
                "    \"keywordShareCount\": 50,\n" +
                "    \"typesCount\": true\n" +
                "  }\n" +
                "}";
            return dataQueryGetListPosts;
        }


        //hàm xử lý lấy danh sách thông tin user bằng danh sách user id


        //lấy dữ liệu danh sách bài viết theo phân trang
        $scope.getMorePostsData = function () {
            var numberFrom = $scope.numberFrom + NUMBER_DATA_PAGE;
            var dataQueryGetListPosts = genQueryGetListPosts(numberFrom);
            //$('.btn').button('loading');
            getPostsData(dataQueryGetListPosts);
            $scope.numberFrom = numberFrom;
        };

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
                if (source.groupId !== undefined && source.groupId !== '') {
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


        $scope.getTotalResult = function () {
            if ($scope.userCount > 100) {
                return $scope.userCount;
            } else return $scope.listUserInforAndCount.length;
        };

        $scope.getNumberResultShowPerPage = function () {
            if ($scope.listUserInforAndCount > 100) {
                return 100;
            } else return $scope.listUserInforAndCount.length;
        };

        $scope.showMore = function(id){
            $('.more_post_'+id).hide();
            $('.less_post_'+id).show();
        };

        $scope.showLess = function(id){
            $('.less_post_'+id).hide();
            $('.more_post_'+id).show();
        };

        //cờ: fill dữ liệu thời gian tìm kiếm khi mới load trang
        var flg_genDateRangeFromUrl = 1;



        /*END XỬ LÝ DỮ LIỆU CHO TAB BIỂU ĐỒ THỐNG KÊ TỪ KHÓA*/

//HÀM XỬ LÝ THƯ VIỆN NHẬP KHOẢNG THỜI GIAN
        $(function () {

            /*var start = moment().subtract(29, 'days');*/
            var start = moment();
            var end = moment();

            function cb(start, end) {
                if(flg_genDateRangeFromUrl===1 &&gteUrl !== "" && lteUrl !== "") {
                    var dateStart = timeNumberToDateDDMMYYYY(gteUrl);
                    var dateEnd = timeNumberToDateDDMMYYYY(lteUrl);
                    $('#reportrange span').html(dateStart + ' - ' + dateEnd);
                    $scope.paramSearchPost.filter_gte = gteUrl;
                    $scope.paramSearchPost.filter_lte = lteUrl;
                    flg_genDateRangeFromUrl=0;
                }
                else{
                    $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
                    $scope.paramSearchPost.filter_gte = dateToTimestamp(start.format('MM/DD/YYYY 00:00:00'));
                    $scope.paramSearchPost.filter_lte = dateToTimestamp(end.format('MM/DD/YYYY 23:59:59'));
                }


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

        // chartKeyword();
        $scope.typeChartKeyword = "post";
        $scope.viewChartKeywordByType = function () {
            switch ($scope.typeChartKeyword) {
                case 'post':
                    chartKeyword($scope.dataStatistic.keywordPostCount.buckets);
                    break;
                case 'like':
                    chartKeyword($scope.dataStatistic.keywordLikeCount.buckets);
                    break;
                case 'share':
                    chartKeyword($scope.dataStatistic.keywordShareCount.buckets);
                    break;
            }
        };

        function chartKeyword(arrKeywords) {
            var keyWordsString = "";
            for (var i = 0; i < arrKeywords.length; i++) {
                keyWordsString += arrKeywords[i].key + ";";
            }
            //var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';

            var lines = keyWordsString.split(/[,\.;]+/g),
                data = Highcharts.reduce(lines, function (arr, word) {
                    var obj = Highcharts.find(arr, function (obj) {
                        return obj.name === word;
                    });
                    if (obj) {
                        obj.weight += 1;
                    } else {
                        obj = {
                            name: word,
                            weight: 1
                        };
                        arr.push(obj);
                    }
                    return arr;
                }, []);

            Highcharts.chart('chartKeyword', {
                accessibility: {
                    screenReaderSection: {
                        beforeChartFormat: '<h5>{chartTitle}</h5>' +
                            '<div>{chartSubtitle}</div>' +
                            '<div>{chartLongdesc}</div>' +
                            '<div>{viewTableButton}</div>'
                    }
                },
                series: [{
                    type: 'wordcloud',
                    data: data,
                    name: 'Occurrences'
                }],
                title: {
                    text: ''
                }
            });
        }

    }]);