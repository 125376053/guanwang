/**
 * Created by Administrator on 2017/7/17.
 */
// @koala-prepend "common.js"
(function () {
    function Case() {
        this.jingdian = {
            checkMoreBtn: hm.$(".checkmore")[0],
            caseContanier: hm.$(".w",hm.$(".hm-case-jingdian")[0])[0],
            showAll: function () {
                var me = this;
                me.caseContanier.classList.add("all");
            },
            hideAll: function () {
                var me = this;
                me.caseContanier.classList.remove("all");
            },
            init: function () {
                var me = this;
                this.checkMoreBtn.onclick = function () {
                    if (this.innerText == "查看更多") {
                        me.showAll();
                        this.innerText = "点击收起";
                    } else {
                        me.hideAll();
                        this.innerText = "查看更多";
                    }
                };
            }
        };
        this.init=function () {
            this.jingdian.init();
        };
    }

    var casePage = new Case();
    casePage.init();
})();

