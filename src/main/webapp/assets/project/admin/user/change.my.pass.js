/**
 * Created by Admin on 12/22/2017.
 */
app.controller('sansimCtrl',['$scope','$http', '$window',function ($scope,$http,$window) {
    $scope.passwordCurrent="";
    $scope.passwordNew="";
    $scope.confirmPassword="";

    $scope.change=function () {
        if(validate()){
            $('#btn-check').button('complete');
            $http.put(preUrl+"/system/user/change-my-pass",{},{params: {passwordCurrent:$scope.passwordCurrent,passwordNew:$scope.passwordNew}}, {headers: {'Content-Type': 'application/json'} })
                .then(function (response) {
                    if(response!=null && response!='underfined' && response.status==200){
                        switch(response.data) {
                            case 1:
                                $scope.messageStatus="Đổi mật khẩu thành công!";
                                $("#Message").modal('show');
                                /*$window.location.href = preUrl + '/social/social-dashboard';*/
                                /*$window.location.href = preUrl + '/j_spring_security_logout';*/
                                break;
                            case 2:
                                $scope.messageStatus="Thất bại! Mật khẩu không đúng với mật khẩu hiện tại!";
                                $("#Message").modal('show');
                                break;
                            case 4:
                                $scope.messageStatus="Thất bại! Mật khẩu được chứa dấu cách!";
                                $("#Message").modal('show');
                                break;
                            default:
                                $scope.messageStatus="Có lỗi xảy ra, hãy thử lại sau!";
                                $("#Message").modal('show');
                                break;
                        }

                    }else{
                        $scope.messageStatus="Có lỗi xảy ra, hãy thử lại sau!";
                        $("#Message").modal('show');
                    }

                },
                function(response){
                    $scope.messageStatus="Có lỗi xảy ra, hãy thử lại sau!";
                    $("#Message").modal('show');
                });

        }
        $('#btn-check').button('complete');
    };

    function validate() {
        $scope.messageCurrent="";
        $scope.messageNew="";
        $scope.messageConfirm="";
        if($scope.passwordCurrent==null || $scope.passwordCurrent=='undefined' || $scope.passwordCurrent.length==0){
            $scope.messageCurrent="Mật khẩu không được để trống!";
            return false;
        }
        /*if($scope.passwordNew==null || $scope.passwordNew=='undefined' || $scope.passwordNew.length==0){
            $scope.messageNew="Mật khẩu không được để trống!";
            return false;
        }
        if($scope.passwordNew.length<6 || $scope.passwordNew.length>15){
            $scope.messageNew="Mật khẩu phải lớn hơn 6 ký tự và nhỏ hơn 15 ký tự!";
            return false
        }*/
        if(validatePassword($scope.passwordNew)===false){
            $scope.messageNew="Mật khẩu không được để trống, dài tối thiểu 6 kí tự, tối đa 30 kí tự, có ít nhất 1 kí tự số , 1 kí tự viết hoa và 1 kí tự viết thường, không chứa dấu cách!";
            return false
        }
        if($scope.confirmPassword==null || $scope.confirmPassword=='undefined' || $scope.confirmPassword.length==0){
            $scope.messageConfirm="Xác nhận mật khẩu không được để trống!";
            return false;
        }else{
            if($scope.confirmPassword!==$scope.passwordNew){
                $scope.messageConfirm="Không trùng khớp mật khẩu mới!";
                return false;
            }
        }
        return true;
    }

    function validatePassword(password) {
        if(password==="" || password===undefined){
            return false;
        }

        var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}/;

        var validPassword = regExp.test(password);

        return validPassword;

    }

}]);