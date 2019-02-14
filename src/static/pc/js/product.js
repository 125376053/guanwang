/**
 * Created by Administrator on 2017/7/17.
 */
// @koala-prepend "common.js"
(function () {
    function Product() {
        this.header={
            isHeaderChanged :false,
            changeHeader:function () {
                var me=this;
                hm.header.header.className="hm-header";
                me.isHeaderChanged = true;
            },
            initHeader:function () {
                var me=this;
                hm.header.header.className="hm-header header-init";
                me.isHeaderChanged = false;
            },
            scrollHeight:635,
            init:function () {
                var me=this;
                window.onscroll = function () {
                    var scrollTop= document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    if (scrollTop > me.scrollHeight && me.isHeaderChanged === false) {
                        me.changeHeader();
                    } else if (scrollTop <= me.scrollHeight && me.isHeaderChanged === true) {
                        me.initHeader();
                    }
                };
            }
        };
        this.init=function () {
            this.header.init();
        };

    }

    var product=new Product();
    product.init();
})();
