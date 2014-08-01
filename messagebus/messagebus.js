/**
 * Created by hanwang203994 on 2014/7/29.
 */
/*
*
* topic,handler,data,scope
*
* */
(function(global){
    var applyIf = function( source , target ){
        if(source){
            for( var p in target){
                typeof source[p] == 'undefined' && (source[p] = target[p]);
            }
        }
        return source;
    };

    var doCall = function( handler , data , scope , msg ){
        if( typeof  handler == 'function' ){
            handler.call( scope || global , data , msg );
        }
    };

    function MessageBus(config){
        this.config = config || {} ;
        this.topics = {};
    }

    applyIf( MessageBus.prototype , {
        version : '1.0',
        publish : function( topic , msg ){
            if( topic ){
                this.topics[topic] = { msg : msg };
            }
        },
        subscribe : function( topic , handler , data , scope , once ){
            var item = this.topics[ topic ];
            if( item ){
                if(once){
                    doCall( handler , data , scope , item.msg );
                    delete this.topics[topic];
                }else{
                    item.handler = handler;
                    item.scope = scope || global ;
                    item.data = data;
                    doCall( handler , data , scope , item.msg );
                }
            }
        },
        unsubscribe : function(topic){
            var item = this.topics[topic];
            if(item){
                item.handler = undefined;
                item.scope = undefined;
                item.data = undefined;
            }
        }
    } );

    global.MessageBus = MessageBus();
    global.messagebus = new MessageBus();
})( global );

global.messagebus.publish('TestTopic','publish msg');
global.messagebus.subscribe( 'TestTopic' , function( data , msg ){
    console.log( ' data = ' + data );
    console.log( ' msg = ' + msg );
} , 'subscribe data' , global , true );

global.messagebus.subscribe( 'TestTopic' , function( data , msg ){
    console.log( ' data = ' + data );
    console.log( ' msg = ' + msg );
} , 'subscribe data1' , global);