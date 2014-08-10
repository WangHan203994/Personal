/**
 * Created by hanwang203994 on 14-4-29.
 */
(function ( window, $ ,sohuHD ) {
    var win = $(window);

    var defaults = {
        container : win, //���¼��Ķ���
        imgArray : [],
        attr: "lazySrc",
        bindEvents: [ "resize" , "scroll" ], //����tab�л�������Ԫ��չ���ˣ������һ��click�¼�
        initInvisibleImg : false , //�������Ƿ���Ҫ�����ɼ���ͼ��trueʱ��hiddenͼƬ��ʹ�ڿɼ�����Ҳ������ͼƬ��false����֮�෴��
        timeout: 200
    };

    defaults.imgArray = $(document.body).find("img");

    /**
     * options��ϸ������ο�defaults
     * ��switchTab�д���ͼƬ����ʱinitInvisibleImg������Ϊtrue,������bindEvents�����click�¼���
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
        //��ͼƬarrayת��Ϊһ������
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
                    //����ͼƬ���������ˣ������������¼�
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
             * ��ȻinitInvisibleImg���ж�д����������Щ�ظ�������������Ч������ѭ����if���ж�������
             * ��loadImg�ᱻ�������õ�����£�Ӧ�û����е��õİɡ�
             * �����жα�ע�˵Ĵ������initInvisibleImg����ѭ�����жϵ�Ч����
             * **/
            if(tp.initInvisibleImg){
                //���ɼ�Ԫ���ڿɼ�ʱ�ż���ͼƬ��
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

