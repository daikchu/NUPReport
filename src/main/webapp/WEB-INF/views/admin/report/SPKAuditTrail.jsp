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
<script src="<%=request.getContextPath()%>/assets/project/admin/report/SPKAuditTrail.js"></script>
<section id="content" <%--ng-app="ospism" ng-controller="statisticListTaskController"--%>>
    <section class="vbox">
        <section class="scrollable padder">
            <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
                <li><a href="<%=request.getContextPath()%>/"><i class="fa fa-home"></i>&nbsp;Home</a></li>
                <li><a href="<%=request.getContextPath()%>/statistic/task/list">Report</a></li>
                <li><a href="<%=request.getContextPath()%>/statistic/task/list">Audit Trial</a></li>
                <li><a href="<%=request.getContextPath()%>/statistic/task/list">Extract Visit</a></li>
                <%--<li><a href="javascript:void(0)">Danh sách</a></li>--%>
            </ul>
            <div class="m-b-md"><h3 class="m-b-none" id="sansim-status" style="color: #009900"><c:if
                    test="${success.length()>0}">${success}</c:if></h3>
            </div>

            <section class="panel panel-default">
                <header class="panel-heading"><i class="fa fa-caret-square-o-right"></i> Patient Transaction Report</header>
                <div class="text-sm wrapper bg-light lt">
                    <form cssClass="form-inline padder" action="list" role="form" theme="simple">
                        <div class="form-group">

                            <div class="row" style="margin-top:10px;">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <input type="checkbox" id="visitDate"> <label class="control-label text-dark">Visit Date</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input id="fromDate_assignDate" <%--ng-model="searchCondition.assignDateFrom"--%> autocomplete="off"
                                               class="datepicker-input form-control" size="16"
                                               placeholder="dd/mm/yyyy"
                                               data-date-format="dd/mm/yyyy">

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <label class="control-label text-dark">to</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input id="toDate_assignDate"  <%--ng-model="searchCondition.assignDateTo"--%> autocomplete="off"
                                               class="datepicker-input form-control" size="16"
                                               placeholder="dd/mm/yyyy" type="text"
                                               data-date-format="dd/mm/yyyy">

                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <input type="checkbox" id="polyclinic"> <label class="control-label text-dark">Polyclinic</label>
                                    </div>
                                    <div class="col-md-8">
                                        <select class="form-control select2"
                                                ng-model="searchCondition.status">
                                            <option value="">--All--</option>
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <input type="checkbox" id="patientMRN"> <label class="control-label text-dark">Patient MRN</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" ng-model="searchCondition.patientMRN" class="form-control"
                                               value="">
                                    </div>

                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <input type="checkbox" id="spkRefNo"> <label class="control-label text-dark">SPK Ref No.</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" ng-model="searchCondition.spkRefNo" class="form-control"
                                               value="">
                                    </div>

                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <input type="checkbox" id="paymentMode"> <label class="control-label text-dark">Payment Mode</label>
                                    </div>
                                    <div class="col-md-8">
                                        <select class="form-control select2"
                                                ng-model="searchCondition.paymentMode">
                                            <option value="">--All--</option>
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <input type="checkbox" id="medisave"> <label class="control-label text-dark">Medisave</label>
                                    </div>
                                    <div class="col-md-8">
                                        <select class="form-control select2"
                                                ng-model="searchCondition.medisave">
                                            <option value="">--All--</option>
                                            </option>
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

                                    <%--<button ng-click="export();" style="margin-left: 10px" type="button"
                                            class="btn btn-success">
                                        <i class="fa fa-file-excel-o"></i> Export To Excel
                                    </button>--%>
                                </div>
                            </div>

                        </div>
                        <div class="line line-dashed line-lg pull-in" style="clear:both ;border-top:0px"></div>

                    </form>
                </div>

                <div <%--ng-switch on="page.rowCount"--%> class="table-responsive table-overflow-x-fix">
                    <table class="table table-striped table-bordered m-b-none text-sm">
                        <thead>
                            <tr>
                                <th class="box-shadow-inner small_col text-center">No.</th>
                                <th class="box-shadow-inner small_col text-center">Reference No.</th>
                                <th class="box-shadow-inner small_col text-center">Patient MRN</th>
                                <th class="box-shadow-inner small_col text-center">Date/Time of Scan</th>
                                <th class="box-shadow-inner small_col text-center">Screen Log</th>
                                <th class="box-shadow-inner small_col text-center">(S1) ePOS Bill Retrieval</th>
                                <th class="box-shadow-inner small_col text-center">(S2) Select Payment Mode</th>
                                <th class="box-shadow-inner small_col text-center">(S3) Prepare Payment</th>
                                <th class="box-shadow-inner small_col text-center">(S4) Payment Gateway Dedution</th>
                                <th class="box-shadow-inner small_col text-center">(S5) ePOS Bill Payment</th>
                                <th class="box-shadow-inner small_col text-center">(S6) Print Recept</th>
                            </tr>

                            <%-- <tr ng-switch-when="0">
                                 <td colspan="12"
                                     style="height: 100%;background-color: #ececec; line-height: 5.429;text-align: center;font-size: 250%">
                                     Không có dữ liệu
                                 </td>
                             </tr>--%>

                        </thead>
                        <tbody>
                            <tr <%--ng-switch-default ng-repeat="item in page.items track by $index"--%>>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>
                                <td class="align-center truong-text-verticel">NULL</td>

                            </tr>

                        </tbody>
                    </table>


                    <%--<footer ng-switch-default class="panel-footer">
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
                    </footer>--%>


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

