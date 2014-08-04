/**
 * Created by hanwang203994 on 2014/8/4.
 */
(function( global ){

    /**
     * addParam( url , { key : value ...} )
     * addParam( url , key , value )
     *
     * **/
    var addUrlParam = function( url , params ){
        var paramStr = '';
        if( typeof params == 'object'){
            for( var key in params){
                if( params.hasOwnProperty(key) ){
                    paramStr += ( key + '=' + params[ key ] + '&' )
                }
            }
            paramStr = paramStr.substr( 0 , paramStr.length - 1 );

        }else if( arguments.length == 3){
            paramStr = params + '=' + arguments[2];
        }

        if( /\?/.test(url)){
            return url + '&' + paramStr;
        }else{
            return url + '?' + paramStr;
        }
    };

    var _update = function( needAdd , url , key , value ){
        var tempUrl = url;
        var reg = new RegExp('(' + key + '\\=)([^&]+)' , 'ig');
        url = url.replace( reg , key + '=' + value );

        //没有该参数是否直接add
        if( needAdd && tempUrl == url ){
            url = addUrlParam( url , key , value );
        }
        return url;
    };

    /**
     * updateUrlParam( needAdd , url , { key : value ...} )
     * updateUrlParam( needAdd , url , key , value )
     * */
    var updateUrlParam = function( needAdd , url , params ){
        if( typeof params == 'object' ){
            for( var key in params){
                if( params.hasOwnProperty(key) ){
                    url = _update( needAdd , url , key , params[key] );
                }
            }
        }else if( arguments.length == 4 ){
            url = _update( needAdd , url , params , arguments[3] );
        }

        return url;
    };

    var getUrlParam = function( url , key ){
        var result = url.match(new RegExp("[?&]" + key + "=([^&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    };

    /*
    * delUrlParam( url , key )
    * delUrlParam( url , [ key1 ,key2 ...] )
    * */
    var delUrlParam = function( url , keys ){
        var reg ;
        if( Object.prototype.toString.call( keys ) == '[object Array]' ){
            for( var i = 0 ; i < keys.length ; i ++ ){
                reg = new RegExp('(' + keys[i] + '\\=)([^&]+)' , 'ig');
                url = url.replace( reg , '' );
            }

        }else{
            reg = new RegExp('(' + keys + '\\=)([^&]+)' , 'ig');
        }

        url = url.replace( reg , '' );
        return url.replace( /(&)+/g , '&' ).replace( /(&)+$/g , '').replace( /\?(&)+/g , '?');
    };

    global.addUrlParam = addUrlParam;
    global.updateUrlParam = updateUrlParam;
    global.getUrlParam = getUrlParam;
    global.delUrlParam = delUrlParam;

} )( global );

//addUrlParam
console.log(global.addUrlParam('http://www.baidu.com/','test','t1'));
console.log(global.addUrlParam('http://www.baidu.com/?test=3',{ 'test':'t1' , 'test1':'t2'}));

//updataUrlParam
console.log(global.updateUrlParam( true , 'http://www.baidu.com/?test=3test&test=t1&test1=t2',{ test : 'update' , 'add' : 'add'}));
console.log(global.updateUrlParam( false , 'http://www.baidu.com/?test=3test&test=t1&test1=t2',{ test : 'update' , 'add' : 'add'}));
console.log(global.updateUrlParam( false , 'http://www.baidu.com/?2=t2','t2' , 'updatet2' ));
console.log(global.updateUrlParam( false , 'http://www.baidu.com/?t2=t2','t1' , 'add' ));
console.log(global.updateUrlParam( true , 'http://www.baidu.com/?t2=t2', 't1' , 'add' ));

//getUrlParam
console.log( global.getUrlParam('http://www.baidu.com/?test=update&test=update&test1=t2&add=add','test1') );
console.log( global.getUrlParam('http://www.baidu.com/?test=update&test=update&test1=t2&add=add','test') );
console.log( global.getUrlParam('http://www.baidu.com/?test=update&test=update&test1=t2&add=add','add') );

//delUrlParam
console.log( global.delUrlParam('http://www.baidu.com/?test=update&test=update&test1=t2&add=add' , 'test1' ) );
console.log( global.delUrlParam('http://www.baidu.com/?test=update&test=update&test1=t2&add=add' , 'add' ) );
console.log( global.delUrlParam('http://www.baidu.com/?test=update&test=update&test1=t2&add=add' , 'test' ) );
