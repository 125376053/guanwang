
function timeEffets(){
    var pwidth = $(".eventJiLu").find('p').innerWidth();//移动一个时间点的距离
    var plength = $(".eventJiLu").find('p').length;//可以移动的次数
    var num = 5;//默认移动的位置
    $(".eventJiLu").width(pwidth * plength)//最大宽度

    var screen=Math.floor($(".eventContent").width()/pwidth); //一屏幕可以放几个 4
    var canNum=plength-screen; //可移动几次 8

    //默认显示2017-2018的位置
    /*$(".eventJiLu").stop(true, true).animate({
        left: -pwidth * num + 'px'
    }, 1000)*/
    $("#timeRight").addClass('rightMo')
    $(".eventJiLu").stop(true, true).animate({
        left: -$(".eventJiLu").width()+$(".eventContent").width() + 'px'
    }, 1000)

    /*$("#timeLeft").click(function () {
        if (num <= 0) {
            num = 0
            $(this).addClass('leftMo')
        } else {
            num--
            $("#timeRight").removeClass('rightMo')
        }
        $(".eventJiLu").stop(true, true).animate({
            left: -pwidth * num + 'px'
        }, 1000)
    })
    $("#timeRight").click(function () {
        if (num >= canNum-1) {
            num = canNum-1;
            $(this).addClass('rightMo')
        } else {
            num++;
            $("#timeLeft").removeClass('leftMo')
        }

        $(".eventJiLu").stop(true, true).animate({
            left: -pwidth * num + 'px'
        }, 1000)
    })*/

    $("#timeLeft").click(function () {
        $("#timeRight").removeClass('rightMo')
        $(this).addClass('leftMo')
        $(".eventJiLu").stop(true, true).animate({
            left:0 + 'px'
        }, 1000)
    })

    $("#timeRight").click(function () {
        $("#timeLeft").removeClass('leftMo')
        $(this).addClass('rightMo')
        $(".eventJiLu").stop(true, true).animate({
            left: -$(".eventJiLu").width()+$(".eventContent").width() + 'px'
        }, 1000)
    })

    $(".eventJiLu p span").not('.yearRadio').hover(function (e) {
        var html = $(this).parent().find('i').html();
        $(".tishiModel").stop(true).slideDown(0);
        $(".tishiContent").html(html);

        $(this).addClass('yeRadio').parent().siblings().find('span').removeClass('yeRadio')

        var x = e.pageX; //鼠标坐标点 这个根据鼠标在元素上的位置有所改变
        var y = e.pageY;
        var oy = $(this).offset().top;
        var ox = $(this).offset().left; //当前元素偏移 这个值不会变 距离左边的距离 确定中心点用这个
        var ofw = $(".tishiModel").innerWidth(); //提示层实际宽度
        var ofh = $(".tishiModel").height();
        var consth = 40;
        $(".tishiModel").css({
            left:ox-ofw/2,
            top:oy-ofh-consth
        })

    }, function () {
        $(".tishiModel").hide().css({
            left:0,
            top:0
        })
        $(this).removeClass('yeRadio')
    })
}

function slideImg(){
    var pwidth = $("#imgsSlide").find('li').outerWidth(true);//移动一个时间点的距离
    var plength = $("#imgsSlide").find('li').length;//可以移动的次数
    var num = 0;//默认移动的位置
    $("#imgsSlide").width(pwidth * plength)//最大宽度

    var screen=Math.ceil($(".imgsContent").width()/pwidth); //一屏幕可以放几个 4
    var canNum=plength-screen; //可移动几次 8

    $(".changeImgs").hover(function(){
        $(".changeImgs").children('a').show()
    },function(){
        $(".changeImgs").children('a').hide()
    })

    $("#timeLeft1").click(function () {
        if (num <= 1) {
            num = 0
            $(this).addClass('leftMo1')
        } else {
            num--
            $("#timeRight1").removeClass('rightMo1')
        }
        $("#imgsSlide").stop(true, true).animate({
            left: -pwidth * num + 'px'
        }, 1000)
    })

    $("#timeRight1").click(function () {
        if (num >= canNum-1) {
            num = canNum;
            $(this).addClass('rightMo1')
        } else {
            num++;
            $("#timeLeft1").removeClass('leftMo1').addClass('leftHign1')
        }

        $("#imgsSlide").stop(true, true).animate({
            left: -pwidth * num + 'px'
        }, 1000)
    })

    $("#imgsSlide li").hover(function(){
        $(this).find('.inforDetail').stop(true,true).animate({
            'top':'0'
        },500)
    },function(){
        $(this).find('.inforDetail').stop(true,true).animate({
            'top':'380px',
        },500)
    })
}

function fullSlide(){
    var pwidth = $("#imgsSlide2").find('li').outerWidth(true);//移动一个的距离
    var plength = $("#imgsSlide2").find('li').length;//可以移动的次数
    var num = 0;//默认移动的位置
    $("#imgsSlide2").width(pwidth * plength)//总宽度

    var screen=Math.ceil($(".fengCaiContent").width()/pwidth); //一屏幕可以放几个 4
    console.log(screen);
    var canNum=plength-screen; //可移动几次 8
    var canMove=$("#imgsSlide2").width()-$(".fengCaiContent").width();//可移动最大距离

    $(".fengCai2").hover(function(){
        $(".fengCai2").children('a').show()
    },function(){
        $(".fengCai2").children('a').hide()
    })

    $(".fengCai2").children('a').hover(function(e){
        e.stopPropagation();
        $(".fengCai2").children('a').show()
    },function(){

    })

    $("#timeLeft2").click(function () {
        //alert(num)
        if (num == 0) {
            num = 0
            $(this).find('span').addClass('leftMo2')
            //$(this).hide()
        } else {
            num--
            $("#timeRight2").find('span').removeClass('rightMo2')
            //$("#timeRight2").show()
        }
        $("#imgsSlide2").stop(true, true).animate({
            /*left: -pwidth * num+52 + 'px'*/
            left: -pwidth * num + 'px'
        }, 1000)
    })

    $("#timeRight2").click(function () {
        //最后一次
        if (num>=canNum) {
            $(this).find('span').addClass('rightMo2')
            //$(this).hide()
            $("#imgsSlide2").stop(true, true).animate({
                /*left: -canMove-52+ 'px'*/
                left: -canMove+ 'px'
            }, 1000)
        } else {
            num++;
            $("#timeLeft2").find('span').removeClass('leftMo2').addClass('leftHign2')
            //$("#timeLeft2").show()
            $("#imgsSlide2").stop(true, true).animate({
                /*left: -pwidth * num+52 + 'px'*/
                left: -pwidth * num + 'px'
            }, 1000)
        }
    })

    $("#imgsSlide2 li").hover(function(){
        $(this).find('img').removeClass('gray')
    },function(){
        $(this).find('img').addClass('gray')
    })
}