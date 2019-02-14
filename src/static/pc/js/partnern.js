/**
 * Created by Administrator on 2017/7/17.
 */
// @koala-prepend "../data/ProJson.js"
// @koala-prepend "../data/CityJson.js"
// @koala-prepend "common.js"
(function () {
    function Partnern() {
        this.apply = {
            //省级
            makeProvince: function () {
                var me = this;
                for (var i = 0, proLen = province.length; i < proLen; i++) {
                    var p = province[i],
                        option = document.createElement("option");
                    option.value = p.ProID;
                    option.innerText = p.ProName;
                    me.province.appendChild(option);
                }
                me.province.onchange = function () {
                    me.makeCity(this.value);
                };

            },
            makeCity: function (selValue) {
                var me = this;
                me.city.innerHTML = '<option value="">请选择城市</option>';
                for (var j = 0, cityLen = city.length; j < cityLen; j++) {
                    var p = city[j];
                    if (p.ProID == selValue) {
                        var option = document.createElement("option");
                        option.value = p.CityID;
                        option.innerText = p.CityName;
                        me.city.appendChild(option);
                    }
                }
            },
            submitAction: function () {
                var me = this,
                    company = me.company.value.trim(),
                    name = me.name.value.trim(),
                    tel = me.tel.value.trim(),
                    province = me.province.options[me.province.selectedIndex].text.trim(),
                    city = me.city.options[me.city.selectedIndex].text.trim(),
                    remark = me.remark.value.trim(),
                    regTel = /^\d{11}$/;

                //                    去除提示
                if (hm.$(".tip-show", me.form)[0]) {
                    hm.$(".tip-show", me.form)[0].classList.remove("tip-show");
                }
                if (!company) {
                    hm.$(".hm-tips", me.company.parentNode)[0].innerText = "请输入公司名";
                    me.company.parentNode.parentNode.classList.add("tip-show");
                    return;
                }
                if (!name) {
                    hm.$(".hm-tips", me.name.parentNode)[0].innerText = "请输入姓名";
                    me.name.parentNode.parentNode.classList.add("tip-show");
                    return;
                }
                if (!tel) {
                    hm.$(".hm-tips", me.tel.parentNode)[0].innerText = "请输入手机号";
                    me.tel.parentNode.parentNode.classList.add("tip-show");
                    return;
                }
                if (!regTel.test(tel)) {
                    hm.$(".hm-tips", me.tel.parentNode)[0].innerText = "手机号格式不正确";
                    me.tel.parentNode.parentNode.classList.add("tip-show");
                    return;
                }
                if (!province) {
                    hm.$(".hm-tips", me.province.parentNode)[0].innerText = "请选择省份";
                    me.province.parentNode.parentNode.classList.add("tip-show");
                    return;
                }
                if (!city) {
                    hm.$(".hm-tips", me.city.parentNode)[0].innerText = "请选择城市";
                    me.city.parentNode.parentNode.classList.add("tip-show");
                    return;
                }

                me.applybtn.onclick = null;
                hm.ajax.sendAjax(hm.conf.apiPath + "/apply/investment.json?gen=" + hm.conf.key
                    + "&token=" + hex_md5(hm.conf.secret + hm.conf.key) +
                    "&companyname=" + company +
                    "&address=" + province + city +
                    "&contact=" + name + "&tel" + tel +
                    "&tel=" + tel +
                    "&email=" + "" + "&qq" + "" + "&temp1=" + remark
                    , "post", null, function (res) {
                        hm.conf.getKey();
                        if (res.code == "MRMCM0001") {
                            hm.applyModal.showTipModal();
                            me.formInit();
                        }
                        else {
                            me.applybtn.onclick = function () {
                                me.submitAction()
                            };
                        }
                    });

            },
            formInit: function () {
                var me = this;
                me.company.value = "";
                me.name.value = "";
                me.tel.value = "";
                me.remark.value = "";
                me.province.options[0].selected = true;
                me.city.options[0].selected = true;
                me.applybtn.onclick = function () {
                    me.submitAction()
                };

            },
            init: function () {
                var me = this;
                this.form = hm.$(".hm-form", hm.$(".hm-partnern-apply")[0])[0];
                this.company = hm.$("input", hm.$(".hm-partnern-apply-form-company", this.form)[0])[0];
                this.name = hm.$("input", hm.$(".hm-partnern-apply-form-name", this.form)[0])[0];
                this.tel = hm.$("input", hm.$(".hm-partnern-apply-form-tel", this.form)[0])[0];
                this.province = hm.$("select", hm.$(".hm-partnern-apply-form-province", this.form)[0])[0];
                this.city = hm.$("select", hm.$(".hm-partnern-apply-form-city", this.form)[0])[0];
                this.remark = hm.$("textarea", hm.$(".hm-partnern-apply-form-remark", this.form)[0])[0];
                this.applybtn = hm.$(".hm-partnern-apply-form-applybtn", this.form)[0];
                me.makeProvince();
                this.applybtn.onclick = function () {
                    me.submitAction()
                };
            }
        };

        this.init = function () {
            this.apply.init();
        };
    }

    var partnern = new Partnern();
    partnern.init();
})();
