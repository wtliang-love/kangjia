
// 引入轮播图
$(function() { 
    $('.banner_pic').slider({
        delay: 2000,
        viewWidth: innerWidth,
        viewHeight:500
    });
    //使轮播图无视文档宽度始终居中
    $('.banner_pic').css('left',-0.5 * innerWidth)
});




// 轮播图居中
