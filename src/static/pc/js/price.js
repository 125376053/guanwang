/**
 * Created by Administrator on 2017/7/18.
 */
// @koala-prepend "common.js"
// (function () {
//     function Price() {
//         this.select = {
//             contanier: hm.$(".hm-price-select-contanier")[0],
//             plans: hm.$(".hm-price-select-plan"),
//             init: function () {
//                 var that = this;
//                 this.contanier.onmouseout = function () {
//                     that.plans[0].className = "hm-price-select-plan";
//                     that.plans[1].className = "hm-price-select-plan select";
//                     that.plans[2].className = "hm-price-select-plan";
//                 };
//                 for (var i = 0, len = that.plans.length; i < len; i++) {
//                     that.plans[i].onmouseover = function () {
//                         hm.$(".select",that.contanier)[0].className = "hm-price-select-plan";
//                         if (!this.classList.contains("select")) {
//                             this.classList.add("select");
//                         }
//                     };
//                     that.plans[i].onmouseout = function () {
//                         if (this.classList.contains("select")) {
//                             this.classList.remove("select");
//                         }
//                     };
//                 }
//             }
//         };
//         this.init = function () {
//             this.select.init();
//         }
//     }
//
//     var price = new Price();
//     price.init();
// })();

