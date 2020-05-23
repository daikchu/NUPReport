<%@ page isELIgnored="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<header class="bg-banner header navbar navbar-fixed-top-xs" style="height: 60px/*;background-color: #0C428B*/">

    <div class="navbar-header" style="max-height: 50px; overflow: hidden;">

        <a class="btn btn-link visible-xs" data-toggle="class:nav-off-screen,open" data-target="#nav,html">
            <i class="fa fa-bars"></i>
        </a>
        <a href="<%=request.getContextPath()%>/" class="navbar-brand" id="name-project" data-toggle="fullscreen1111" style="color: white/*;font-size: 15px;*/">
            <%--<img id="logoISM" src="<%=request.getContextPath()%>/assets/static/images/polyclinics.png">--%>
            <span id="text-name-project-with-media-large">NUP Queue Management System</span>
            <span id="text-name-project-with-media-mobile">NUP Queue Management System</span>
        </a>
        <a class="btn btn-link visible-xs" data-toggle="dropdown" data-target=".nav-user">
            <i class="fa fa-cog"></i>
        </a>
    </div>

    <%--<ul class="nav navbar-nav navbar-right hidden-xs nav-user" >
        <li class="hidden-xs">
            <a href="#" class="dropdown-toggle &lt;%&ndash;dk&ndash;%&gt;" data-toggle="dropdown">
                Trợ giúp
            </a>
            <section class="dropdown-menu aside-xl">
                <section class="panel bg-white">
                    <header class="panel-heading b-light bg-light">
                        <strong>Chọn tài liệu</strong>
                    </header>
                    <div class=" list-group-alt animated fadeInRight">
                        <a href="<%=request.getContextPath()%>/share/huong_dan/25.12.2019_TailieuHDSD_QuanlythongtinMXH.pdf" class="media list-group-item">
                              <span class="pull-left thumb-sm">
                                 <i class="fa fa-book fa-3x"></i>
                              </span>
                            <span class="media-body block m-b-none">
                                Tài liệu HDSD
                              </span>
                        </a>
                    </div>
                </section>
            </section>
        </li>

        <li class="dropdown" style="margin-right:14px;">
            <a href="#" class=" dropdown-toggle "  data-toggle="dropdown" > &lt;%&ndash;<span class="thumb-sm avatar pull-left"> <img src="${imageUserLogin}" &lt;%&ndash;src="<%=request.getContextPath()%>/assets/note/images/user.png"&ndash;%&gt;> </span>&ndash;%&gt;  <sec:authentication property="principal.fullName" /> <b class="caret"></b> </a>
            <ul class="dropdown-menu animated fadeInRight "><span class="arrow top"></span>
               &lt;%&ndash; <li><a href="#">Profile</a></li>&ndash;%&gt;
                &lt;%&ndash;<li ><a href="<%=request.getContextPath()%>/system/user/user-info">Thông tin cá nhân</a></li>&ndash;%&gt;
                <li ><a href="<%=request.getContextPath()%>/system/user/change-my-pass">Đổi mật khẩu</a></li>
                <li class="divider"></li>
                <li><a href="<%=request.getContextPath()%>/j_spring_security_logout">Đăng xuất</a></li>
            </ul>
        </li>

    </ul>--%>
</header>


