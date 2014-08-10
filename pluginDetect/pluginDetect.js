 /**
 * Created by hanwang203994 on 2014/8/10.
 */
(function( global ){
    var ua = navigator.userAgent.toLowerCase().replace(/"/ig,'');
    var client = {
        browser: {
            'isIE' : null,
            'isLowIE' : /msie/.test(ua), //6-10
            'isIE6' : /msie 6/.test(ua),
            'isIE7' : /msie 7/.test(ua),
            'isIE8' : /msie 8/.test(ua),
            'isIE9' : /msie 9/.test(ua),
            'isOpera' : /(opera)(?:.*version)?[ \/]([\w.]+)/.test(ua),
            'isMoz' : /gecko\/([\d.]*)/.test(ua),
            'isFirefox' : /firefox\/([\d.]*)/.test(ua),
            'isWebkit' : /(webkit)[ \/]([\w.]+)/.test(ua),
            'isSafari' : !/chrome\/([\d.]*)/.test(ua) && /\/([\da-f.]*) safari/.test(ua),
            'isChrome' : /chrome\/([\d.]*)/.test(ua),
            'isUc' : /ucweb/i.test(ua),
            'ie': 0,
            'gecko' : 0,
            'webkit' : 0,
            'khtml' : 0,
            'opera' : 0,
            'ver' : null
        },
        clientType : {
            'isIpad' : /ipad/i.test(ua),
            'isIphone' : /iphone|ipod/i.test(ua),
            'isAndroid' : /android/i.test(ua),
            'isWP' : /(windows mobile)|(windows ce)/i.test(ua)
        }
    };

    var getClient = function(){
        if( global.opera ){
            client.browser.ver = window.opera.version();
            client.browser.opera = parseFloat(client.browser.ver);
        }else if( /applewebkit\/(\S+)/.test(ua) ){
            client.browser.ver = RegExp["$1"];
            client.browser.webkit = parseFloat(client.browser.ver);
        }else if( /khtml\/(\S+)/.test(ua) || /konqueror\/([^;]+)/.test(ua) ){
            client.browser.ver = RegExp["$1"];
            client.browser.khtml = parseFloat(client.browser.ver);
        }else if(/rv:([^\)]+)\)\sgecko\/\d{8}/.test(ua)){
            client.browser.ver = RegExp["$1"];
            client.browser.gecko = parseFloat(client.browser.ver);
        }else if(/rv:([^\)]+)\)/.test(ua)||/msie\s([^;]+)/.test(ua)){
            //win7 的ie11.0.10 ua是Mozilla/5.0 ("MSIE 10.0"; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; rv:11.0) like Gecko
            //win8的ie11 ua Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
            //ie这里好麻烦...http://msdn.microsoft.com/zh-cn/library/ie/hh869301(v=vs.85).aspx#ie11
            client.browser.isIE = true;
            client.browser.ver = RegExp["$1"];
            client.browser.ie = parseFloat(client.browser.ver);
            //用support判断是不是ie11..只有js可以这么干，后台就算了;ua可以篡改，但是support不能
            if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {
                // is IE11
                client.browser.isLowIE = false;
            }
        }

        return client;
    };

    var dectectPlugin = function (name){
        name = name.toLowerCase();

        if( client.browser.isLowIE ){
            try{
                new ActiveXObject(name);
                return true;
            }catch (e){
                return false;
            }

        }else{
            var navPlugins = navigator.plugins ,
                i , length;
            for( i = 0 , length = navPlugins.length ; i < length ; i ++ ){
                if( navPlugins[i].name.toLowerCase().indexOf(name) > -1 ){
                    return true;
                }
            }
            return false;
        }
    };

    var hasFlash = function(){
        return dectectPlugin('flash') || dectectPlugin('ShockwaveFlash.ShockwaveFlash');
    };

    global.client = getClient();
    global.client.dectectPlugin = dectectPlugin;
    global.client.hasFlash = hasFlash;

})( window );