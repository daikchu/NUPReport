app.controller('userInfoController',['$scope','$http','$filter','$window','fileUpload','$timeout','$q',function ($scope,$http,$filter,$window,fileUpload,$timeout,$q) {

    $scope.user = {};
    $scope.area={};

    $http.get(preUrl + "/area", {params: {type: 1}})
        .then(function (response) {
            $scope.areaProvince = response.data;
        });

    $scope.getAdministrationById = function(id){
        $http.get(preUrl + "/getAdministrationFull",{params: {id: id}})
            .then(function (response) {
                $scope.adminis = response.data[0];
            });
    };

    $http.get(preUrl + "/getUserLogin")
        .then(function (response) {
            $scope.user = response.data;
            $scope.getAdministrationById($scope.user.administrationId);
            $scope.user.isChanggePass = false;

            if($scope.user.addressId != null && $scope.user.addressId != "") {

                $http.get(preUrl + "/area", {params: {id: $scope.user.addressId,type:4}})
                    .then(function (response) {
                        $scope.area.provinceCode = response.data[0].provinceCode;
                        $scope.area.districtCode = response.data[0].districtCode;
                        $scope.area.communeCode = response.data[0].communeCode;

                        $http.get(preUrl + "/area", {params: {type: 1, provinceCode: $scope.area.provinceCode}})
                            .then(function (response) {
                                $scope.areaDistrict = response.data;

                                $http.get(preUrl + "/area", {params: {type: 2, districtCode: $scope.area.districtCode}})
                                    .then(function (response) {
                                        $scope.areaCommune = response.data;

                                        $timeout(function () {
                                            $("#provinceCode").select2("val",$scope.area.provinceCode);
                                            $("#districtCode").select2("val",$scope.area.districtCode);
                                            $("#communeCode").select2("val",$scope.area.communeCode);
                                        },0);
                                    });
                            });
                    });
            }

            /*reset date input*/
            var date = new Date($scope.user.birthDay);
            $("#birthDay").data("DateTimePicker").date(date);
            $scope.birthDay_ = date;
            var yyyy = date.getFullYear();
            var mm = date.getMonth()+1;
            var dd  = date.getDate();
            $scope.user.birthDay = dd + "-" + mm + "-" + yyyy;

        });

    $scope.back = function () {
        window.location.href = preUrl + "/";
    };

    $scope.changeProvince = function () {
        $scope.areaCommune = [];
        $scope.areaDistrict = [];
        $scope.area.communeCode = "";
        $scope.area.districtCode = "";
        $("#districtCode").select2("val", "");
        $("#communeCode").select2("val", "");
        $scope.user.addressId = "";

        if($scope.area.provinceCode != "") {
            $http.get(preUrl + "/area", {params: {type: 1, provinceCode: $scope.area.provinceCode}})
                .then(function (response) {
                    $scope.areaDistrict = response.data;
                });
        }
    };

    $scope.changeDistrict = function () {
        $scope.area.communeCode = "";
        $("#communeCode").select2("val", "");
        $scope.user.addressId = "";

        if($scope.area.districtCode != "") {
            $http.get(preUrl + "/area", {params: {type: 2, districtCode: $scope.area.districtCode}})
                .then(function (response) {
                    $scope.areaCommune = response.data;
                });
        }
    };

    $scope.changeWard = function () {
        if($scope.area.communeCode != ""){
            $http.get(preUrl + "/area", {params: {type: 6, provinceCode:$scope.area.provinceCode,districtCode:$scope.area.districtCode,communeCode:$scope.area.communeCode}})
                .then(function (response) {
                    $scope.user.addressId = response.data[0].id;
                });
        } else {
            $scope.user.addressId = "";
        }
    };

    $("#password").removeAttr("data-parsley-trigger");
    $("#password").removeAttr("data-parsley-required");
    $("#password").removeAttr("data-parsley-required-message");

    $("#newPassword").removeAttr("data-parsley-trigger");
    $("#newPassword").removeAttr("data-parsley-required");
    $("#newPassword").removeAttr("data-parsley-required-message");

    $("#rePassword").removeAttr("data-parsley-trigger");
    $("#rePassword").removeAttr("data-parsley-required");
    $("#rePassword").removeAttr("data-parsley-required-message");
    $("#rePassword").removeAttr("data-parsley-equalto");
    $("#rePassword").removeAttr("data-parsley-equalto-message");

    $scope.user.isChanggePass = false;
    $scope.openChangePassword=function (isChanggePass) {
        $scope.user.isChanggePass = !isChanggePass;
        switch ($scope.user.isChanggePass) {
            case true:
                $("#password").attr("data-parsley-trigger", "change");
                $("#password").attr("data-parsley-required", "true");
                $("#password").attr("data-parsley-required-message", $("#ssglx1").html());

                $("#newPassword").attr("data-parsley-trigger", "change");
                $("#newPassword").attr("data-parsley-required", "true");
                $("#newPassword").attr("data-parsley-required-message", $("#ssglx2").html());

                $("#rePassword").attr("data-parsley-trigger", "change");
                $("#rePassword").attr("data-parsley-required", "true");
                $("#rePassword").attr("data-parsley-required-message", $("#ssglx3").html());
                $("#rePassword").attr("data-parsley-equalto","#newPassword");
                $("#rePassword").attr("data-parsley-equalto-message",$("#ssglx4").html());
                break;
            case false:
                $("#password").removeAttr("data-parsley-trigger");
                $("#password").removeAttr("data-parsley-required");
                $("#password").removeAttr("data-parsley-required-message");

                $("#newPassword").removeAttr("data-parsley-trigger");
                $("#newPassword").removeAttr("data-parsley-required");
                $("#newPassword").removeAttr("data-parsley-required-message");

                $("#rePassword").removeAttr("data-parsley-trigger");
                $("#rePassword").removeAttr("data-parsley-required");
                $("#rePassword").removeAttr("data-parsley-required-message");
                $("#rePassword").removeAttr("data-parsley-equalto");
                $("#rePassword").removeAttr("data-parsley-equalto-message");
                break;
        }
        $scope.user.password = "";
        $scope.user.newPassword = "";
        $scope.user.rePassword = "";
        $timeout(function () {
            $('#password').val('');
            $('#newPassword').val('');
            $('#rePassword').val('');
        },0);
    };

    $scope.saveUser = function () {
        if ($("#frmUpdateUser").parsley().validate()) {
            var call = angular.copy($scope.user);
            call.birthDay = $scope.birthDay_;
            var info = JSON.stringify(call);
            $http.post(preUrl + "/user-info", info, {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    if(response.data.success == true) {

                        window.location.href = preUrl + "/user-info?status=2";

                    } else {
                        toastr.error(response.data.messageError);
                    }
                },function (response) {
                    toastr.error($("#_custum_error_500").html())
                });
        }
    };

    $scope.uploadAvatar =  function () {
        var fullPath = $("#upload").val();
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
        }
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            $scope.user.image = resp;
            $scope.user.filename = filename;
            $scope.saveUser();
        });
    };

    $uploadCrop = $("#upload-demo").croppie({
        enableExif: true,
        viewport: {
            width: 250,
            height: 250,
            type: 'circle'
        },
        boundary: {
            width: 300,
            height: 300
        }
    });
    $('#upload').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            $uploadCrop.croppie('bind', {
                url: e.target.result
            }).then(function () {
                console.log('jQuery bind complete');
            });
        };
        reader.readAsDataURL(this.files[0]);
    });

    $(document).ready(function () {

        $("#birthDay").datetimepicker({
            locale: 'vi-VN',
            format: 'DD-MM-YYYY'
        }).on('dp.change', function (e) {
            if (e != null) {
                $scope.user.birthDay = $(this).val();
                $scope.birthDay_ = stringToDate($scope.user.birthDay, "dd-MM-yyyy", "-");
            }
        });

    });

    $scope.logger = "";
    if(statusMsg == "1"){
        $("#msgId").addClass("alert-success");
        $scope.logger = $("#addSuccess").html();
        document.getElementById("msgId").style.display = "block";
        setTimeout(function () {
            document.getElementById("msgId").style.display = "none";
        }, 3000);
    }
    if(statusMsg == "2"){
        $("#msgId").addClass("alert-success");
        $scope.logger = $("#editSuccess").html();
        document.getElementById("msgId").style.display = "block";
        setTimeout(function () {
            document.getElementById("msgId").style.display = "none";
        }, 3000);
    }
    if(statusMsg == "3"){
        $("#msgId").addClass("alert-success");
        $scope.logger = $("#deleteSuccess").html();
        document.getElementById("msgId").style.display = "block";
        setTimeout(function () {
            document.getElementById("msgId").style.display = "none";
        }, 3000);
    }

}]);