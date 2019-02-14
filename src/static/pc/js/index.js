
/**
 * Created by Administrator on 2017/7/17.
 */
// @koala-prepend "common.js"
// 播放器实例
var player = null
function VideoCarousel() {
  this.createVideo = function(address, img) {
    var videoObject = {
      logo: ' ', //设置logo，非必须
      container: '#video',//“#”代表容器的ID，“.”或“”代表容器的class
      variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
      video:address,//视频地址,
      autoplay: false,
      poster: img
    };
    player=new chplayer(videoObject);
  }
  this.changeVideo = function(address) {
    this.createVideo(address)
  }
}
// 轮播图
function Carousel(banners, dots, dotPath) {
  this.dotList = []
  this.potTimer = null
  this.banners = banners
  this.dots = dots
  this.dotPath = dotPath
  this.changeBanner = function (num) {
    var me = this;
    num = Number(num);
    var banners = hm.$(me.banners);
    for (var i = 0, len = banners.length; i < len; i++) {
      if (i == num) {
        banners[i].style.display = "block";
        me.dots[i].style.strokeDashoffset = 0;
      } else {
        // me.bannerRight[i].style.transform = "rotateX(0deg) rotateY(0deg)";
        banners[i].style.display = "none";
        me.dots[i].style.strokeDashoffset = 282.783;
      }

    }
  }
  //    小圆点描边
  this.makePath = function (num) {
      var me = this,
          dotPath = 282.783;
      if (me.potTimer) {
          window.clearInterval(me.potTimer);
      }
      me.potTimer = window.setInterval(function () {
          if (dotPath > 0) {
              dotPath -= 282783 / (60 * me.bannerPlayTime);
              me.dots[num].style.strokeDashoffset = dotPath;
          } else {
              window.clearInterval(me.potTimer);
          }
      }, 1000 / 60);
  },
  this.init = function () {
      var me = this;
      me.dotList = hm.$(dots);
      me.nowNum = 1;
      me.bannerPlayTime = 5000;
      me.bannerTimer = window.setInterval(function () {
          if (me.nowNum == me.dotList.length) {
              me.nowNum = 0;
          }
          me.changeBanner(me.nowNum);
          me.makePath(me.nowNum);
          me.nowNum++;

      }, me.bannerPlayTime);
      me.potTimer = null;
      // me.bannerRight = hm.$(".banner-right");
      me.dots = hm.$(me.dotPath);
      for (var i = 0, len = me.dotList.length; i < len; i++) {
          me.dotList[i].onclick = function () {
              console.log('click')
              window.clearInterval(me.potTimer);
              window.clearInterval(me.bannerTimer);
              me.changeBanner(this.dataset["index"]);
          };
      } 
      me.makePath(0);
  }
}

(function () {
    function Index() {
        this.header = {
            isHeaderChanged: false,
            changeHeader: function () {
                var me = this;
                hm.header.header.className = "hm-header";
                me.isHeaderChanged = true;
            },
            initHeader: function () {
                var me = this;
                hm.header.header.className = "hm-header header-init";
                me.isHeaderChanged = false;
            },
            scrollHeight: 500,
            init: function () {
                var me = this;
                this.initHeader()
                window.onscroll = function () {
                    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    if (scrollTop > me.scrollHeight && me.isHeaderChanged === false) {
                        me.changeHeader();
                    } else if (scrollTop <= me.scrollHeight && me.isHeaderChanged === true) {
                        me.initHeader();
                    }

                };
            }
        };
        this.video = {
          playerObj: null,
          init: function() {
            var me = this
            this.playerListWrapper = hm.$('.hm-video-list')
            // this.playerList = hm.$('.hm-video-list-item')
            // for (var i = 0 ; i < this.playerList.length ; i++) {
            //   var item = this.playerList[i]
            //   item.addEventListener('click', function(evt) {
            //     me.playerObj.changeVideo(evt.target.dataset.src)
            //     Array.prototype.forEach.call(me.playerList, function(el) {
            //       el.classList.remove('video-active')
            //     })
            //     evt.target.classList.add('video-active')
            //   })
            // }
            this.playerObj = new VideoCarousel()
            this.playerObj.createVideo('https://hm4-release.oss-cn-beijing.aliyuncs.com/video/WeChatSight16.mp4' ,'images/banner1shoot.jpg')

            // this.playerList[0].classList.add('video-active')
          }
        }
        //广告飘窗
        // this.advert = {
        //     init: function () {
        //         function Advert(className, width) {
        //             this.ele = hm.$("." + className)[0];
        //             this.width = width;
        //             this.maxMarginRight = this.width + document.body.clientWidth;
        //             this.timer = null;
        //         }
        //
        //         Advert.prototype.init = function () {
        //             var that = this;
        //             that.ele.style.marginRight = 0 + "px";
        //             that.move();
        //             that.ele.onmouseover = function () {
        //                 window.clearInterval(that.timer);
        //             };
        //             that.ele.onmouseout = function () {
        //                 that.move();
        //             };
        //
        //             hm.$(".hm-index-advert-content-close", that.ele)[0].onclick = function () {
        //                 that.close();
        //             };
        //         };
        //         Advert.prototype.move = function () {
        //             var that = this;
        //             this.timer = window.setInterval(function () {
        //                 that.ele.style.marginRight = (parseInt(that.ele.style.marginRight) + 1) + "px";
        //                 if (parseInt(that.ele.style.marginRight) > that.maxMarginRight) {
        //                     that.ele.style.marginRight = 0 + "px";
        //                     // window.clearInterval(that.timer);
        //                 }
        //             }, 1000 / 60);
        //         };
        //         Advert.prototype.close = function () {
        //             this.ele.parentNode.removeChild(this.ele);
        //             window.clearInterval(this.timer);
        //         };
        //
        //         var ad1 = new Advert("hm-index-advert-1", 500);
        //         ad1.init();
        //
        //         var ad2 = new Advert("hm-index-advert-2", 500);
        //         window.setTimeout(function () {
        //             ad2.init();
        //         }, 6000);
        //     }
        // };
        //初始化页面
        this.init = function () {
            var that=this;
            this.header.init();
            // this.banner.init();
            
            var banner = new Carousel('.banner', '.dotA', '.dotpath1')
            banner.init()
            var logo = new Carousel('.logobanner', '.dotB', '.dotpath2')
            logo.init()
            var comment = new Carousel('.commentbanner', '.dotC', '.dotpath3')
            comment.init()
            this.video.init()
            //this.advert.init();
            // window.setTimeout(function () {
            //     that.map.init();
            // },1);
            var experienceBtn = hm.$(".apply-btn")[0];
            experienceBtn.onclick = function () {
                hm.applyModal.showModal();
            }
        }
    }
    var index = new Index();
    index.init();
})();




