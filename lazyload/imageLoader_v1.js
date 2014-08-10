/**
 * Created by hanwang203994 on 14-4-29.
 */
(function ( window, $ ,sohuHD ) {
    var win = $(window);

    var defaults = {
        container : win, //绑定事件的对象
        imgArray : [],
        attr: "lazySrc",
        bindEvents: [ "resize" , "scroll" ], //比如tab切换有隐藏元素展现了，再添加一个click事件
        initInvisibleImg : false , //懒加载是否需要处理不可见的图。true时，hidden图片即使在可见区域也不加载图片；false则与之相反。
        timeout: 200
    };

    defaults.imgArray = $(document.body).find("img");

    /**
     * options详细设置请参考defaults
     * 用switchTab有大量图片加载时initInvisibleImg可设置为true,并且在bindEvents中添加click事件。
     * */
    function ImageLoader(options) {
        this.imgArray = options && options.imgArray || defaults.imgArray;
        this.attr = options && options.attr || defaults.attr;
        this.timeout = options && options.timeout || defaults.timeout;
        this.bindEvents = options && options.bindEvents || defaults.bindEvents;
        this.container = options && options.container || defaults.container;
        this.initInvisibleImg = options && options.initInvisibleImg || defaults.initInvisibleImg;
    }

    $.extend(ImageLoader.prototype, {
        init: function () {
            this.initImageObj();
            this.initEvent();
        },
        //将图片array转换为一个对象
        initImageObj: function () {
            var tp = this;
            if (!tp.imgArray || !tp.imgArray.length) {
               return;
            }else{
                tp.imagesObj = {};
                var i = 0;
                for (; i < tp.imgArray.length; i++) {
                    tp.imagesObj[i] = tp.imgArray[i];
                }
                tp.loadImg();
            }
        },

        initEvent: function () {
            var tp = this;
            var eventHandler = function(){
                if ($.isEmptyObject(tp.imagesObj)) {
                    //所有图片都加载完了，解绑所有相关事件
                    $.each(tp.bindEvents , function( index , item ){
                        tp.container.unbind( item );
                    });
                    tp.imgArray = null;
                    return;
                } else {
                    if (tp.timer) {
                        clearTimeout(tp.timer);
                        tp.timer = null;
                    }
                    tp.timer = setTimeout(function () {
                        tp.loadImg();
                    }, tp.timeout);
                }
            };

            $.each( tp.bindEvents , function(index ,item ){
                tp.container.bind( item , eventHandler );
            });
        },
        loadImg: function () {
            var tp = this;
            /**
             * 虽然initInvisibleImg的判断写在外层代码有些重复，但是这样有效减少了循环里if的判断条件。
             * 在loadImg会被反复调用的情况下，应该还是有点用的吧。
             * 下面有段被注了的代码就是initInvisibleImg放在循环内判断的效果。
             * **/
            if(tp.initInvisibleImg){
                //不可见元素在可见时才加载图片。
                for( var key in tp.imagesObj ){
                    var curImg = $( tp.imagesObj[ key ] );
                    if ( tp.windowView(curImg) && curImg.is( ":visible" )) {
                        var url = curImg.attr(tp.attr);
                        curImg.attr("src", url).removeAttr(tp.attr);
                        delete  tp.imagesObj[key];
                    }
                }
            }else{
                for( var key in tp.imagesObj ){
                    var curImg = $( tp.imagesObj[ key ] );
                    if ( tp.windowView(curImg) ) {
                        var url = curImg.attr(tp.attr);
                        curImg.attr("src", url).removeAttr(tp.attr);
                        delete  tp.imagesObj[key];
                    }
                }
            }
//            for( var key in tp.imagesObj ){
//                var curImg = $( tp.imagesObj[ key ] );
//                if ( tp.windowView(curImg) && ( (tp.initInvisibleImg && curImg.is( ":visible" )) || !tp.initInvisibleImg ) ) {
//                    var url = curImg.attr(tp.attr);
//                    curImg.attr("src", url).removeAttr(tp.attr);
//                    delete  tp.imagesObj[key];
//                }
//            }
//            console.log(tp.imagesObj);
        },
        windowView : function( image ){
        // window variables
        var winHeight = win.height(),
            winWidth		 = win.width(),

            winTop		 = win.scrollTop(),
            winBottom 	 = winTop + winHeight,
            winLeft	 	 = win.scrollLeft(),
            winRight		 = winLeft + winWidth,

            imageHeight		 = image.height(),
            imageWidth	 	 = image.width(),

            imageTop		 = image.offset().top,
            imageBottom		 = imageTop + imageHeight,
            imageLeft		 = image.offset().left,
            imageRight	 	 = imageLeft + imageWidth;

        return (((winBottom >= imageTop) && (winTop <= imageTop)) || ((winBottom >= imageBottom) && (winTop <= imageBottom))) &&
            (((winRight >= imageLeft) && (winLeft <= imageLeft)) || ((winRight >= imageRight) && (winLeft <= imageRight)));
        }
    });
    sohuHD.ImageLoader = ImageLoader;

    $.fn.extend({
        lazyLoadImgs : function( options ){
            var tempImgsArray =  this ;
            if( tempImgsArray.get(0) && tempImgsArray.first().is('img') ){
                options.imgArray = tempImgsArray;
            }else{
                options.imgArray = $(this).find('img');
                options.container = $(this);
            }

            new ImageLoader( options ).init();
            return this;

        }
    });
//    console.log($('.img').lazyLoadImgs);

})( window , jQuery , sohuHD );

