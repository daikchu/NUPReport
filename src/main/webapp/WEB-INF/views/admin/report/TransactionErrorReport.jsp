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
<script src="<%=request.getContextPath()%>/assets/project/admin/report/TransactionErrorReport.js"></script>
<section id="content" ng-app="ospism" ng-controller="TransactionErrorReportController">
    <section class="vbox">
        <section class="scrollable padder">
            <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
                <li><a href="<%=request.getContextPath()%>/"><i class="fa fa-home"></i>&nbsp;Home</a></li>
                <li><a href="<%=request.getContextPath()%>/statistic/task/list">Report</a></li>
                <li><a href="<%=request.getContextPath()%>/statistic/task/list">Transaction Error Report</a></li>
                <%--<li><a href="javascript:void(0)">Danh sách</a></li>--%>
            </ul>
            <div class="m-b-md"><h3 class="m-b-none" id="sansim-status" style="color: #009900"><c:if
                    test="${success.length()>0}">${success}</c:if></h3>
            </div>

            <section class="panel panel-default">
                <header class="panel-heading"><i class="fa fa-caret-square-o-right"></i> Transaction Error Report</header>
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
                                <th class="box-shadow-inner small_col text-center">No.</th>
                                <th class="box-shadow-inner small_col text-center">Date/Time</th>
                                <th class="box-shadow-inner small_col text-center">Polyclinic</th>
                                <th class="box-shadow-inner small_col text-center">Kiosk ID</th>
                                <th class="box-shadow-inner small_col text-center">SPK Ref No.</th>
                                <th class="box-shadow-inner small_col text-center">Patient MRN</th>
                                <th class="box-shadow-inner small_col text-center">Patient Name</th>
                                <th class="box-shadow-inner small_col text-center">Contact Name</th>
                                <th class="box-shadow-inner small_col text-center">Contact No.</th>
                                <th class="box-shadow-inner small_col text-center">Payment Mode</th>
                                <th class="box-shadow-inner small_col text-center">Terminal ID</th>
                                <th class="box-shadow-inner small_col text-center">Transaction Ref. No.</th>
                                <th class="box-shadow-inner small_col text-center">Bill Number & Amount</th>
                                <th class="box-shadow-inner small_col text-center">No. of Deduction</th>
                                <th class="box-shadow-inner small_col text-center">EPOS Error Code</th>
                                <th class="box-shadow-inner small_col text-center">EPOS Error Reason</th>
                            </tr>

                             <tr ng-switch-when="0">
                                 <td colspan="16"
                                     style="height: 100%;background-color: #ececec; line-height: 5.429;text-align: center;font-size: 250%">
                                     Không có dữ liệu
                                 </td>
                             </tr>

                        </thead>
                        <tbody>
                            <tr ng-switch-default ng-repeat="item in page.items track by $index">
                                <td class="align-center truong-text-verticel">{{(page.pageNumber-1)*page.numberPerPage + $index+1}}</td>
                                <td class="align-center truong-text-verticel">{{item.datetime | date:'dd-MM-yyyy hh:mm a' }}</td>
                                <td class="align-center truong-text-verticel">{{item.polyclinic}}</td>
                                <td class="align-center truong-text-verticel">{{item.kioskid}}</td>
                                <td class="align-center truong-text-verticel">{{item.spkrefno}}</td>
                                <td class="align-center truong-text-verticel">{{item.patientMRN}}</td>
                                <td class="align-center truong-text-verticel">{{item.patientName}}</td>
                                <td class="align-center truong-text-verticel">Chua biet</td>
                                <td class="align-center truong-text-verticel">Chua biet</td>
                                <td class="align-center truong-text-verticel">{{item.paymentMode}}</td>
                                <td class="align-center truong-text-verticel">{{item.terminalID}}</td>
                                <td class="align-center truong-text-verticel">{{item.netTransactionRefNo}}</td>
                                <td class="align-center truong-text-verticel">{{billnumberamount}}</td>
                                <td class="align-center truong-text-verticel">Chua biet</td>
                                <td class="align-center truong-text-verticel">{{item.errorCode}}</td>
                                <td class="align-center truong-text-verticel">{{item.errorReason}}</td>

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

