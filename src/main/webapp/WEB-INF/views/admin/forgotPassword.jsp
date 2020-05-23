<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="en" class="" style="background-color: transparent">
<head>
    <meta charset="utf-8"/>
    <title>He thong quan ly mang xa hoi TP Da Nang</title>
    <meta name="description" content=""/>
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

    .success {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;

        color: #3c763d;
        background-color: #dff0d8;
        border-color: #d6e9c6;
    }
</style>
<section id="content" class="m-t-lg wrapper-md animated fadeInUp">
    <div class="container aside-xxl">
        <%--<a class="navbar-brand block" href="index.html"><img src="#" class="img-rounded"></a>--%>
        <section
                class="panel panel-default bg-white <%--m-t-lg--%>" <%--style="border-radius: 15px; height: 827px; width: 550px;"--%>>
            <header class="panel-heading text-center"
                    style="margin-top: 8px; color: #07A6D6; background-color: transparent !important; font-size: 27px;">
                <i class="fa fa-home" style="font-size: 37px"></i><strong> LẤY LẠI MẬT KHẨU</strong>
            </header>
            <div></div>
            <%--            <img id="logo_login" src="<%=request.getContextPath()%>/assets/note/images/logo.png">--%>

            <div class="panel-body wrapper-lg" style="font-size: 20px">
                <%-- <c:if test="${not empty error}">
                     <div class="errorss">
                         <c:if test="${error==1}">
                             Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!
                         </c:if>
                         <c:if test="${error==0}">
                             Tài khoản đang bị tạm khóa!
                         </c:if>
                     </div>
                 </c:if>--%>
                <div class="form-group">
                    <%--<label class="control-label" style="font-weight: bold">Tài khoản</label>--%>
                    <div class="input-group m-b">
                        <span class="input-group-addon" style="font-size: 20px !important;">
                            <i class="fa fa-users icon-login"></i>
                        </span>
                        <input id="account" name="account" placeholder="Tên tài khoản" class="form-control input-lg">
                    </div>
                </div>
                <div class="form-group">
                    <%--<label class="control-label" style="font-weight: bold">Nhập Email</label>--%>
                    <div class="input-group m-b">
                        <span class="input-group-addon" style="font-size: 20px !important;">
                            <i class="fa fa-users icon-login"></i>
                        </span>
                        <input id="email" name="email" placeholder="Email" class="form-control input-lg">
                    </div>
                </div>
                <span class="form-group" style="font-size: 13px; text-align: center">
                        Vui lòng nhập địa chỉ email cho tài khoản của bạn. Một mật khẩu mới sẽ được gửi đến địa chỉ email của bạn. Bạn sẽ có thể đăng nhập và đổi lại mật khẩu cho tài khoản của bạn !
                    </span>


                <%--                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="rememberme" name="remember-me"> Ghi nhớ mật khẩu
                                    </label>
                                    &lt;%&ndash;<input type="hidden" name="${_csrf.parameterName}"&ndash;%&gt;
                                    &lt;%&ndash;value="${_csrf.token}" />&ndash;%&gt;
                                </div>--%>
                <%--                <div class="col-md-12">
                                    <a href="#" class="pull-right m-t-xs" data-toggle="modal" data-target="#myModal"
                                       style="color: #717171; padding-right: 0px">
                                        <i class="fa fa-info-circle"></i>
                                        <small> Quên mật khẩu?</small>
                                    </a>
                                </div>--%>

                <div class="form-group">
                    <div class="wrap">
                        <i class="fa fa-sign-in" style="vertical-align: middle;font-size: 24px; color: #337ab7;"></i>&nbsp;
                        <a href="<%=request.getContextPath()%>/login">Đăng nhập</a>
                    </div>

                    <button id="btn_sending"
                            class="btn btn-info button-sendEmailForgotPass <%--btn-rounded center-block--%>"
                            style="margin-left: 33%; background-color: #07A6D6">Đang gửi...
                    </button>

                    <button onclick="sendPass()" id="btn_send"
                            class="btn btn-info button-sendEmailForgotPass <%--btn-rounded center-block--%>"
                            style="margin-left: 33%; background-color: #07A6D6">GỬI EMAIL
                    </button>

                </div>
                <div id="send_success" class="success" hidden>
                    <span>Thông tin đăng nhập đã được gửi qua email của bạn!</span>
                </div>
                <div class="errorss" id="send_fail" hidden>
                    <span>Gửi thất bại. Kiểm tra lại tài khoản và email!</span>
                </div>
            </div>
        </section>
    </div>
</section>
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
    $( document ).ready(function() {
        $('#btn_sending').hide();
    });

    function sendPass() {
        $('#btn_sending').show();
        $('#btn_send').hide();
        var url = location.protocol + '//' + location.host + '<%=request.getContextPath()%>' + '/send-pass';

        var forgetPasswordForm = {};
        forgetPasswordForm["account"] = $('#account').val();
        forgetPasswordForm["email"] = $('#email').val();
        $('#send_success').hide();
        $('#send_fail').hide();
        /*        alert(account + "," + email + "," + url);*/
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(forgetPasswordForm),
            success: function (response) {
                console.log("send success");
                if (response == true) {
                    $('#send_success').show();
                    $('#btn_sending').hide();
                    $('#btn_send').show();
                } else {
                    $('#send_fail').show();
                    $('#btn_sending').hide();
                    $('#btn_send').show();
                }
            },
            error: function (e) {
                console.log("ERROR: ", e);
                $('#send_fail').show();
                $('#btn_sending').hide();
                $('#btn_send').show();

            },
            done: function (e) {
                console.log("DONE");
                $('#send_success').show();
                $('#btn_sending').hide();
                $('#btn_send').show();
            }
        });
    }
</script>
</body>
</html>