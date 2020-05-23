<%--
  Created by IntelliJ IDEA.
  User: ADMIN
  Date: 5/11/2020
  Time: 11:49 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page isELIgnored="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<script src="<%=request.getContextPath()%>/assets/project/admin/report/DailyCollectionByKiosks.js"></script>
<section id="content" ng-app="ospism" ng-controller="DailyCollectionByKiosksController">
    <section class="vbox">
        <section class="scrollable padder">
            <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
                <li><a href="<%=request.getContextPath()%>/"><i class="fa fa-home"></i>&nbsp;Home</a></li>
                <li><a href="<%=request.getContextPath()%>/statistic/task/list">Report</a></li>
                <li><a href="<%=request.getContextPath()%>/statistic/task/list">Daily Collection by Kiosks Report</a></li>
                <%--<li><a href="javascript:void(0)">Danh sách</a></li>--%>
            </ul>
            <div class="m-b-md"><h3 class="m-b-none" id="sansim-status" style="color: #009900"><c:if
                    test="${success.length()>0}">${success}</c:if></h3>
            </div>

            <section class="panel panel-default">
                <header class="panel-heading"><i class="fa fa-caret-square-o-right"></i> Daily Collection by Kiosks Report</header>
                <div class="text-sm wrapper bg-light lt">
                    <form cssClass="form-inline padder" action="list" role="form" theme="simple">
                        <div class="form-group">

                            <div class="row" style="margin-top:10px;">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <label class="control-label text-dark">Date</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input id="dateFrom" ng-model="searchCondition.dateFrom" autocomplete="off"
                                               class="datepicker-input form-control" size="16"
                                               placeholder="yyyy-mm-dd" type="text"
                                               data-date-format="yyyy-mm-dd">

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <label class="control-label text-dark">to</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input id="dateTo"  ng-model="searchCondition.dateTo" autocomplete="off"
                                               class="datepicker-input form-control" size="16"
                                               placeholder="yyyy-mm-dd" type="text"
                                               data-date-format="yyyy-mm-dd">

                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <label class="control-label text-dark">Polyclinic</label>
                                    </div>
                                    <div class="col-md-8">
                                        <select class="form-control select2"
                                                ng-model="searchCondition.polyclinic">
                                            <option value="">--All--</option>
                                            <option ng-repeat="item in polyclinics" value = "{{item.institutionCodeName}}">{{item.institutionName}}</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <label class="control-label text-dark">Kiosk ID</label>
                                    </div>
                                    <div class="col-md-8">
                                        <select class="form-control select2"
                                                ng-model="searchCondition.kioskId">
                                            <option value="">--All--</option>
                                            <option ng-repeat="item in terminals" value = "{{item.terminalName}}">{{item.terminalName}}</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <label class="control-label text-dark">Terminal ID</label>
                                    </div>
                                    <div class="col-md-8">
                                        <select class="form-control select2"
                                                ng-model="searchCondition.terminalId">
                                            <option value="">--All--</option>
                                            <option ng-repeat="item in terminals" value = "{{item.netTerminalName}}" ng-show="item.netTerminalName!=null">{{item.netTerminalName}}</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div class="row" style="padding-top: 30px">
                                <div class="col-lg-12 text-center">

                                    <button type="button"
                                            class="btn btn-info btn-s-sm" ng-click="search();">
                                        <i class="fa fa-search"></i> GENERATE
                                    </button>

                                    <button ng-click="export();" style="margin-left: 10px" type="button"
                                            class="btn btn-success">
                                        <i class="fa fa-file-excel-o"></i> CSV
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div class="line line-dashed line-lg pull-in" style="clear:both ;border-top:0px"></div>

                    </form>
                </div>

                <div ng-switch on="page.rowCount" class="table-responsive table-overflow-x-fix">
                    <table class="table table-striped table-bordered m-b-none text-sm">
                        <thead>
                            <tr>
                                <th class="box-shadow-inner small_col text-center">#</th>
                                <th class="box-shadow-inner small_col text-center">Polyclinic</th>
                                <th class="box-shadow-inner small_col text-center">Kiosk ID</th>
                                <th class="box-shadow-inner small_col text-center">NET Terminal ID</th>
                                <%--<th class="box-shadow-inner small_col text-center">EX-Link Terminal ID</th>--%>
                                <th class="box-shadow-inner small_col text-center">NETS Debit ($)</th>
                                <th class="box-shadow-inner small_col text-center">NETS CC & FT ($)</th>
                                <th class="box-shadow-inner small_col text-center">NETS CDA ($)</th>
                                <th class="box-shadow-inner small_col text-center">EZ - Link ($)</th>
                                <th class="box-shadow-inner small_col text-center">Credit Card ($)</th>
                                <th class="box-shadow-inner small_col text-center">Cash ($)</th>
                                <th class="box-shadow-inner small_col text-center">Total Collection ($)</th>
                                <th class="box-shadow-inner small_col text-center">NETS Debit (Count)</th>
                                <th class="box-shadow-inner small_col text-center">NETS CC & FT (Count)</th>
                                <th class="box-shadow-inner small_col text-center">EZ - Link (Count)</th>
                                <th class="box-shadow-inner small_col text-center">Credit Card (Count)</th>
                                <th class="box-shadow-inner small_col text-center">Cash (Count)</th>
                                <th class="box-shadow-inner small_col text-center">Total(Count)</th>
                            </tr>

                             <tr ng-switch-when="0">
                                 <td colspan="17"
                                     style="height: 100%;background-color: #ececec; line-height: 5.429;text-align: center;font-size: 250%">
                                     Không có dữ liệu
                                 </td>
                             </tr>

                        </thead>
                        <tbody>
                            <tr ng-switch-default ng-repeat="item in page.items track by $index">
                                <td class="align-center truong-text-verticel">{{(page.pageNumber-1)*page.numberPerPage + $index+1}}</td>
                                <td class="align-center truong-text-verticel">{{item.polyclinic}}</td>
                                <td class="align-center truong-text-verticel">{{item.kioskId}}</td>
                                <td class="align-center truong-text-verticel">{{item.netTerminalId}}</td>
                                <td class="align-center truong-text-verticel">{{item.netsDebit}}</td>
                                <td class="align-center truong-text-verticel">{{item.netsCC}}</td>
                                <td class="align-center truong-text-verticel">{{item.netsCDA}}</td>
                                <td class="align-center truong-text-verticel">Khong co mo ta</td>
                                <td class="align-center truong-text-verticel">{{item.creditCard}}</td>
                                <td class="align-center truong-text-verticel">{{item.cash}}</td>
                                <td class="align-center truong-text-verticel">{{item.totalCollection}}</td>
                                <td class="align-center truong-text-verticel">{{item.netsDebitCount}}</td>
                                <td class="align-center truong-text-verticel">{{item.netsCCCount}}</td>
                                <td class="align-center truong-text-verticel">{{item.ezLinkCount}}</td>
                                <td class="align-center truong-text-verticel">{{item.creditCardCount}}</td>
                                <td class="align-center truong-text-verticel">{{item.cashCount}}</td>
                                <td class="align-center truong-text-verticel">{{item.totalCount}}</td>

                            </tr>

                        </tbody>
                    </table>


                    <footer ng-switch-default class="panel-footer">
                        <div class="row">
                            <div class="col-sm-12 text-right text-center-xs">
                                <div class="col-sm-6 text-left">
                                    <span>Tổng số <code>{{page.rowCount}}</code> dữ liệu</span>
                                </div>
                                <div class="col-sm-6">
                                    <ul class="pagination pagination-sm m-t-none m-b-none">
                                        <li ng-if="page.pageNumber>1"><a href="javascript:void(0)"
                                                                         ng-click="loadPage(1)">«</a></li>
                                        <li ng-repeat="item in page.pageList">
                                            <a href="javascript:void(0)" ng-if="item==page.pageNumber"
                                               style="color:mediumvioletred;"> {{item}}</a>
                                            <a href="javascript:void(0)" ng-if="item!=page.pageNumber"
                                               ng-click="loadPage(item)"> {{item}}</a>
                                        </li>
                                        <li ng-if="page.pageNumber<page.pageCount"><a href="javascript:void(0)"
                                                                                      ng-click="loadPage(page.pageCount)">»</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </footer>


                </div>

            </section>
        </section>
    </section>
    <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="#nav"></a>
</section>

<script>
    $(document).ready(function () {

        $('#tblUser').dataTable({
            "bFilter": false,
            "bPaginate": false,
            "bAutoWidth": false,
            "sPaginationType": "full_numbers"
        });

    });
</script>


