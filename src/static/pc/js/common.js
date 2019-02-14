/**
 * Created by Administrator on 2017/7/11.
 */
// @koala-prepend "md5.js"
//百度统计
var _hmt = _hmt || [];
(function() {
    // var hm = document.createElement("script");
    // hm.src = "https://hm.baidu.com/hm.js?3b806805089ad6eecf1b24f8d59ade9d";
    // var s = document.getElementsByTagName("script")[0];
    // s.parentNode.insertBefore(hm, s);
})();
//友盟统计
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
// document.write(unescape("%3Cspan id='cnzz_stat_icon_1272975873'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1272975873' type='text/javascript'%3E%3C/script%3E"));

// "http://www.9ihaomai.com"
window.hm = {
    conf: {
        apiPath: "http://www.9ihaomai.com",
        secret: "91vmai-beijng-201688888",
        key: "",
        getKey: function () {
            hm.ajax.sendAjax(hm.conf.apiPath + "/system/gen.json", "get", null, function (rsp) {
                hm.conf.key = rsp.data;
            });
        }
    },
    //获取HtmlElement
    //elTag:查找的内容（例:#id or .class or tagName）
    //返回对应的一个结果或多个结果
    //调用示例：hm.$(".hm-applymodal",body)[0];
    $: function (elTag, parent) {
        if (!parent) {
            parent = document;
        }
        if(elTag.indexOf(".") == 0){
            return parent.getElementsByClassName(elTag.substring(1));
        }else if(elTag.indexOf("#") == 0){
            return parent.getElementById(elTag.substring(1));
        }else{
            return parent.getElementsByTagName(elTag);
        }
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
            console.log('send') 
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
                //比GET请求多了一步
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;application/json;charset=utf-8");
            }
            // else{
            //     // xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            // }
            //另外,数据是通过send方法发送的
            xhr.send(formData);
        }
    },
    body: document.body,
    applyModal: {
        modalInit: function () {
            this.modal = hm.$(".hm-modal")[0];
            this.modalDialog = hm.$(".hm-modal-dialog", this.modal)[0];
            this.applyContent = hm.$(".hm-applymodal-content", this.modalDialog)[0];
            this.tipContent = hm.$(".hm-tip-content", this.modalDialog)[0];
            this.guanbi = hm.$(".icon-guanbi", this.modalDialog)[0];
            this.submitBtn = hm.$(".hm-applymodal-content-right-form-submit", this.applyContent)[0];
            this.getCodeBtn = hm.$(".hm-applymodal-content-right-form-code-btn", this.applyContent)[0];
            this.tel = hm.$(".hm-applymodal-content-right-form-tel", this.applyContent)[0];
            this.code = hm.$(".hm-applymodal-content-right-form-code", this.applyContent)[0];
            //                    去除提示
            if (hm.$(".tip-show", this.applyContent)[0]) {
                hm.$(".tip-show", this.applyContent)[0].classList.remove("tip-show");
            }
            this.applyContent.style.display = "block";
            this.tipContent.style.display = "none";
        },
        submitAction: function () {
            var that = this,
                name = hm.$(".hm-applymodal-content-right-form-name", that.applyContent)[0],
                company = hm.$(".hm-applymodal-content-right-form-company", that.applyContent)[0],
                postion = hm.$(".hm-applymodal-content-right-form-postion", that.applyContent)[0],
                regTel = /^\d{11}$/;
            //                    去除提示
            if (hm.$(".tip-show", that.applyContent)[0]) {
                hm.$(".tip-show", that.applyContent)[0].classList.remove("tip-show");
            }

            //                表单验证
            if (!hm.$("input", name)[0].value.trim()) {
                hm.$(".hm-tips", name)[0].innerText = "请输入姓名";
                name.classList.add("tip-show");
                return;
            }
            if (!hm.$("input", company)[0].value.trim()) {
                hm.$(".hm-tips", company)[0].innerText = "请输入公司名";
                company.classList.add("tip-show");
                return;
            }
            if (!hm.$("input", postion)[0].value.trim()) {
                hm.$(".hm-tips", postion)[0].innerText = "请输入职位名称";
                postion.classList.add("tip-show");
                return;
            }
            if (!hm.$("input", that.tel)[0].value.trim()) {
                hm.$(".hm-tips", that.tel)[0].innerText = "请输入手机号";
                that.tel.classList.add("tip-show");
                return;
            }
            if (!regTel.test(hm.$("input", that.tel)[0].value.trim())) {
                hm.$(".hm-tips", that.tel)[0].innerText = "手机号码格式错误";
                that.tel.classList.add("tip-show");
                return;
            }

            if (!hm.$("input", that.code)[0].value.trim()) {
                hm.$(".hm-tips", that.code)[0].innerText = "请输入手机验证码";
                that.code.classList.add("tip-show");
                return;
            }
            //                防止重复提交
            that.submitBtn.onclick = null;

            hm.ajax.sendAjax(
                hm.conf.apiPath + "/system/register.json?name=" +
                hm.$("input",name)[0].value.trim() + "&trade=" +
                hm.$("input",company)[0].value.trim() + "&gen=" +
                hm.conf.key + "&token=" +
                hex_md5(hm.conf.secret + hm.conf.key) + "&mobile=" +
                hm.$("input",that.tel)[0].value.trim() + "&code=" +
                hm.$("input",that.code)[0].value + "&position=" +
                hm.$("input",postion)[0].value.trim(),
                "post",
                null,
                function (rsp) {
                    hm.conf.getKey();
                    if (rsp.code == "MRMCM001") {
                        //                展示提示成功的窗口
                        // that.applyContent.style.display = "none";
                        // that.tipContent.style.display = "block";
                    }
                    that.hideModal()
                    that.showTipModal()
                }
            );


        },
        showModal: function () {
            var that = this;
//            打开弹窗
            hm.body.classList.add("modal-open");
            that.modalInit();
//            关闭弹窗的事件
            that.modalDialog.onclick = function (e) {
                e = window.event || e;
                e.stopPropagation();

            };
            that.guanbi.onclick = function () {
                that.hideModal();
            };
            that.modal.onclick = function () {
                that.hideModal();
            };

            that.getCodeBtn.onclick = function () {
                that.getCode();
            };


            that.submitBtn.onclick = function () {
                that.submitAction();
            };
        },
        hideModal: function () {
            var that = this;
            //            清空表单
            var inputList = hm.$("input",that.applyContent);
            for (var i = 0, len = inputList.length; i < len; i++) {
                inputList[i].value = "";
            }
            clearInterval(that.timeId);
            that.getCodeBtn.innerText = "获取验证码";
            hm.body.classList.remove("modal-open");
        },
        showTipModal: function () {
            var that = this;
//            打开弹窗
            hm.body.classList.add("modal-open");
            that.modalInit();
//            关闭弹窗的事件
            that.modalDialog.onclick = function (e) {
                e = window.event || e;
                e.stopPropagation();

            };
            that.guanbi.onclick = function () {
                that.hideModal();
            };
            that.modal.onclick = function () {
                that.hideModal();
            };
            that.applyContent.style.display = "none";
            that.tipContent.style.display = "block";
        },
        getCode: function () {
            var that = this,
                regTel = /^\d{11}$/;
            if(that.getCodeBtn.className=="hm-applymodal-content-right-form-code-btn getting"){
                return;
            }

            //                    去除提示
            if (hm.$(".tip-show",this.applyContent)[0]) {
                hm.$(".tip-show",this.applyContent)[0].classList.remove("tip-show");
            }
            if (!hm.$("input",that.tel)[0].value.trim()) {
                hm.$(".hm-tips",that.tel)[0].innerText = "请输入手机号";
                that.tel.classList.add("tip-show");
                return;
            }
            if (!hm.$("input",that.tel)[0].value.trim()) {
                hm.$(".hm-tips",that.tel)[0].innerText = "手机号码格式错误";
                that.tel.classList.add("tip-show");
                return;
            }
            that.getCodeBtn.onclick = null;
            that.getCodeBtn.className="hm-applymodal-content-right-form-code-btn getting";
            that.getCodeBtn.innerText = "30秒后可重发";
            if(that.timeId){
               clearInterval(that.timeId);
            }
            that.timeId = setInterval(function () {
                var text = that.getCodeBtn.innerText.match(/\d{1,2}/)[0];
                text = parseInt(text);
                if (text > 0) {
                    text -= 1;
                }
                else {
                    clearInterval(that.timeId);
                    that.getCodeBtn.className="hm-applymodal-content-right-form-code-btn";
                    that.getCodeBtn.innerText = "获取验证码";
                    that.getCodeBtn.onclick = function () {
                        that.getCode();
                    };
                    return;
                }
                that.getCodeBtn.innerText = text + "秒后可重发";
            }, 1000);

            hm.ajax.sendAjax(hm.conf.apiPath + "/sms/send.json?gen=" + hm.conf.key + "&token=" + hex_md5(hm.conf.secret + hm.conf.key) + "&mobile=" + hm.$("input",that.tel)[0].value.trim(), "get", null, function (rsp) {
                hm.conf.getKey();
                if (rsp.code == "MRMCM0001") {
                    that.code.focus();
                    that.getCodeBtn.onclick = function () {
                        that.getCode();
                    };
                }
            });
        }
    },
    header: {
        init: function () {
            this.header = hm.$(".hm-header")[0];
            this.applyBtns = hm.$(".hm-header-btn-register");
            console.log(this.applyBtn)
            Array.prototype.forEach.call(this.applyBtns, function(applyBtn) {
              applyBtn.onclick = function () {
                  hm.applyModal.showModal();
              };
            })
        }
    },
    footer:{
        init:function () {
          this.footerApplyBtn=hm.$(".hm-footer-register")[0];
            this.footerApplyBtn.onclick = function () {
                hm.applyModal.showModal();
            };
        }
    },
    commonInit: function () {
        hm.conf.getKey();
        hm.header.init();
        hm.footer.init();
    }
};

hm.commonInit();
