/**
 * Created by DaiCQ on 11/10/2019.
 */
app.controller('socialDashboardCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
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
        var date = new Date();
        var week = getWeekNumber(date);
        var fullYear = date.getFullYear();
        for (var i = 0; i < 10; i++) {
            $scope.listYear.push(fullYear);
            fullYear--;
        }


        $scope.topics = {};
        $scope.paramListTypePost = createParamListTypePost();
        $scope.paramListFromPost = createParamListFromPost();
        $scope.paramListNotFindPost = createParamNotFindPost();
        $scope.paramListSentimentsPost = createParamSentimentsPost();

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
            var selectedValues = $('#multiple-checkboxes-type-post').val();
            var listParam = [];
            if (selectedValues.length > 0) {
                for (var i = 0; i < selectedValues.length; i++) {
                    listParam.push("\"" + selectedValues[i] + "\"");
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
            var selectedValues = $('#multiple-checkboxes-from-post').val();
            var listParam = [];
            if (selectedValues.length > 0) {
                for (var i = 0; i < selectedValues.length; i++) {
                    listParam.push("\"" + selectedValues[i] + "\"");
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
            if (selectedValues.length > 0 && selectedValues.length < $scope.paramListNotFindPost.length) {
                for (var i = 0; i < selectedValues.length; i++) {
                    listParam.push("\"" + selectedValues[i] + "\"");
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
            var selectedValues = $('#multiple-checkboxes-sentiment-post').val();
            var listParam = [];
            if (selectedValues.length > 0 && selectedValues.length < $scope.paramListSentimentsPost.length) {
                for (var i = 0; i < selectedValues.length; i++) {
                    listParam.push("\"" + selectedValues[i] + "\"");
                }
            }
            return listParam;
        }

        var flg_select_searchAdvanced = 0;
        $('#select_searchAdvanced').click(function () {
            if (flg_select_searchAdvanced === 0) {
                $('#search_Advanced').show();
                flg_select_searchAdvanced = 1;
            } else {
                $('#search_Advanced').hide();
                flg_select_searchAdvanced = 0;
            }

        });

        $scope.FREEQUENCY = {
            ONE_HOUR: 1,
            THREE_HOUR: 3,
            SIX_HOUR: 6,
            TWELFTH_HOUR: 12,
            ONE_DAY: 24,
            ONE_WEEK: 168
        };

        /*LAY DANH SACH TAT CA CHU DE*/
        $http.get(preUrl + "/social/international-topic/listData")
            .then(function (response) {
                if (response != null && response != 'undefined' && response.status == 200) {
                    $scope.topics = response.data.data.projects;
                    /* $scope.loadBieuDoTronLuongGiaoDich();*/
                }
            });


        /*LAY DU LIEU BAI VIET TU API MANG XA HOI*/
        $scope.keywordQuery = "";
        /*        $scope.dateFrom =  moment().format('MM/DD/YYYY 00:00:00');
                $scope.dateTo = moment().format('MM/DD/YYYY 23:59:59');*/
        $scope.countHourFromDateStartToDateEnd = 24;
        $scope.searchCondition = {
            topicSelected:"",
            keyword: "",
            dateFrom: dateToTimestamp(moment().format('MM/DD/YYYY 00:00:00')),
            dateTo: dateToTimestamp(moment().format('MM/DD/YYYY 23:59:59')),
            postType: "",
            fromPost: "",
            notShowPost: ""
        };

        //generate query for api get posts data, params: timeFrom, timeTo
        function genQueryGetPosts() {
            var paramType = genlistParamValueSelectedTypePost();
            var paramDocType = genlistParamValueSelectedFromPost();
            var dataQueryGetPosts = "{\"size\": 0,\n" +
                "  \"projectId\": \"" + $scope.searchCondition.topicSelected + "\",\n" +
                "  \"filter\": {\n" +
                "    \"keyword\": \"" + $scope.searchCondition.keyword + "\",\n" +
                "    \"gte\":" + $scope.searchCondition.dateFrom + ",\n" +
                "    \"lte\": " + $scope.searchCondition.dateTo + ",\n" +
                "    \"not\": [" + genlistParamValueSelectedNotFindPost() + "],\n" +
                "    \"type\": [" + (paramType.length === $scope.paramListTypePost.length ? "":paramType) + "],\n" +
                "    \"docType\": [" + (paramDocType.length === $scope.paramListFromPost.length ? "":paramDocType) + "]\n" +
                "  },\n" +
                "  \"aggs\": {\n" +
                "    \"typeCountByTime\": true,\n" +
                "    \"typesCount\": true,\n" +
                "    \"docTypesCount\": true,\n" +
                "    \"userCount\": true,\n" +
                "    \"pageCount\": true,\n" +
                "    \"mobileCount\": true,\n" +
                "    \"sellCount\": true,\n" +
                "    \"sentimentsCount\": true,\n" +
                "    \"likeCount\": true,\n" +
                "    \"shareCount\": true\n" +
                "  }\n" +
                "}";
            return dataQueryGetPosts;
        }

        $scope.dataPosts = "";

        //Tổng số bài viết
        $scope.totalPost = 0;

        getAndProcessDataMain();

        //Lấy dữ liệu thống kê
        function getAndProcessDataMain() {
            var dataQuery = genQueryGetPosts();

            $http.post(preUrl + "/social/posts/listData", dataQuery, {headers: {'Content-Type': 'application/json;charset=utf-8;'}})
                .then(function (response) {
                        if (response.data !== "" && response.data.success) {
                            $scope.dataPosts = response.data;
                            $scope.totalPost = $scope.dataPosts.data.hits.total;
                            if($scope.totalPost===0){
                                $('#loading').hide();
                                $('#not_found_data_message').show();
                                return;
                            }

                            var dataListTypePostCountByTimeGetfromApi = $scope.dataPosts.data.aggregations.typeCountByTime.typeCountByTime.buckets;
                            if(dataListTypePostCountByTimeGetfromApi.length===0){
                                $('#not_found_data_message').show();
                                $('#content_dashboard').hide();
                                $('#loading').hide();
                                return;
                            }

                            processForChart1();
                            dataListTypePostCountByTimeAndShowChart($scope.countHourFromDateStartToDateEnd, $scope.FREEQUENCY.ONE_HOUR);
                            dataListShareAndLikeCountByTimeAndShowChart($scope.countHourFromDateStartToDateEnd, $scope.FREEQUENCY.ONE_HOUR);
                            dataListSentimentsCountByTimeAndShowChart($scope.countHourFromDateStartToDateEnd, $scope.FREEQUENCY.ONE_HOUR);
                            getDataForSquareChart($scope.dataPosts.data.aggregations);
                            getRateAndNumberOfPosts($scope.dataPosts.data.aggregations.typeCountByTime);
                            console.log($scope.dataPosts);

                            $('#loading').hide();
                            $('#content_dashboard').show();
                        }
                        else{
                            $('#loading').hide();
                            $('#not_found_data_message').show();
                        }
                    },
                    function (response) {
                        $scope.messageStatus = "Có lỗi xảy ra, hãy thử lại sau!";
                        /*$scope.clearDialogPackage();*/
                        $("#Message").modal('show');
                    });
        }

        //param date is of Date() object
        function countHourBetweenTwoDate(date1, date2) {
            var hours = Math.abs(date1 - date2) / 36e5;
            return hours;
        }

        $scope.search = function () {
            var checkConditionSearch = checkSearchCondition();
            if(checkConditionSearch === false){
                return;
            }
            $('#not_found_data_message').hide();
            $('#content_dashboard').hide();
            $('#loading').show();

            getAndProcessDataMain();
        };

        $scope.searchConditionMessage = {postType:"", postFrom:""};
        function checkSearchCondition(){
            $scope.searchConditionMessage.postType="";
            $scope.searchConditionMessage.postFrom="";
            var listParamPostType = genlistParamValueSelectedTypePost();
            var listParamPostFrom = genlistParamValueSelectedFromPost();
            if(listParamPostType.length===0){
                $scope.searchConditionMessage.postType = "Chọn ít nhất một loại bài viết!";
                return false;
            }
            if(listParamPostFrom.length===0){
                $scope.searchConditionMessage.postFrom = "Chọn ít nhất một nguồn bài viết!";
                return false;
            }
            return true;
        }


        //START XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ THỂ HIỆN SỐ LƯỢNG BÀI VIẾT, LƯỢT THÍCH, LƯỢT CHIA SẺ, BÀI BÁO (BIỂU ĐỒ ĐẦU TIÊN)
        $scope.chart1 = {"sumPost": 0, "sumLike": 0, "sumShare": 0, "sumArticleShare": 0};

        function processForChart1() {
            $scope.chart1.sumPost = numberWithCommas($scope.dataPosts.data.hits.total);
            $scope.chart1.sumLike = numberWithCommas($scope.dataPosts.data.aggregations.likeCount.value);
            $scope.chart1.sumShare = numberWithCommas($scope.dataPosts.data.aggregations.shareCount.value);
            $scope.chart1.sumArticleShare = numberWithCommas(getSumNewArticleInListDocTypesCount($scope.dataPosts.data.aggregations.docTypesCount.buckets));
        }


        //hàm lấy dữ liệu tổng số bài báo trong danh sách
        function getSumNewArticleInListDocTypesCount(buckets) {
            for (var i = 0; i < buckets.length; i++) {
                if (buckets[i].key === "news_article") {
                    return buckets[i].doc_count;
                }
            }
            return 0;
        }

        //END XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ THỂ HIỆN SỐ LƯỢNG BÀI VIẾT, LƯỢT THÍCH, LƯỢT CHIA SẺ, BÀI BÁO (BIỂU ĐỒ ĐẦU TIÊN)


        //START XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ SỐ LƯỢNG BÀI VIẾT THEO THỜI GIAN

        /*        $scope.listFrequencyShowPostByTime = getListFreequency();*/
        $scope.showPostCountByTimeChartByTimeFreequency = function (freequenccy) {
            dataListTypePostCountByTimeAndShowChart($scope.countHourFromDateStartToDateEnd, freequenccy);
        };

        var countPointShowTypePostCountByTime;
        /*        var listTimeGetPostByTime;*/
        var dataListTypePostCountByTimeGetfromApi;
        var dataListTypePostCountByTimeProcessed;
        /*        var listTimeShowToChartDataTypePostCountByTime=[];*/
        var objectListTimeGetPostCountByTime = {"listTimePoint": [], "listTimeShowChart": []};

        function dataListTypePostCountByTimeAndShowChart(time, freequency) {
            countPointShowTypePostCountByTime = getCountPointShow(time, freequency);
            objectListTimeGetPostCountByTime = getListPointDetailByCountPoint(freequency, countPointShowTypePostCountByTime, $scope.searchCondition.dateFrom, $scope.searchCondition.dateTo);
            dataListTypePostCountByTimeGetfromApi = $scope.dataPosts.data.aggregations.typeCountByTime.typeCountByTime.buckets;
            dataListTypePostCountByTimeProcessed = [];
            for (var i = 0; i < dataListTypePostCountByTimeGetfromApi.length; i++) {
                var objectThisDataTypePostCount = {"name": "", "data": []};
                objectThisDataTypePostCount.name = dataListTypePostCountByTimeGetfromApi[i].key;
                objectThisDataTypePostCount.data = getListDataTypePostCountByListDateTimeString(objectListTimeGetPostCountByTime.listTimePoint, dataListTypePostCountByTimeGetfromApi[i].time.buckets);
                dataListTypePostCountByTimeProcessed.push(objectThisDataTypePostCount);
            }

            console.log("dataListTypePostCountByTimeProcessed daicq = " + dataListTypePostCountByTimeProcessed);

            canvasChartTypePostCoutByTime(objectListTimeGetPostCountByTime.listTimeShowChart, dataListTypePostCountByTimeProcessed);
        }


        //Tính để xác định số điểm hiển thị dữ liệu trên biểu đồ
        //param: time(thời gian), frequercy(độ dày các điểm: 1h, 3h, 1 ngày...)
        //time: số giờ
        //frequency: 1,3,6,9,12,1d,1w
        function getCountPointShow(time, frequency) {
            return time / frequency;
        }

        //Hàm dùng chung
        //Lấy danh sách điểm (danh sách thời gian cho cột hoành) hiển thị dữ liệu trên biểu đồ
        //param: timeFrom(thời gian từ), timeTo(thời gian đến), point(số điểm hiển thị trên biểu đồ)
        function getListPointDetailByCountPoint(frequency, countPointShow, timeFrom, timeTo) {
            var objectListTime = {};
            var listTimePoint = [];
            var timeFromConvertedUnixToDate = new Date(timeFrom);
            var timeToConvertedUnixToDate = new Date(timeTo);
            var listTimeShowToChartDataTypePostCountByTime = [];

            listTimePoint.push(convertDateToFormatCustom(timeFrom));
            listTimeShowToChartDataTypePostCountByTime.push(convertDateTimeFromUnixToFormatShowChart(timeFrom));

            /*            listPoint.push(timeFromConvertedUnixToDate);*/
            for (var i = 0; i < countPointShow - 1; i++) {
                //timeFrom + point = timeTo

                var thisDateTime = timeFromConvertedUnixToDate.setHours(timeFromConvertedUnixToDate.getHours() + frequency);

                listTimePoint.push(convertDateToFormatCustom(thisDateTime));
                listTimeShowToChartDataTypePostCountByTime.push(convertDateTimeFromUnixToFormatShowChart(thisDateTime));

            }
            objectListTime.listTimePoint = listTimePoint;
            objectListTime.listTimeShowChart = listTimeShowToChartDataTypePostCountByTime;
            return objectListTime;
        }

        //hàm lấy ra list dữ liệu tương ứng ví trí trong mảng với list thời gian
        //ví dụ: listTime ["12/2019","13/2019","14/2019"] => lấy ra list dữ liệu [10,5,6]
        function getListDataTypePostCountByListDateTimeString(listDateTime, listData) {
            var listResult = [];
            for (var i = 0; i < listDateTime.length; i++) {
                var thisData = 0;
                for (var j = 0; j < listData.length; j++) {
                    if (listDateTime[i] === listData[j].key_as_string) {
                        thisData = listData[j].doc_count;
                        break;
                    }
                }
                listResult.push(thisData);
            }
            return listResult;
        }

        function convertDateTimeFromUnixToFormatShowChart(timeStamp) {
            var date = new Date(timeStamp);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
            console.log(formattedDate);

            // Months array
            var months_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

            // Convert timestamp to milliseconds

            // Year
            var year = date.getFullYear();

            // Month
            var month = months_arr[date.getMonth()];

            // Day
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

            // Hours
            var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();

            // Minutes
            var minutes = "0" + date.getMinutes();

            // Seconds
            var seconds = "0" + date.getSeconds();

            // Display date time in MM-dd-yyyy h:m:s format
            var convdataTime = day + '/' + month + ' ' + hours + ':' + minutes.substr(-2);
            console.log("convertTimstampUTCToDateFormatCustom: " + timeStamp + ' = ' + convdataTime);
            return convdataTime;
        }


        function convertDateToFormatCustom(timeStamp) {
            console.log('chu quang đại');

            var date = new Date(timeStamp);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
            console.log(formattedDate);

            // Months array
            var months_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

            // Convert timestamp to milliseconds
            var date = new Date(timeStamp);

            // Year
            var year = date.getFullYear();

            // Month
            var month = months_arr[date.getMonth()];

            // Day
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

            // Hours
            var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();

            // Minutes
            var minutes = "0" + date.getMinutes();

            // Seconds
            var seconds = "0" + date.getSeconds();

            // Display date time in MM-dd-yyyy h:m:s format
            var convdataTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '.000+07:00';
            console.log("convertTimstampUTCToDateFormatCustom: " + timeStamp + ' = ' + convdataTime);
            return convdataTime;

        }

        //Lấy danh sách giá trị theo điểm hiển thị dữ liệu trên biểu đồ
        //param: type(loại tiêu chí), listPoint(danh sách điểm)
        function getListValueOfTypeByListPoint(type, listPoint) {

        }


        function canvasChartTypePostCoutByTime(listTime, listObjectData) {
            Highcharts.chart('postsChart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    /*categories: ['01/10 18:00', '01:10 19:00', '01:10 20:00', '01:10 21:00', '01:10 22:00']*/
                    categories: listTime
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Số lượng bài viết'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'number' /*stacking is number, percent*/
                    }
                },
                /* series: [{
                     name: 'Album',
                     data: [2000, 3000, 5000, 7000, 7500]
                 }, {
                     name: 'Event',
                     data: [1000, 3500, 4500, 6000, 6500]
                 }, {
                     name: 'Link',
                     data: [1500, 2000, 4000, 5000, 7000]
                 }]*/
                series: listObjectData
            });
        }

        //END XỬ LÝ DỮ LIỆU CHO Biểu đồ số lượng bài viết theo thời gian


        //START XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ LƯỢNG THÍCH VÀ CHIA SẺ THEO THỜI GIAN
        $scope.frequencyShowShareAndLikeCountByTime = $scope.FREEQUENCY.ONE_HOUR;
        var countPointShowShareAndLikeCountByTime;
        /*        var listTimeGetShareAndLikeCountByTime;*/
        var objectListTimeGetShareAndLikeCountByTime = {"listTimePoint": [], "listTimeShowChart": []};
        var dataListTypeShareAndLikeCountByTimeGetfromApi;
        var dataListTypeShareAndLikeCountByTimeProcessed;

        /*        var listTimeShowToChartDataShareAndLikeCountByTimeByTime=[];*/
        $scope.showLikeAndShareCountByTimeChartByTimeFreequency = function (freequenccy) {
            dataListShareAndLikeCountByTimeAndShowChart($scope.countHourFromDateStartToDateEnd, freequenccy);
        };

        function dataListShareAndLikeCountByTimeAndShowChart(time, freequency) {
            countPointShowShareAndLikeCountByTime = getCountPointShow(time, freequency);

            objectListTimeGetShareAndLikeCountByTime = getListPointDetailByCountPoint(freequency, countPointShowShareAndLikeCountByTime, $scope.searchCondition.dateFrom, $scope.searchCondition.dateTo);
            dataListTypeShareAndLikeCountByTimeGetfromApi = $scope.dataPosts.data.aggregations.typeCountByTime.typeCountByTime.buckets;

            dataListTypeShareAndLikeCountByTimeProcessed = [];
            /*            var objectDataShareCountByTime = {"name": "share", "data": []};
                        var objectDataLikeCountByTime = {"name": "like", "data": []};*/
            var objectDataShareCountByTime = getListDataLikeOrShareCountByTime('share');
            var objectDataLikeCountByTime = getListDataLikeOrShareCountByTime('like');

            var resultCountShareByTime = getDataSumCountLikeOrShareByTime(objectDataShareCountByTime);
            var resultCountLikeByTime = getDataSumCountLikeOrShareByTime(objectDataLikeCountByTime);
            canvasChartListDataShareAndLikeCountByTime(objectListTimeGetShareAndLikeCountByTime.listTimeShowChart, resultCountLikeByTime, resultCountShareByTime);


            console.log("dataListTypePostCountByTimeProcessed daicq = " + dataListTypeShareAndLikeCountByTimeProcessed);

            //  canvasChartTypePostCoutByTime(listTimeShowToChart, dataListTypeShareAndLikeCountByTimeProcessed);
        }

        //lấy dữ liệu tổng số like hoặc share cuẩ các tiêu chí theo list thời gian tương ứng chỉ số
        function getDataSumCountLikeOrShareByTime(data) {
            var listSumLikeOrShareByTime = [];
            for (var i = 0; i < objectListTimeGetShareAndLikeCountByTime.listTimePoint.length; i++) {
                var sumAtTime = 0;
                for (var j = 0; j < data.length; j++) {
                    sumAtTime += data[j].data[i];
                }
                listSumLikeOrShareByTime.push(sumAtTime);
            }
            return listSumLikeOrShareByTime;
        }

        //param: type is 'like' or 'share'
        function getListDataLikeOrShareCountByTime(type) {
            var dataListTypeShareAndLikeCountByTimeProcessed = [];

            for (var i = 0; i < dataListTypeShareAndLikeCountByTimeGetfromApi.length; i++) {
                var objectThisDataTypePostCount = {"name": "", "data": []};
                objectThisDataTypePostCount.name = dataListTypeShareAndLikeCountByTimeGetfromApi[i].key;
                objectThisDataTypePostCount.data = getListDataShareAndLikeCountByListDateTimeString(objectListTimeGetShareAndLikeCountByTime.listTimePoint, dataListTypeShareAndLikeCountByTimeGetfromApi[i].time.buckets, type);
                dataListTypeShareAndLikeCountByTimeProcessed.push(objectThisDataTypePostCount);
            }
            return dataListTypeShareAndLikeCountByTimeProcessed;
        }

        //hàm lấy ra list dữ liệu tương ứng ví trí trong mảng với list thời gian
        //ví dụ: listTime ["12/2019","13/2019","14/2019"] => lấy ra list dữ liệu [10,5,6]
        function getListDataShareAndLikeCountByListDateTimeString(listDateTime, listData, type) {
            var listResult = [];
            for (var i = 0; i < listDateTime.length; i++) {
                var thisCount = 0;
                for (var j = 0; j < listData.length; j++) {
                    if (listDateTime[i] === listData[j].key_as_string) {
                        if (type === 'like') {
                            thisCount += listData[j].like.value;
                        } else {
                            thisCount += listData[j].share.value;
                        }

                        break;
                    }
                }
                listResult.push(thisCount);
            }
            return listResult;
        }

        function canvasChartListDataShareAndLikeCountByTime(listTime, listLikeCount, listShareCount) {
            Highcharts.chart('likeAndShareChart', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    /*categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']*/
                    categories: listTime
                },
                yAxis: {
                    title: {
                        text: 'Số lượng lượt thích và chia sẻ'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: true
                    }
                },
                series: [{
                    name: 'Like',
                    data: listLikeCount
                }, {
                    name: 'Share',
                    data: listShareCount
                }]
                /*[{
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }]*/
            });
        }


        //END XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ LƯỢNG THÍCH VÀ CHIA SẺ THEO THỜI GIAN


        //START XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ SẮC THÁI BÀI VIẾT THEO THỜI GIAN
        $scope.frequencyShowSentimentsCountByTime = $scope.FREEQUENCY.ONE_HOUR;
        var countPointShowSentimentsCountByTime;
        /*        var listTimeGetSentimentsCountByTime;*/
        var objectListTimeGetSentimentsCountByTime = {"listTimePoint": [], "listTimeShowChart": []};
        var dataListTypeSentimentsCountByTimeGetfromApi;
        var dataListTypeSentimentsCountByTimeProcessed;

        /*        var listTimeShowToChartDataSentimentsCountByTimeByTime=[];*/

        $scope.showSentimentsCountByTimeChartByTimeFreequency = function (freequenccy) {
            dataListSentimentsCountByTimeAndShowChart($scope.countHourFromDateStartToDateEnd, freequenccy);
        };

        function dataListSentimentsCountByTimeAndShowChart(time, freequency) {
            countPointShowSentimentsCountByTime = getCountPointShow(time, freequency);

            objectListTimeGetSentimentsCountByTime = getListPointDetailByCountPoint(freequency, countPointShowSentimentsCountByTime, $scope.searchCondition.dateFrom, $scope.searchCondition.dateTo);
            dataListTypeSentimentsCountByTimeGetfromApi = $scope.dataPosts.data.aggregations.typeCountByTime.typeCountByTime.buckets;

            dataListTypeSentimentsCountByTimeProcessed = [];
            /*            var objectDataShareCountByTime = {"name": "share", "data": []};
                        var objectDataLikeCountByTime = {"name": "like", "data": []};*/
            var objectDataPOSCountByTime = getListDataSentimentsCountByTime('POS');
            var objectDataNEUCountByTime = getListDataSentimentsCountByTime('NEU');
            var objectDataNEGCountByTime = getListDataSentimentsCountByTime('NEG');

            var resultCountPOSByTime = getDataSumSentimentsByTime(objectDataPOSCountByTime);
            var resultCountNEUByTime = getDataSumSentimentsByTime(objectDataNEUCountByTime);
            var resultCountNEGByTime = getDataSumSentimentsByTime(objectDataNEGCountByTime);
            canvasChartListDataSentimentsCountByTime(objectListTimeGetSentimentsCountByTime.listTimeShowChart,
                resultCountPOSByTime, resultCountNEUByTime, resultCountNEGByTime);


            console.log("dataListTypePostCountByTimeProcessed daicq = " + dataListTypeSentimentsCountByTimeProcessed);

            //  canvasChartTypePostCoutByTime(listTimeShowToChart, dataListTypeSentimentsCountByTimeProcessed);
        }

        //lấy dữ liệu tổng số like hoặc share cuẩ các tiêu chí theo list thời gian tương ứng chỉ số
        function getDataSumSentimentsByTime(data) {
            var listSumSentimentsByTime = [];
            for (var i = 0; i < objectListTimeGetSentimentsCountByTime.listTimePoint.length; i++) {
                var sumAtTime = 0;
                for (var j = 0; j < data.length; j++) {
                    sumAtTime += data[j].data[i];
                }
                listSumSentimentsByTime.push(sumAtTime);
            }
            return listSumSentimentsByTime;
        }

        //param: type is 'like' or 'share'
        function getListDataSentimentsCountByTime(type) {
            var dataListTypeSentimentsCountByTimeProcessed = [];

            for (var i = 0; i < dataListTypeSentimentsCountByTimeGetfromApi.length; i++) {
                var objectThisDataTypePostCount = {"name": "", "data": []};
                objectThisDataTypePostCount.name = dataListTypeSentimentsCountByTimeGetfromApi[i].key;
                objectThisDataTypePostCount.data = getListDataSentimentsCountByListDateTimeString(objectListTimeGetSentimentsCountByTime.listTimePoint, dataListTypeSentimentsCountByTimeGetfromApi[i].time.buckets, type);
                dataListTypeSentimentsCountByTimeProcessed.push(objectThisDataTypePostCount);
            }
            return dataListTypeSentimentsCountByTimeProcessed;
        }

        //hàm lấy ra list dữ liệu tương ứng ví trí trong mảng với list thời gian
        //ví dụ: listTime ["12/2019","13/2019","14/2019"] => lấy ra list dữ liệu [10,5,6]
        function getListDataSentimentsCountByListDateTimeString(listDateTime, listData, type) {
            var listResult = [];
            for (var i = 0; i < listDateTime.length; i++) {
                var thisCount = 0;
                for (var j = 0; j < listData.length; j++) {
                    if (listDateTime[i] === listData[j].key_as_string) {
                        thisCount = getSentimentValueOfListBySentimentKey(listData[j].sentiments.buckets, type);
                        break;
                    }
                }
                listResult.push(thisCount);
            }
            return listResult;
        }

        //hàm lấy dữ liệu của 1 sắc thái cụ thể
        //ví dụ lấy value của 'NEG' trong list [{key: "NEU", doc_count: 328}, {key: "POS", doc_count: 253}, {key: "NEG", doc_count: 169}]
        function getSentimentValueOfListBySentimentKey(listSentimentsValue, type) {
            for (var i = 0; i < listSentimentsValue.length; i++) {
                if (listSentimentsValue[i].key === type) {
                    return listSentimentsValue[i].doc_count;
                }
            }
            return 0;
        }

        function canvasChartListDataSentimentsCountByTime(listTime, listPOSCount, listNEUCount, listNEGCount) {
            Highcharts.chart('sentimentsCountByTimeChart', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    /*categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']*/
                    categories: listTime
                },
                yAxis: {
                    title: {
                        text: 'Số lượng lượt sắc thái bài viết'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: true
                    }
                },
                series: [{
                    name: 'Tích cực',
                    data: listPOSCount
                }, {
                    name: 'Trung tính',
                    data: listNEUCount
                }, {
                    name: 'Tiêu cực',
                    data: listNEGCount
                }]
                /*[{
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }]*/
            });
        }


        //END XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ SẮC THÁI BÀI VIẾT THEO THỜI GIAN


        //Lấy dữ liệu cho biểu đồ dạng ô vuông ở dưới cùng của dashboard
        $scope.mobileCount = {number: 0, percent: 0}; //số lượng bài viết từ thiết bị di động
        $scope.sellCount = {number: 0, percent: 0}; //số lượng bài viết bán hàng
        $scope.pageCount = {number: 0, percent: 0}; //fanpage đã đăng bài
        $scope.userCount = {number: 0, percent: 0}; //cá nhân đã đăng bài
        $scope.user_postCount = {number: 0, percent: 0}; //bài viết từ cá nhân
        $scope.page_postCount = {number: 0, percent: 0}; //bài viết từ fanpage
        $scope.neg_count = {number: 0, percent: 0}; //bài viết tiêu cực
        $scope.pos_count = {number: 0, percent: 0}; //bài viết tích cực
        function getDataForSquareChart(data) {
            $scope.mobileCount.number = numberWithCommas(data.mobileCount.doc_count);
            $scope.mobileCount.percent = getPercent(data.mobileCount.doc_count, $scope.totalPost);
            $scope.sellCount.number = numberWithCommas(data.sellCount.doc_count);
            $scope.sellCount.percent = getPercent(data.sellCount.doc_count, $scope.totalPost);
            $scope.pageCount.number = numberWithCommas(data.pageCount.value);
            $scope.pageCount.percent = getPercent(data.pageCount.value, data.pageCount.value + data.userCount.value);
            $scope.userCount.number = numberWithCommas(data.userCount.value);
            $scope.userCount.percent = getPercent(data.userCount.value, data.pageCount.value + data.userCount.value);
            $scope.user_postCount.number = numberWithCommas(getDataNumberFromListBuckets(data.docTypesCount.buckets, "user_post"));
            $scope.user_postCount.percent = getPercent(getDataNumberFromListBuckets(data.docTypesCount.buckets, "user_post"), $scope.totalPost);
            $scope.page_postCount.number = numberWithCommas(getDataNumberFromListBuckets(data.docTypesCount.buckets, "page_post"));
            $scope.page_postCount.percent = getPercent(getDataNumberFromListBuckets(data.docTypesCount.buckets, "page_post"), $scope.totalPost);
            $scope.neg_count.number = numberWithCommas(getDataNumberFromListBuckets(data.sentimentsCount.buckets, "NEG"));
            $scope.neg_count.percent = getPercent(getDataNumberFromListBuckets(data.sentimentsCount.buckets, "NEG"), $scope.totalPost);
            $scope.pos_count.number = numberWithCommas(getDataNumberFromListBuckets(data.sentimentsCount.buckets, "POS"));
            $scope.pos_count.percent = getPercent(getDataNumberFromListBuckets(data.sentimentsCount.buckets, "POS"), $scope.totalPost);
        }


        //Lấy dữ liệu cho biểu đồ Tỷ lệ và số lượng bài viết theo hình thức
        $scope.totalPostByForm = 0; //tổng số bài viết theo hình thức
        $scope.album = {name: "Album", number: 0, percent: 0};
        $scope.event = {name: "Event", number: 0, percent: 0};
        $scope.link = {name: "Link", number: 0, percent: 0};
        $scope.music = {name: "Music", number: 0, percent: 0};
        $scope.note = {name: "Note", number: 0, percent: 0};
        $scope.photo = {name: "Photo", number: 0, percent: 0};
        $scope.status = {name: "Status", number: 0, percent: 0};
        $scope.video = {name: "Video", number: 0, percent: 0};
        $scope.dataRateAndNumberOfPosts = {
            album: $scope.album, event: $scope.event, link: $scope.link, music: $scope.music, note: $scope.note,
            photo: $scope.photo, status: $scope.status, video: $scope.video
        };

        $scope.arrayDataRateAndNumberOfPosts = [];

        function getRateAndNumberOfPosts(data) {
            $scope.totalPostByForm = data.doc_count;
            var buckets = data.typeCountByTime.buckets;
            $scope.dataRateAndNumberOfPosts.album.number = getDataNumberFromListBuckets(buckets, "album");
            $scope.dataRateAndNumberOfPosts.album.percent = getPercent(getDataNumberFromListBuckets(buckets, "album"), $scope.totalPostByForm);
            $scope.dataRateAndNumberOfPosts.event.number = getDataNumberFromListBuckets(buckets, "event");
            $scope.dataRateAndNumberOfPosts.event.percent = getPercent(getDataNumberFromListBuckets(buckets, "event"), $scope.totalPostByForm);
            $scope.dataRateAndNumberOfPosts.link.number = getDataNumberFromListBuckets(buckets, "link");
            $scope.dataRateAndNumberOfPosts.link.percent = getPercent(getDataNumberFromListBuckets(buckets, "link"), $scope.totalPostByForm);
            $scope.dataRateAndNumberOfPosts.music.number = getDataNumberFromListBuckets(buckets, "music");
            $scope.dataRateAndNumberOfPosts.music.percent = getPercent(getDataNumberFromListBuckets(buckets, "music"), $scope.totalPostByForm);
            $scope.dataRateAndNumberOfPosts.note.number = getDataNumberFromListBuckets(buckets, "note");
            $scope.dataRateAndNumberOfPosts.note.percent = getPercent(getDataNumberFromListBuckets(buckets, "note"), $scope.totalPostByForm);
            $scope.dataRateAndNumberOfPosts.photo.number = getDataNumberFromListBuckets(buckets, "photo");
            $scope.dataRateAndNumberOfPosts.photo.percent = getPercent(getDataNumberFromListBuckets(buckets, "photo"), $scope.totalPostByForm);
            $scope.dataRateAndNumberOfPosts.status.number = getDataNumberFromListBuckets(buckets, "status");
            $scope.dataRateAndNumberOfPosts.status.percent = getPercent(getDataNumberFromListBuckets(buckets, "status"), $scope.totalPostByForm);
            $scope.dataRateAndNumberOfPosts.video.number = getDataNumberFromListBuckets(buckets, "video");
            $scope.dataRateAndNumberOfPosts.video.percent = getPercent(getDataNumberFromListBuckets(buckets, "video"), $scope.totalPostByForm);
            //hiển thị dữ liệu ra biểu đồ
            canvasRateAndNumberOfPosts($scope.dataRateAndNumberOfPosts);

        }

        //Lấy dữ liệu cho biểu đồ sắc thái bài viết


        // Lấy dữ liệu từ list buckets bằng tham số key
        function getDataNumberFromListBuckets(buckets, key) {
            var i = 0;
            for (i; i < buckets.length; i++) {
                if (buckets[i].key == key) {
                    return buckets[i].doc_count;
                }
            }
            return 0;
        }

        //chuyển số sang dạng có dấu phẩy
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // Lấy giá trị % của một số dựa trên tổng số.
        function getPercent(number, total) {
            var percent = (number / total) * 100;
            var roundedString = percent.toFixed(2);
            var result = Number(roundedString);
            return result;
        }

        //Hiển thị dữ liệu ra biểu đồ tỷ lệ và số lượng bài viết theo hình thức
        function canvasRateAndNumberOfPosts(data) {
            // Build the chart
            Highcharts.chart('rateAndNumberOfPosts', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Tỷ lệ',
                    colorByPoint: true,
                    data: [{
                        name: data.album.name + ':' + data.album.number + ' bài viết',
                        y: data.album.percent
                    }, {
                        name: data.event.name + ':' + data.event.number + ' bài viết',
                        y: data.event.percent
                    }, {
                        name: data.link.name + ':' + data.link.number + ' bài viết',
                        y: data.link.percent
                    }, {
                        name: data.music.name + ':' + data.music.number + ' bài viết',
                        y: data.music.percent
                    }, {
                        name: data.note.name + ':' + data.note.number + ' bài viết',
                        y: data.note.percent
                    }, {
                        name: data.photo.name + ':' + data.photo.number + ' bài viết',
                        y: data.photo.percent
                    }, {
                        name: data.status.name + ':' + data.status.number + ' bài viết',
                        y: data.status.percent
                    }, {
                        name: data.video.name + ':' + data.video.number + ' bài viết',
                        y: data.video.percent
                    }]
                }]
            });
        }




        /*CHO MUC CHON CHI TIEU*/

        $scope.changeType = function () {
            switch ($scope.type) {
                case "0":
                    $scope.showWeek = true;
                    $scope.showYear = true;
                    $scope.showMonth = false;
                    break;
                case "1":
                    $scope.showWeek = false;
                    $scope.showYear = true;
                    $scope.showMonth = true;
                    break;
                case "2":
                    $scope.showWeek = false;
                    $scope.showYear = true;
                    $scope.showMonth = false;
                    break;
                default:
                    break;
            }
        };

        $scope.typeError = "";
        $scope.yearError = "";
        $scope.monthError = "";
        $scope.weekError = "";
        $scope.nameTitleSwrap = "";
        $scope.refreshStatus = function () {
            $scope.typeError = "";
            $scope.yearError = "";
            $scope.monthError = "";
            $scope.weekError = "";
        };
        $scope.checkBeforeSearch = function () {
            $scope.refreshStatus();
            if ($scope.type == null || $scope.type == 'undefined' || $scope.type.length == 0) {
                $scope.typeError = "Bạn phải chọn chỉ tiêu thống kê.";
                return false;
            }
            if ($scope.year == null || $scope.year == 'undefined' || $scope.year.length == 0) {
                $scope.yearError = "Bạn phải chọn năm.";
                return false;
            }
            switch ($scope.type) {
                case "0":
                    $scope.month = "";
                    if ($scope.week == null || $scope.week == 'undefined' || $scope.week.length == 0) {
                        $scope.weekError = "Bạn phải chọn tuần.";
                        return false;
                    }
                    $scope.nameTitleSwrap = "tuần " + $scope.week + " của năm " + $scope.year;
                    break;
                case "1":
                    $scope.week = "";
                    if ($scope.month == null || $scope.month == 'undefined' || $scope.month.length == 0) {
                        $scope.monthError = "Bạn phải chọn tháng.";
                        return false;
                    }
                    $scope.nameTitleSwrap = "tháng " + $scope.month + "/" + $scope.year;
                    break;
                case "2":
                    $scope.month = "";
                    $scope.week = "";
                    $scope.nameTitleSwrap = "năm " + $scope.year;
                    break;
                default:
                    break;
            }
            return true;
        };


        $scope.reloadAllChart = function () {
            /*          $http.get(preUrl+"/trade-count",{params:{year:$scope.year,month:$scope.month,week:$scope.week}})
                          .then(function (response) {
                              if(response!=null && response!='undefined' && response.status==200){
                                  $scope.sanluonggiaodich=response.data;
                                  $scope.loadBieuDoTronLuongGiaoDich();

                              }
                          });

                      $http.get(preUrl+"/revenue-count",{params:{year:$scope.year,month:$scope.month,week:$scope.week}})
                          .then(function (response) {
                              if(response!=null && response!='undefined' && response.status==200){
                                  $scope.doanhthuloaigiaodich=response.data;
                                  $scope.loadBieuDoTronDoanhThu();

                              }
                          });*/


            $scope.nameTitle = $scope.nameTitleSwrap;
        };



        $(function () {

            /*var start = moment().subtract(29, 'days');*/
            var start = moment();
            var end = moment();

            function cb(start, end) {
                $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
                $scope.searchCondition.dateFrom = dateToTimestamp(start.format('MM/DD/YYYY 00:00:00'));
                $scope.searchCondition.dateTo = dateToTimestamp(end.format('MM/DD/YYYY 23:59:59'));
                $scope.countHourFromDateStartToDateEnd = countHourBetweenTwoDate(new Date($scope.searchCondition.dateFrom), new Date($scope.searchCondition.dateTo));
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