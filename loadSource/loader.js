/**
 * Created by hanwang203994 on 2014/7/30.
 */
(function(global){
    var head = document.getElementsByTagName('head')[0] || document.documentElement;

    var isCss = function ( url ){
        return /\.css(?=[\?#]|$)/i.test(url);
    };

    var isScript = function ( url){
        return /\.js(?=[\?#]|$)/i.test(url);
    };

    var loadCss = function( url , charset ){
        var node = document.createElement('link');
        node.setAttribute( 'type' , 'text/css' );
        node.setAttribute( 'rel' , 'stylesheet' );
        node.setAttribute( 'href' , url );
        if( charset ){
            node.charset = charset;
        }
        head.appendChild(node);

    };

    var loadScript = function( url , callback , async , charset , err , opts ){
        var script = document.createElement('script');
        script.setAttribute( 'type' , 'text/javascript' );
        script.setAttribute( 'async' , true );
        script.setAttribute( 'src' , url );
        if( charset ){
            node.charset = charset;
        }
        opts = opts || [];
        var done = false;
        script.onload = script.onreadystatechange = function(){
            if( !done && ( !this.readyState || this.readyState === "loaded" || this.readyState === "complete" )){
                done = true;
                if( callback ){
                    callback.apply( this , opts );
                }
                script.onload = script.onreadystatechange = null;
                if( err ){
                    script.onerror = err ;
                }
//                if( head && script.parentNode) head.removeChild(script);
            }
        };
        head.appendChild(script);
    };

    function loadSource( url , type , callback , charset , err , opts ){
        if(type === 'css' || isCss(url)){
            loadCss( url );
        }else if(type === 'script' || isScript(url)){
            loadScript( url , callback , charset , err , opts );
        }
    }

    global.loadSource = loadSource;

})(window);
