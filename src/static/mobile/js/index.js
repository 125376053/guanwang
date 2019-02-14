var player
function VideoCarousel() {
  this.createVideo = function(address, poster) {
    var videoObject = {
      logo: ' ', //设置logo，非必须
      container: '#video',//“#”代表容器的ID，“.”或“”代表容器的class
      variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
      video:address,//视频地址,
      autoplay: false,
      poster: poster,
    };
    player=new chplayer(videoObject);
  }
  this.changeVideo = function(address,poster) {
    this.createVideo(address,poster)
  }
} 
(function (){
    new Swiper('.swiper-container',{
        pagination : '.swiper-pagination',
        paginationClickable: true,
        //speed: 2000,
        loop: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction : false,
        autoplay:4000
    });
    new Swiper('.logo-container',{
        pagination : '.logo-pagination',
        paginationClickable: true,
        //speed: 2000,
        loop: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction : false,
        //autoplay:4000
    });
    new Swiper('.comment-container',{
        pagination : '.comment-pagination',
        paginationClickable: true,
        //speed: 2000,
        loop: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction : false,
        autoplay:4000
    });
    var video = {
      playerObj: null,
      init: function() {
        var me = this
        // this.playerList = document.querySelectorAll('.video-list-item')
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
        this.playerObj.createVideo('https://hm4-release.oss-cn-beijing.aliyuncs.com/video/WeChatSight16.mp4','./mimg/banner1shoot-min.jpg')
        // this.playerList[0].classList.add('video-active')
      }
    }
    video.init()

})();