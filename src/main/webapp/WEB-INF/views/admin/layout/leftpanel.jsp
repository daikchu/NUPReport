    <%@ page isELIgnored="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
        <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
        <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
            <%!
    public boolean isActive(String navPath,HttpServletRequest request) {
        String namespace = (String)request.getAttribute("javax.servlet.forward.request_uri");
        return namespace.startsWith(navPath);
    };
    public boolean isActiveIndex(String navPath,HttpServletRequest request){
        String namespace = (String)request.getAttribute("javax.servlet.forward.request_uri");
        return namespace.equals(navPath);
    }
    public boolean isNavXs(HttpServletRequest request){
        if(request.getSession().getAttribute("nav-xs")!=null){
            Boolean thugon=(Boolean) request.getSession().getAttribute("nav-xs");
            return thugon.equals(true);
        }
        return false;
    }
//    public boolean isSun(HttpServletRequest request){
//        if(request.getSession().getAttribute("sun-moon")!=null){
//            Boolean sun=(Boolean) request.getSession().getAttribute("sun-moon");
//            return sun;
//        }
//        return false;
//    }
%>
        <%--<aside class="bg-light lter b-r aside-md hidden-print" id="nav">--%>
        <aside class="<%--bg-left-menu--%> bg-light lter b-r aside-md hidden-print hidden-xs<%= isNavXs(request) ? "nav-xs" : "" %>" id="nav">
        <section class="vbox">
        <section class="w-f scrollable">
        <div class="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="5px"
        data-color="#333333">
        <nav class="nav-primary hidden-xs">
        <ul class="nav">

        <%--<sec:authorize access="hasAnyRole('ROLE_SOCIAL_REPORT','ROLE_SOCIAL_INFORMATIONAL_TOPICS')">--%>
            <%--<li class="<%= isActive(request.getContextPath()+"/social",request) ? "active" : "" %>"><a href="#"
            class="a_leftMenu"> <i class="fa fa-file-text icon"> <b class="bg-primary"></b> </i> <span class="pull-right"> <i
            class="fa fa-angle-down text"></i> <i class="fa fa-angle-up text-active"></i> </span> <span>Quản lý mạng xã hội</span> </a>
            <ul class="nav lt">

            &lt;%&ndash;<sec:authorize access="hasRole('ROLE_SOCIAL_REPORT')">&ndash;%&gt;
                <li class="<%= isActive(request.getContextPath()+"/social/social-dashboard",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/social/social-dashboard" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>Trang chủ</span> </a></li>
            &lt;%&ndash;</sec:authorize>&ndash;%&gt;

            </ul>
            </li>--%>
        <%--</sec:authorize>--%>

        <sec:authorize access="hasAnyRole('ROLE_STATISTIC_TASK_VIEW','ROLE_STATISTIC_DETECTED_VIEW')">
            <%--<li class="<%= isActive(request.getContextPath()+"/statistic",request) ? "active" : "" %>"><a href="#"
            class="a_leftMenu"> <i class="fa fa-file-text icon"> <b class="bg-primary"></b> </i> <span class="pull-right"> <i
            class="fa fa-angle-down text"></i> <i class="fa fa-angle-up text-active"></i> </span> <span>Báo cáo thống
            kê</span> </a>
            <ul class="nav lt">
            <sec:authorize access="hasRole('ROLE_STATISTIC_TASK_VIEW')">
                <li class="<%= isActive(request.getContextPath()+"/statistic/task",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/statistic/task/list" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>Thống kê lệnh tin</span> </a></li>
            </sec:authorize>
            <sec:authorize access="hasRole('ROLE_STATISTIC_DETECTED_VIEW')">
                <li class="<%= isActive(request.getContextPath()+"/statistic/detected-news",request) ? "active" : "" %>
                "><a
                href="<%=request.getContextPath()%>/statistic/detected-news/list" class="a_leftMenu"> <i class="fa
                fa-angle-right"></i>
                <span>Thống kê phát hiện báo tin</span> </a></li>
            </sec:authorize>
            </ul>
            </li>--%>

        </sec:authorize>

            <li class="<%= isActive(request.getContextPath()+"/report",request) ? "active" : "" %>"><a href="#"
            class="a_leftMenu"> <i class="fa fa-file-text icon"> <b class="bg-primary"></b> </i> <span class="pull-right"> <i
            class="fa fa-angle-down text"></i> <i class="fa fa-angle-up text-active"></i> </span> <span>REPORT</span> </a>
            <ul class="nav lt">
                <li class="<%= isActive(request.getContextPath()+"/report/DailyCollectionByPolyclinic",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/report/DailyCollectionByPolyclinic" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>Daily Collection by Polyclinic Report</span> </a></li>

                <li class="<%= isActive(request.getContextPath()+"/report/DailyCollectionByKiosks",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/report/DailyCollectionByKiosks" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>Daily Collection by Kiosks Report</span> </a></li>

                <li class="<%= isActive(request.getContextPath()+"/report/TransactionErrorReport",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/report/TransactionErrorReport" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>Transaction Error Report</span> </a></li>

                <li class="<%= isActive(request.getContextPath()+"/report/PatientTransactionReport",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/report/PatientTransactionReport" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>Patient Transaction Report</span> </a></li>

                <li class="<%= isActive(request.getContextPath()+"/report/SPKAuditTrail",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/report/SPKAuditTrail" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>SPK – Audit Trail</span> </a></li>

                <li class="<%= isActive(request.getContextPath()+"/report/SPKCash",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/report/SPKCash" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>SPK – Cash</span> </a></li>

                <li class="<%= isActive(request.getContextPath()+"/report/CashEventSummary",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/report/CashEventSummary" class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>Cash Event Summary</span> </a></li>

                <li class="<%= isActive(request.getContextPath()+"/report/CashCompartment ",request) ? "active" : "" %>"><a
                href="<%=request.getContextPath()%>/report/CashCompartment " class="a_leftMenu"> <i class="fa fa-angle-right"></i>
                <span>Cash Compartment </span> </a></li>
            </ul>
            </li>




        <%--<li class="<%= isActive(request.getContextPath()+"/history",request) ? "active" : "" %>"><a
        href="<%=request.getContextPath()%>/history" class="a_leftMenu">
        <i class="fa fa-clock-o icon">
        <b class="bg-danger dker"></b>
        </i><span>Lịch sử của tôi</span></a>
        </li>--%>

        </ul>
        </nav>
        </div>
        </section>
        <%--<footer class="footer lt hidden-xs b-light">--%>
        <footer class="footer lt hidden-xs b-t bg-left-menu lter <%--b-dark-blue--%>" >
        <%--<a href="#nav" data-toggle="class:nav-xs" class="pull-right btn btn-sm btn-default btn-icon">--%>
        <%--<i class="fa fa-angle-left text"></i><i class="fa fa-angle-right text-active"></i>--%>
        <%--</a>--%>
        <a href="#nav" id="changeNavXS" data-toggle="class:nav-xs" class="pull-right btn btn-smbtn-dark btn-icon btn-left-hideMenu">
        <i class="fa fa-angle-left text"></i>
        <i class="fa fa-angle-right text-active"></i>
        </a>
        </footer>

        </section>
        </aside>

        <script type="text/javascript">
        $(document).ready(function() {
        $('#changeNavXS').click(function (){
        $.ajax({
        type: "get",
        url: "<%=request.getContextPath()%>/change-nav",
        success: function(msg){
        }
        });
        });

        });
        </script>