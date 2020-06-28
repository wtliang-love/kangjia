(function($) {
    $.fn.extend({
        slider: function(options) {
            // 函数式编程
            let main = null, // 主函数
                init = null, // 初始化
                start = null, // 开始动画
                stop = null, // 停止动画
                prev = null, // 上一张
                next = null, // 下一张
                timer = null, // 计时器
                listBtn = null,//翻页点
                left = null,
                elms = {}, // 命名空间 存储元素
                defaults = {
                    speed: 500, // 动画速度
                    delay: 3000, // 延迟时间  展示使用
                    viewWidth: 1000,//
                    viewHeight:500
                };


            $.extend(defaults, options); // 合并参数

            init = function() {
                // 1. 元素选取
                elms.sliderDiv = this.children('div'); // 选择滑动的div
                elms.btns = this.children('span'); // 选择按钮
                // 增加翻页点
                for(let i=0;i<elms.sliderDiv.children('img').length;i++){
                    this.children('ul').append($('<li></li>'));
                }
                elms.lis = this.children('ul').children('li');
                //设置放翻页点的ul的宽度
                this.children('ul').css('width',`${(elms.sliderDiv.children('img').length) * 50}px`)
                
                // 克隆第一张图片
                elms.sliderDiv.append(elms.sliderDiv.children('img').first().clone()); 
                //设置轮播图外框的大小,
                this.css('width',defaults.viewWidth);
                this.css('height',defaults.viewHeight);
                elms.sliderDiv.children('img').css('width',defaults.viewWidth)
                this.children('.outside').css('width',defaults.viewWidth*elms.sliderDiv.children('img').length)

                //  索引 用于记录当前图片的索引
                elms.index = 1; // 第一张图片


                
                
                



                // 事件绑定
                this.hover(function() {
                    stop();
                }, function() {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                });

                //点击上下翻页
                elms.btns.on('click', function() {
                    if (elms.btns.index(this)) {
                        next();
                    } else {
                        prev();
                    }
                });


                //翻页点
                elms.lis.on('mouseover',function(){
                    
                    elms.index = elms.lis.index(this)+1;
                    let left =elms.lis.index(this)*defaults.viewWidth;
                    elms.sliderDiv.css('left',`-${left}px`)
                    listBtn()

                })


            }.bind(this);

            

            start = function(direction) {
                
                let left = `-=${defaults.viewWidth}px`; // 设置移动的距离


                if (!direction) {
                    left = `+=${defaults.viewWidth}px`;
                    if (elms.index === 1) { // 判断当前为第一张图片
                        elms.index = elms.sliderDiv.children('img').length  ; // 切换到第四张图片
                        let divLeft = this.offset().left,
                            imgLeft = elms.sliderDiv.children('img').last().offset().left;
                        elms.sliderDiv.css('left', `-${imgLeft - divLeft}px`);
                    }
                }

                
                
                elms.sliderDiv.animate({
                    left: left,
                }, defaults.speed, function() {

                    if (direction) elms.index++;
                    else elms.index--;
                    listBtn()
                    if (elms.index === elms.sliderDiv.children('img').length) { // 判断到达最后一张图片
                        elms.index = 1; // 将索引设置为1
                        elms.sliderDiv.css('left', 0); //  将定位设置为0
                    }
                });
                
            }.bind(this);

            prev = function() {
                stop();
                start(0);
            }

            next = function() {
                stop();
                start(1);
            }

            stop = function() {
                elms.sliderDiv.stop(true, true);
                clearInterval(timer);
            }

            listBtn = function(){
                if(elms.index == elms.sliderDiv.children('img').length){
                    $(elms.lis[0]).addClass('show').siblings().removeClass('show');
                }
                $(elms.lis[elms.index-1]).addClass('show').siblings().removeClass('show');
            }


            main = function() {
                
                init();
                listBtn();
                timer = setInterval(start.bind(null, 1), defaults.speed + defaults.delay); 
            }

            main();
        }
    });
})(jQuery);