<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="en" style="background-color: transparent; min-height: 100%"
      class="<%--bg-dark--%> js no-touch no-android chrome no-firefox no-iemobile no-ie no-ie10 no-ie11 no-ios no-ios7 ipad">
<head>
    <meta charset="utf-8"/>
    <title>Hệ thống quản lý thông tin mạng xã hội TP Đà Nẵng</title>
    <meta name="description" content="quản lý tình hình thông tin mạng xã hội trên địa bàn thành phố Đà Nẵng"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <link rel="shortcut icon" type="image/x-icon" href="<%=request.getContextPath()%>/assets/note/images/logo.ico"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/note/css/bootstrap.css" type="text/css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/note/css/animate.css" type="text/css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/note/css/font-awesome.min.css" type="text/css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/note/css/font.css" type="text/css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/note/css/app.css" type="text/css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/note/css/style.css" type="text/css"/>
    <!--[if lt IE 9]>
    <script src="<%=request.getContextPath()%>/assets/note/js/ie/html5shiv.js"></script>
    <script src="<%=request.getContextPath()%>/assets/note/js/ie/respond.min.js"></script>
    <script src="<%=request.getContextPath()%>/assets/note/js/ie/excanvas.js"></script>
    <![endif]-->
</head>
<body class="">
<style>

    body {
        background-image: url(<%=request.getContextPath()%>/assets/note/images/background-login.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        background-position: center center;
        background-color: #464646;
    }

    .navbar-brand img {
        max-height: 50px;
    }

    .errorss {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
    }
</style>
<section id="content"
         class="m-t-lg animated fadeInUp">
    <div class="container aside-xxl" <%--style="margin-left: 37%;"--%>>
        <%--<a class="navbar-brand block" href="index.html"><img src="#" class="img-rounded"></a>--%>
        <section class="panel panel-default bg-white <%--m-t-lg--%>" style="border-radius: 15px; /*height: 827px; width: 550px;*/">
            <header class="panel-heading text-center"
                    style="margin-top: 8px; color: #07A6D6; background-color: transparent !important; font-size: 27px;">
                <i class="fa fa-home" style="font-size: 37px"></i><strong> ĐĂNG NHẬP HỆ THỐNG</strong>
            </header>
            <div></div>
            <img id="logo_login" src="<%=request.getContextPath()%>/assets/note/images/logo.png">

            <div class="panel-body wrapper-lg">
                <form action="<c:url value='/j_spring_security_check'/>" method="post"
                      class="form-group " style="font-size: 20px">
                    <c:if test="${not empty error}">
                        <div class="errorss">
                            <c:if test="${error==1}">
                                Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!
                            </c:if>
                            <c:if test="${error==0}">
                                Tài khoản đang bị tạm khóa!
                            </c:if>
                        </div>
                    </c:if>
                    <div class="form-group">
                        <label class="control-label" style="font-weight: bold;">Tên đăng nhập</label>
                        <div class="input-group m-b">
                        <span class="input-group-addon" style="font-size: 20px !important;">
                            <i class="fa fa-users icon-login"></i>
                        </span>
                            <input id="username" name="username" placeholder="Username" class="form-control input-lg">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label" style="font-weight: bold;">Mật khẩu</label>
                        <div class="input-group m-b">
                        <span class="input-group-addon" style="font-size: 20px !important;">
                            <i class="fa fa-lock icon-login"></i>
                        </span>
                            <input type="password" id="password" name="password"
                                   placeholder="Password"
                                   class="form-control input-lg">
                        </div>

                    </div>
                    <div class="col-md-12">
                        <%--<div class="col-lg-8"></div>
                        <div class="col-lg-4">--%>
                            <a href="<%=request.getContextPath()%>/forgot-password"
                               class="pull-right<%-- m-t-xs--%>" <%--data-toggle="modal" data-target="#myModal"--%>
                               style="color: #717171; /*padding-right: 0px; margin-bottom: 23px;*/ font-style: italic;">
                                <i class="fa fa-info-circle"></i>
                                <small> Quên mật khẩu?</small>
                            </a>
                        <%--</div>--%>

                    </div>

                    <div class="col-md-12">
                        <button type="submit" class="btn btn-info <%--btn-rounded--%> button-login center-block" style="background-color: #07A6D6">ĐĂNG
                            NHẬP
                        </button>
                    </div>

                </form>
                <%--<div class="reg-support" style="">
                    <div class="support-left">
                        <strong style="text-transform:uppercase">Hỗ trợ kỹ thuật</strong>
                        <p style="color:black;"><i class="fa fa-google-plus-square"></i> <a
                                href="mailto:cuctrogiupphaply@gmail.com" class="fonta">ctgpl@moj.gov.vn</a></p>
                        <p style="color:black;"><i class="fa fa-phone"></i> <a
                                href="tel:support@viettel.com.vn" class="fonta">024.62739716</a></p>
                        <p style="color:black;"><i class="fa fa-phone"></i> <a class="fonta"
                                                                               href="https://ultraviewer.net/vi/download.html"
                                                                               target="_blank">UltraViewer</a>
                        </p>
                    </div>
                    <div class="support-right">
                        <strong style="text-transform:uppercase">Hỗ trợ nghiệp vụ</strong>
                        <p style="color:black;"><i class="fa fa-file"></i> <a class="fonta"
                                                                              href="http://tgpl.osp.vn/share/huongdan/TailieuHDSD_Tochuc_TGPL.docx">Tài
                            liệu</a></p>


                        <p style="color:black;"><i class="fa fa-phone"></i> <a class="fonta"
                                                                               href="tel:support@viettel.com.vn">(024)
                            32321529</a></p>

                        <p style="color:black;"><i class="fa fa-phone"></i> <a class="fonta"
                                                                               href="tel:support@viettel.com.vn">(024)
                            32321529</a></p>

                    </div>
                </div>--%>
            </div>
        </section>
    </div>
</section>
<%--<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <section class="panel panel-default">
            <header class="panel-heading font-bold">Tìm lại mật khẩu</header>
            <div class="panel-body">
                <form class="bs-example form-horizontal">
                    <div class="form-horizontal txt-16">
                        Để lấy lại mật khẩu, vui lòng dùng số điện thoại bạn đã đăng ký tài khoản soạn R gửi tới đầu số 8055(1,000 Vnđ/SMS). Xin cảm ơn!
                    </div>
                    <div class="form-horizontal txt-16">

                    </div>
                    <div class="text-right">
                        <button type="button" class="btn btn-s-md btn-primary" data-dismiss="modal">Đóng</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</div>--%>
<!-- footer -->
<%--<footer id="footer">
    <div class="text-center padder">
        <p>
            <small>ISM &copy; 2019</small>
        </p>
    </div>
</footer>--%>
<!-- / footer -->
<script src="<%=request.getContextPath()%>/assets/note/js/jquery.min.js"></script>
<!-- Bootstrap -->
<script src="<%=request.getContextPath()%>/assets/note/js/bootstrap.js"></script>
<!-- App -->
<script src="<%=request.getContextPath()%>/assets/note/js/app.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/slimscroll/jquery.slimscroll.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/note/js/app.plugin.js"></script>
<script>
    function sendPass() {
        var url = location.protocol + '//' + location.host + '/send-pass.html';
        var account = $('#account').val();
        var email = $('#email').val();
        alert(account + "," + email + "," + url);
        $.ajax({
            type: "post",
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: {
                account: account,
                email: email
            },
            success: function (response) {

            },
            error: function (e) {
                console.log("ERROR: ", e);
            },
            done: function (e) {
                console.log("DONE");
            }
        });
    }

    $('#username').focus();
</script>
</body>
</html>