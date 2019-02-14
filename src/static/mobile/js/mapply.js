window.hm = {
    conf: {
        // apiPath: "http://bjtest.91vmai.com:8190",
        apiPath: "http://www.9ihaomai.com",
        secret: "91vmai-beijng-201688888",
        key: "",
        clearGetCode: "",
        getKey: function () {
            hm.ajax.sendAjax(hm.conf.apiPath + "/system/gen.json", "get", null, function (rsp) {
                hm.conf.key = rsp.data;
            });
        }
    },
    navShowAction: function (e) {
        var shadombg = document.querySelector(".shadom-bg"),
            pop = document.querySelector(".pop-ul");

        shadombg.style.display = "block";
        pop.style.display = "block";
        e.preventDefault();
    },
    navHideAction: function (e) {
        var shadombg = document.querySelector(".shadom-bg"),
            pop = document.querySelector(".pop-ul");

        shadombg.style.display = "none";
        pop.style.display = "none";
        e.preventDefault();
    },
    submitAction: function () {
        var kfname = document.querySelector(".kfname"),
            kfcompany = document.querySelector(".kfcompany"),
            kfjob = document.querySelector(".kfjob"),
            kftel = document.querySelector(".kftel"),
            getCode = document.querySelector(".getCode"),
            kfcode = document.querySelector(".kfcode");
        myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //tel

        if (kfname.value == "") {
            alert("请输入姓名");
        } else if (kfcompany.value == "") {
            alert("请输入企业名称");
        } else if (kfjob.value == "") {
            alert("请输入公司职务");
        } else if (kftel.value == "") {
            alert("手机号码不为空");
        } else if (!myreg.test(kftel.value)) {
            alert("请输入有效的手机号码！");
            return false;
        } else if (kfcode.value == "") {
            alert('请输入短信验证码');
        } else {
            //提交
            hm.ajax.sendAjax(
                hm.conf.apiPath + "/system/register.json?name=" +
                kfname.value + "&trade=" +
                kfcompany.value + "&gen=" +
                hm.conf.key + "&token=" +
                hex_md5(hm.conf.secret + hm.conf.key) + "&mobile=" +
                kftel.value + "&code=" +
                kfcode.value + "&position=" +
                kfjob.value,
                "post",
                null,
                function (rsp) {
                    hm.conf.getKey();

                    if (rsp.code == "MRMCM0001") {
                        alert("申请成功");
                        clearInterval(hm.conf.clearGetCode);
                        document.querySelector(".get-Verification").setAttribute("class","get-Verification getCode");
                        document.querySelector(".get-Verification").innerText="获取验证码";

                        defaultInt();
                    }else if (rsp.code == "MRMCM0002") {
                        alert(rsp.message);  
                    }

                }
            );
            function defaultInt() {
                kfname.value = "";
                kfcompany.value = "";
                kfjob.value = "";
                kftel.value = "";
                kfcode.value = "";
            }
        }
    },
    getCodeAction: function () {
        var that = this,
            getCode = document.querySelector(".getCode"),
            myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!document.querySelector(".kftel").value) {
            alert("请输入手机号");
            return;
        }
        if (!myreg.test(document.querySelector(".kftel").value)) {
            alert("请输入有效的手机号码！");
            return;
        }
        getCode.innerText = "30秒后可重发";
        hm.conf.clearGetCode=that.timeId;
        if (hm.conf.clearGetCode) {
            clearInterval(hm.conf.clearGetCode);
        }
        hm.conf.clearGetCode = setInterval(function () {
            var text = getCode.innerText.match(/\d{1,2}/)[0];
            text = parseInt(text);
            if (text > 0) {
                text -= 1;
                document.querySelector(".get-Verification").setAttribute("class","get-Verification");
            }
            else {
                clearInterval(hm.conf.clearGetCode);
                getCode.innerText = "获取验证码";
                document.querySelector(".get-Verification").setAttribute("class","get-Verification getCode");
                return;
            }
            getCode.innerText = text + "秒后可重发";
        }, 1000);

        hm.ajax.sendAjax(hm.conf.apiPath + "/sms/send.json?gen=" + hm.conf.key + "&token=" + hex_md5(hm.conf.secret + hm.conf.key) + "&mobile=" + document.querySelector(".kftel").value, "get", null, function (rsp) {
            hm.conf.getKey();
            if (rsp.code == "MRMCM0001") {
                console.log("短信发送成功");
            }
        });
        
    },
    ajax: {
        XHR: function () {
            var xhr;
            try {
                xhr = new XMLHttpRequest();
            }
            catch (e) {
                var IEXHRVers = ["Msxml3.XMLHTTP", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
                for (var i = 0, len = IEXHRVers.length; i < len; i++) {
                    try {
                        xhr = new ActiveXObject(IEXHRVers[i]);
                    }
                    catch (e) {
                        continue;
                    }
                }
            }
            return xhr;
        },
        sendAjax: function (url, type, formData, success) {
            var xhr = this.XHR();
            xhr.open(type, url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));

                    if (typeof(success) == "function") {
                        success(JSON.parse(xhr.responseText));
                    }
                    return;
                }
            };
            if (type == "post") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;application/json;charset=utf-8");
            }
            xhr.send(formData);
        }
    },
    commonInit: function () {
        hm.conf.getKey();
        document.querySelector(".submitr").addEventListener("touchend", function (e) {
            hm.submitAction();
        });
        document.querySelector(".getCode").addEventListener("touchend", function (e) {
            try{
                hm.getCodeAction();
            }catch(e){
                console.log("正常错误")
            }
        });
        document.querySelector(".tag-icon").addEventListener("touchend", function (e) {
            hm.navShowAction(e);
        });
        document.querySelector(".shadom-bg").addEventListener("touchend", function (e) {
            hm.navHideAction(e);
        });
    }
};

hm.commonInit();
