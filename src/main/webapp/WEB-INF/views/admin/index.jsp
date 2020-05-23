<%@ page isELIgnored="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<script src="<%=request.getContextPath()%>/assets/note/js/charts/sparkline/jquery.sparkline.min.js"
        cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/easypiechart/jquery.easy-pie-chart.js"
        cache="false"></script>

<script src="<%=request.getContextPath()%>/assets/js/charts/highcharts/highcharts.js" cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/js/charts/highcharts/highcharts-more.js" cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/js/charts/highcharts/exporting.js" cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/jquery.flot.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/jquery.flot.tooltip.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/jquery.flot.resize.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/jquery.flot.grow.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/demo.js"></script>

<script>
    var contextPath = '<%=request.getContextPath()%>';
</script>
<script src="<%=request.getContextPath()%>/assets/project/admin/index/index.js"></script>
<section id="content" ng-app="ospism" ng-controller="ismCtrl">
    <section class="vbox">
        <section class="scrollable padder">
            <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
                <li><a href="<%=request.getContextPath()%>/"><i class="fa fa-home"></i>&nbsp;Dashboard</a></li>
            </ul>
            <%--            <div class="m-b-md"><h3 class="m-b-none">ISM</h3>
                            <small><span class="text-success"><sec:authentication property="principal.fullName"/></span>, mừng bạn
                                trở lại.
                            </small>
                        </div>--%>

            <%--<section class="panel panel-default pos-rlt clearfix">
                <header class=" panel-heading font-bold">
                    <div>Tìm kiếm</div>
                </header>

                <div class="row m-l-none m-r-none bg-light lter">
                    <div class="col-md-6">
                        <label class="control-label">Từ khóa</label>
                        <input style="width: 100%" name="fullName" placeholder="Từ khóa muốn tìm"
                               value="hungnn@freelauncer.com.vn"
                               class="form-control"/>

                    </div>
                    <div class="col-md-4">
                        <label class="control-label">Thời gian</label>
                        <select class="form-control select2" style="width: 100%">
                            <option value="">01/10/2019 - 03/10/2019</option>
                            <option value="0">1 tuần</option>
                        </select>
                        &lt;%&ndash;  <input name="fullName" placeholder="Chọn thời gian" value="01/10/2019 - 03/10/2019"
                                 class="form-control"/>&ndash;%&gt;
                    </div>
                    <div class="col-md-2">
                        <label class="control-label">Tìm kiếm nâng cao</label>
                        <div class="input-group m-b" style="width: 100%">

                            <a class="btn btn-info btn-sm pull-right" ng-click="search()" style="width: 100%;"><i
                                    class="fa fa-search"></i> Tìm kiếm</a>
                        </div>

                    </div>
                </div>
            </section>--%>



            <div class="row">
                <div class="col-md-12">
                    <section class="panel panel-default">
                        <header class="panel-heading font-bold">
                            <div>THỐNG KÊ NĂM {{newDate}}</div>
                        </header>

                        <div class="panel-body background-white b-a" style="min-height: 600px;">
                            <div class="col-md-6 chart-col-4" style="height: 200px;">
                                <div id="chartDivTasks" style="height: 200%;"></div>
                                <div style="    margin-top: 15px;     text-align: center; ">
                                    <span style="    font-size: 18px !important; " >Thống kê số lượng lệnh tin</span>
                                </div>
                            </div>
                            <div class="col-md-6 chart-col-4" style="height: 200px;">
                                <div id="chartDivDetectNews" style="height: 200%;"></div>
                                <div style="    margin-top: 15px;     text-align: center; ">
                                    <span style="    font-size: 18px !important; " >Thống kê số lượng phát hiện báo tin</span>
                                </div>
                            </div>
                        </div>

                    </section>


                </div>

            </div>


        </section>
    </section>


    <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="#nav"></a>
</section>

<!-- Bootstrap --> <!-- App -->
<script src="<%=request.getContextPath()%>/assets/js/jquery-3.1.1.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/sparkline/jquery.sparkline.min.js"
        cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/easypiechart/jquery.easy-pie-chart.js"
        cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/js/highcharts/highcharts.js" cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/js/highcharts/highcharts-more.js" cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/js/highcharts/modules/exporting.js" cache="false"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/jquery.flot.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/jquery.flot.tooltip.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/jquery.flot.resize.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/jquery.flot.grow.js"></script>
<%--<script src="<%=request.getContextPath()%>/assets/note/js/charts/flot/demo.js"></script>--%>

<%--<script src="<%=request.getContextPath()%>/assets/project/index/demo.js"></script>--%>

<%--Cho bieu do` tron`--%>
<script src="<%=request.getContextPath()%>/assets/vendors/Chart.js/dist/Chart.min.js"></script>
<%--<script src="<%=request.getContextPath()%>/assets/project/index/bieudotron.js"></script>--%>
<script>
    function toggler(divId) {
        $("#" + divId).toggle();
    }

    //giup cai mui ten doi chieu khi click
    $(document).on('click', '.chitieu', function (e) {
        e && e.preventDefault();
        var $this = $(e.target), $target;
        if (!$this.is('a')) $this = $this.closest('a');
        $target = $this.closest('.panel');
        $this.toggleClass('active');
    });
</script>

<%--bieu do so luong bai viet theo thoi gian--%>
<script>
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
            categories: ['01/10 18:00', '01:10 19:00', '01:10 20:00', '01:10 21:00', '01:10 22:00']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Số lượng bài viết'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'number' /*stacking is number, percent*/
            }
        },
        series: [{
            name: 'Album',
            data: [2000, 3000, 5000, 7000, 7500]
        }, {
            name: 'Event',
            data: [1000, 3500, 4500, 6000, 6500]
        }, {
            name: 'Link',
            data: [1500, 2000, 4000, 5000, 7000]
        }]
    });
</script>

<%--bieu do luon thich va chia se theo thoi gian--%>
<script>
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
</script>

<%--bieu do so luong luot thich va chia se--%>
<script>
    Highcharts.chart('postNuancesChart', {
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
</script>

<%--<script>
    // Radialize the colors
    Highcharts.setOptions({
        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        })
    });

    // Build the chart
    Highcharts.chart('rateAndNumberOfPosts', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Share',
            data: [
                { name: 'Chrome', y: 61.41 },
                { name: 'Internet Explorer', y: 11.84 },
                { name: 'Firefox', y: 10.85 },
                { name: 'Edge', y: 4.67 },
                { name: 'Safari', y: 4.18 },
                { name: 'Other', y: 7.05 }
            ]
        }]
    });
</script>--%>

<%--bieu do ti le va so luong bai viet theo hinh thuc--%>
<script>
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
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Other',
                y: 7.05
            }]
        }]
    });
</script>

