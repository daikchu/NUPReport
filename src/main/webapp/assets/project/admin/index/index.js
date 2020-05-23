/**
 * Created by Admin on 12/22/2017.
 */
app.controller('ismCtrl', ['$scope', '$http', '$filter', '$window', '$timeout', '$q'
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
        /*var date=new Date();
        var week = getWeekNumber(date);
        var fullYear=date.getFullYear();
        for(var i=0;i<10;i++){
            $scope.listYear.push(fullYear);
            fullYear--;
        }*/
        var newDate = new Date();
        $scope.newDate = newDate.getFullYear();
        var chartTask_created = {name: "Đã tạo", number: 0, percent: 0};
        var chartTask_assigned = {name: "Đã giao", number: 0, percent: 0};
        var chartTask_processing = {name: "Đang thực hiện", number: 0, percent: 0};
        var chartTask_nearDeadline = {name: "Gần đến hạn", number: 0, percent: 0};
        var chartTask_outOfDate = {name: "Quá hạn", number: 0, percent: 0};
        var chartTask_completed = {name: "Hoàn thành", number: 0, percent: 0};
        $scope.dataChartTasks = {
            created: chartTask_created, assigned: chartTask_assigned, processing: chartTask_processing, nearDeadline: chartTask_nearDeadline, outOfDate: chartTask_outOfDate,
            completed: chartTask_completed
        };


        //lấy danh sách phát hiện báo tin
        $http.get(preUrl + "/statistic/detected-news/api-statistic", {
            params: {
                detectFormId: $scope.searchCondition.detectFormId,
                title: $scope.searchCondition.title,
                status: $scope.searchCondition.status,
                dateSentFrom: $scope.searchCondition.dateSentFrom,
                dateSentTo: $scope.searchCondition.dateSentTo
            }
        })
            .then(function (response) {
                if (response != null && response !== 'undefined' && response.status === 200) {
                    $scope.page = response.data;
                    $scope.page.pageCount = getPageCount($scope.page);
                    $scope.page.pageList = getPageList($scope.page);
                }

            });

        //lấy danh sách lệnh tin
        $http.get(preUrl + "/statistic/tasks/api-statistic", {
            params: {
                detectFormId: $scope.searchCondition.detectFormId,
                title: $scope.searchCondition.title,
                status: $scope.searchCondition.status,
                dateSentFrom: $scope.searchCondition.dateSentFrom,
                dateSentTo: $scope.searchCondition.dateSentTo
            }
        })
            .then(function (response) {
                if (response != null && response !== 'undefined' && response.status === 200) {
                    $scope.page = response.data;
                    $scope.page.pageCount = getPageCount($scope.page);
                    $scope.page.pageList = getPageList($scope.page);
                }

            });


//Hiển thị dữ liệu ra biểu đồ tỷ lệ và số lượng bài viết theo hình thức
        function canvasTasksChart(data) {
            // Build the chart
            Highcharts.chart('chartDivTasks', {
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
                    data: [
                        {
                            name: data.created.name + ':' + data.created.number + ' Lệnh tin đã tạo',
                            y: data.created.percent
                        },
                        {
                            name: data.assigned.name + ':' + data.assigned.number + ' Lệnh tin đã giao',
                            y: data.assigned.percent
                        }, {
                            name: data.processing.name + ':' + data.processing.number + ' Lệnh tin đang thực hiện',
                            y: data.processing.percent
                        }, {
                            name: data.nearDeadline.name + ':' + data.nearDeadline.number + ' Lệnh tin gần đến hạn',
                            y: data.nearDeadline.percent
                        }, {
                            name: data.outOfDate.name + ':' + data.outOfDate.number + ' Lệnh tin quá hạn',
                            y: data.outOfDate.percent
                        }, {
                            name: data.completed.name + ':' + data.completed.number + ' Lệnh tin hoàn thành',
                            y: data.completed.percent
                        }]
                }]
            });
        }


    }]);