function time(){
    var mySwiper
    var newLastp=0  //$(".eventJiLu p").length-1; //默认最后一个显示

    //总宽度
    $(".eventJiLu").width($(".eventJiLu").find('p').innerWidth()*$(".eventJiLu").find('p').length)

    $(".eventJiLu p").each(function(index){
        $(this).attr('index',index)
    })

    //点击显示弹出层
    $(".eventJiLu p span").on('touchend',function (e) {
        index=$(this).parent().attr('index')
        var html = $(this).parent().find('i').html();
        $(".tishiModel").stop(true).slideDown(0);
        $(".tishiContent").html(html);
        $(this).addClass('yeRadio').removeClass('noRadio').parent().siblings().find('span').removeClass('yeRadio').addClass('noRadio')
        var oy = $(this).offset().top;
        var ox = $(this).offset().left; //当前元素偏移 这个值不会变 距离左边的距离 确定中心点用这个
        var ofw = $(".tishiModel").innerWidth(); //提示层实际宽度
        var ofh = $(".tishiModel").height();
        $(".tishiModel").css({
            //left:ox-ofw/2,
            top:oy-ofh-100
        })

    })
    //默认第一个居中
    $(".eventJiLu p").eq(1).find('span').trigger('touchend')

    //滑动
    var index=0;
    mySwiper = new Swiper('.event .swiper-container',{
        slidesPerView :3,
        slidesPerGroup :1,
        resistanceRatio : 0,
        initialSlide:1,
        centeredSlides:true,
        slideToClickedSlide:true,
        autoplay : 3000,
        autoplayDisableOnInteraction:false,
        onSlideChangeEnd: function(swiper){
            $(".eventJiLu p").eq(swiper.activeIndex).find('span').trigger('touchend')
        }
    })


    $('.event .swiper-container').on('touchstart',function(){
        mySwiper.stopAutoplay();
    })
    $('.event .swiper-container').on('touchend',function(){
        mySwiper.startAutoplay();
    })
}

function two(){
    $(".mAbout2").css('margin-top',$(window).height())
    var mySwiper = new Swiper ('.mabout3 .swiper-container', {
        // 如果需要分页器
        pagination: '.mabout3 .swiper-pagination',
        slidesPerView :1.4,
        spaceBetween:15,
        initialSlide:1,
        centeredSlides:true,
        autoplay : 3000,
        autoplayDisableOnInteraction:false,
    })
    var flag=true;
    $("#mbg3 .swiper-slide").on('click',function(){
        if(flag){
            $(this).find('.text').css('height','auto')
        }else{
            $(this).find('.text').css('height','4rem')
        }
        flag=!flag;
    })
    $('.mabout3 .swiper-container').on('touchstart',function(){
        mySwiper.stopAutoplay();
    })
    $('.mabout3 .swiper-container').on('touchend',function(){
        mySwiper.startAutoplay();
    })
}

function three(){
    var mySwiper = new Swiper ('.mabout4 .swiper-container', {
        // 如果需要分页器
        pagination: '.mabout4 .swiper-pagination',
        slidesPerView :1.4,
        spaceBetween:15,
        initialSlide:1,
        centeredSlides:true,
        autoplay : 3000,
        autoplayDisableOnInteraction:false,
        onSlideChangeEnd: function(swiper){
            $(".mabout4 .swiper-slide").eq(swiper.activeIndex).find('img').removeClass('gray').end().siblings().find('img').addClass('gray')
        }
    })

    $('.mabout4 .swiper-container').on('touchstart',function(){
        mySwiper.stopAutoplay();
    })
    $('.mabout4 .swiper-container').on('touchend',function(){
        mySwiper.startAutoplay();
    })
}
