/**
 * Created by DaiCQ on 29/10/2019.
 */
app.controller('socialArticlesCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
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
            from: 0,
            size: 10,
            topicSelected: "",
            orderBy: "time",
            filter_keyword: "",
            filter_lte: dateToTimestamp(moment().format('MM/DD/YYYY 23:59:59')),
            filter_gte: dateToTimestamp(moment().format('MM/DD/YYYY 00:00:00')),
            filter_docType: ["\"news_article\"", "\"news_blog\"", "\"news_forum\""],
            /* filter_not: "["+genlistParamValueSelectedNotFindPost()+"]",*/
            filter_type: genlistParamArticleSources(),
            filter_searchType: genlistParamSearchBy(),
            /* filter_pageIds: "",
             filter_username: "",
             filter_name: "",
             filter_description: "",*/
            filter_category: genlistParamListCategories(),
            filter_sourceName: genlistParamArticleSources(),
            aggs_categoryCount: true,
            aggs_keywordPostCount: 20,
            aggs_sourceNameCount: 20,
            aggs_sourceCount: true
        };

        $scope.orderByType = 'share';
        $scope.topics = [];
        $scope.onloadPageSuccess = false;

        $scope.lengthOfParamListArticleSources = lengthOfParamListArticleSources;
        $scope.lengthOfParamListSearchBy = lengthOfParamListSearchBy;
        $scope.lengthOfParamListCategory = lengthOfParamListCategory;


        /*LAY DANH SACH TAT CA CHU DE*/
        $http.get(preUrl + "/social/international-topic/listData")
            .then(function (response) {
                if (response != null && response != 'undefined' && response.status == 200) {
                    $scope.topics = response.data.data.projects;
                    /* $scope.loadBieuDoTronLuongGiaoDich();*/
                }
            });


        function genlistParamSearchBy() {
            var listParam = [];
                var selectedValues = $('#multiple-checkboxes-search-by').val();
                if (selectedValues.length > 0) {
                    for (var i = 0; i < selectedValues.length; i++) {
                        listParam.push("\"" + selectedValues[i] + "\"");
                    }
                }
                console.log("genlistParamSearchBy data = " + listParam);


            return listParam;
        }


        function genlistParamListCategories() {
            var selectedValues = $('#multiple-checkboxes-list-categories').val();
            var listParam = [];
            if (selectedValues.length > 0) {
                for (var i = 0; i < selectedValues.length; i++) {
                    listParam.push("\"" + selectedValues[i] + "\"");
                }
            }
            console.log("genlistParamListCategories data = " + listParam);
            return listParam;
        }


        function genlistParamArticleSources() {
            var selectedValues = $('#multiple-checkboxes-article-sources').val();
            var listParam = [];
            if (selectedValues.length > 0) {
                for (var i = 0; i < selectedValues.length; i++) {
                    listParam.push(JSON.stringify("\"" + selectedValues[i] + "\""));
                }
            }
            console.log("genlistParamArticleSources data = " + listParam);
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
            var param_SearchType = genlistParamSearchBy();
            var param_Category = genlistParamListCategories();
            var param_SourceName = genlistParamArticleSources();

            var dataQueryGetListPosts = "{\"from\": \"" + fromNumber + "\",\n" +
                "    \"size\": 10,\n" +
                "  \"projectId\": \"" + $scope.searchCondition.topicSelected + "\",\n" +
                "    \"orderBy\": \"" + $scope.searchCondition.orderBy + "\",\n" +
                "  \"filter\": {\n" +
                "    \"keyword\": \"" + $scope.searchCondition.filter_keyword + "\",\n" +
                "    \"gte\":" + $scope.searchCondition.filter_gte + ",\n" +
                "    \"lte\": " + $scope.searchCondition.filter_lte + ",\n" +
                "    \"docType\": [" + $scope.searchCondition.filter_docType + "],\n" +
                "    \"searchType\": [" + (param_SearchType.length === $scope.lengthOfParamListArticleSources ? "":param_SearchType) + "],\n" +
                "    \"category\": [" + (param_Category.length === $scope.lengthOfParamListSearchBy ? "":param_Category) + "],\n" +
                "    \"sourceName\": [" + (param_SourceName.length === $scope.lengthOfParamListCategory ? "":param_SourceName) + "]\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"categoryCount\": " + $scope.searchCondition.aggs_categoryCount + ",\n" +
                "    \"keywordPostCount\": " + $scope.searchCondition.aggs_keywordPostCount + ",\n" +
                "    \"sourceNameCount\": " + $scope.searchCondition.aggs_sourceNameCount + ",\n" +
                "    \"sourceCount\": " + $scope.searchCondition.aggs_sourceCount + "\n" +
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
            if (checkConditionSearch === false) {
                return;
            }
            $scope.dataPosts = {};
            $scope.arrayPosts = [];
            getDataPostMain();
        };

        $scope.searchByKeyClicked = function (keyClicked) {
            /*$scope.searchCondition.filter_keyword = ""+keyClicked+"";*/
            $scope.searchCondition.filter_keyword = keyClicked;
            $scope.dataPosts = {};
            $scope.arrayPosts = [];
            getDataPostMain();
        };

        $scope.searchConditionMessage = {postType: "", postFrom: "", sentiment: ""};

        function checkSearchCondition() {
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
                        if (response.data != "" && response.data.success != false) {
                            $scope.dataPosts = response.data.data;
                            if ($scope.dataPosts.hits.hits.length === 0) {
                                $('#not_found_data_message').show();
                                return;
                            }
                            $scope.arrayPosts = addtitionTwoArray($scope.dataPosts.hits.hits, $scope.arrayPosts);
                            console.log("length of dataPosts = " + $scope.dataPosts.hits.hits.length);
                            console.log("length of arrayPosts = " + $scope.arrayPosts.length);
                            $scope.keywordPostCount = response.data.data.aggregations.keywordPostCount.buckets;
                            $scope.categoryCount = response.data.data.aggregations.categoryCount.buckets;
                            $scope.sourceNameCount = response.data.data.aggregations.sourceNameCount.buckets;
                            canvasChartKeywordStatistic();
                            /*   canvasChartPostByCategoriesStatistic();*/
                            canvasChartPostByArticlesStatistic();
                            $scope.onloadPageSuccess = true;
                            /* $('.btn').button('reset');*/
                        } else {
                            $('#content_posts').hide();
                            $('#not_found_data_message').show();
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

        function addtitionTwoArray(arraySource, arrayTarget) {
            for (var i = 0; i < arraySource.length; i++) {
                arrayTarget.push(arraySource[i]);
            }
            return arrayTarget;
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


        //xử lý dữ liệu cho biểu đồ thống kê từ khóa


        //xử lý dữ liệu cho biểu đồ thống kê từ khóa
        $scope.processDataForKeywordStatisticChart = function () {
            var listData = [];
            var listKey = [];
            var listValue = [];
            var seriesName = '';
            listData = $scope.keywordPostCount;
            seriesName = 'Từ khóa';

            for (var i = 0; i < listData.length; i++) {
                listKey.push(listData[i].key);
                listValue.push(listData[i].doc_count);
            }
            canvasChartKeywordStatistic(listKey, listValue, seriesName);
        };

        //vẽ biểu đồ THỐNG KÊ SỐ LẦN XUẤT HIỆN CỦA TỪ KHÓA
        function canvasChartKeywordStatistic() {
            var listKey = [];
            var listValue = [];
            var listData = $scope.keywordPostCount;
            var seriesName = 'Từ khóa';

            for (var i = 0; i < listData.length; i++) {
                listKey.push(listData[i].key);
                listValue.push(listData[i].doc_count);
            }

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

        //vẽ biểu đồ THỐNG KÊ BÀI VIẾT THEO CHUYÊN MỤC
        function canvasChartPostByCategoriesStatistic() {
            var listKey = [];
            var listValue = [];
            var listData = $scope.categoryCount;
            var seriesName = 'Bài viết theo chuyên mục';

            for (var i = 0; i < listData.length; i++) {
                listKey.push(listData[i].key);
                listValue.push(listData[i].doc_count);
            }

            Highcharts.chart('chartPostByCategoriesStatistic', {

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

        //vẽ biểu đồ THỐNG KÊ BÀI VIẾT THEO TRANG BÁO
        function canvasChartPostByArticlesStatistic() {
            var listKey = [];
            var listValue = [];
            var listData = $scope.sourceNameCount;
            var seriesName = 'Bài viết theo trang báo';

            for (var i = 0; i < listData.length; i++) {
                listKey.push(listData[i].key);
                listValue.push(listData[i].doc_count);
            }

            Highcharts.chart('chartPostByArticlesStatistic', {

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

        $scope.showMore = function (id) {
            $('.more_post_' + id).hide();
            $('.less_post_' + id).show();
        };

        $scope.showLess = function (id) {
            $('.less_post_' + id).hide();
            $('.more_post_' + id).show();
        };

        /*END XỬ LÝ DỮ LIỆU CHO TAB BIỂU ĐỒ THỐNG KÊ TỪ KHÓA*/

//HÀM XỬ LÝ THƯ VIỆN NHẬP KHOẢNG THỜI GIAN
        $(function () {

            /*var start = moment().subtract(29, 'days');*/
            var start = moment();
            var end = moment();

            function cb(start, end) {
                $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
                $scope.searchCondition.filter_gte = dateToTimestamp(start.format('MM/DD/YYYY 00:00:00'));
                $scope.searchCondition.filter_lte = dateToTimestamp(end.format('MM/DD/YYYY 23:59:59'));
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