/**
 * Created by hanwang203994 on 2014/7/29.
 */
/*
*
* topic,handler,data,scope
*
* */
(function(global){
    var id = 0;
    var applyIf = function( source , target ){
        if(source){
            for( var p in target){
                typeof source[p] == 'undefined' && (source[p] = target[p]);
            }
        }
        return source;
    };

    var generateID = function(prefix){
        return prefix+'_'+(++id);
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
            var item = this.topics[ topic ];

            if(!item){
                this.topics[topic] = { msg : msg , pubTag : true , handlers : {} };
            }else if( this.config.cache ){
                var handlers = item.handlers;

                for(var h in handlers){
                    h = handlers[h];
                    doCall( h.handler , h.data , h.scope , msg );
                }
            }
        },
        subscribe : function( topic , handler , data , scope , config ){
            this.config = config;
            var sid = generateID(topic);
            var item = this.topics[ topic ];
            var h = { handler : handler , data : data , scope : scope };
            if( !item ){
                //消息发布过，就只调用当前方法
                this.topics[ topic ] = { pubTag : false , handlers : {}};
                item = this.topics[ topic ];
            }

            if( item.pubTag ){
                item.handlers[sid] && ( item.handlers[sid] = h );
                doCall( handler , data , scope ,item.msg );
            }else{
                item.handlers[ sid ] = h;
            }

            return sid;

        },
        unsubscribe : function( sid ){
            var strs = sid.split('_');
            if( !strs || strs.length != 2){
                return;
            }

            var topic = strs[0];
            var item = this.topics[topic];
            delete item.handlers[sid];
        }
    } );

    global.MessageBus = MessageBus();
    global.messagebus = new MessageBus();
})( global );


global.messagebus.subscribe( 'TestTopic' , function( data , msg ){
    console.log( ' data1 = ' + data );
    console.log( ' msg1 = ' + msg );
} , 'subscribe data' , global);

global.messagebus.subscribe( 'TestTopic' , function( data , msg ){
    console.log( ' data2 = ' + data );
    console.log( ' msg2 = ' + msg );
} , 'subscribe data1' , global , { cache : true } );
global.messagebus.publish('TestTopic','publish msg');
console.log('================');
global.messagebus.unsubscribe('TestTopic_1');
global.messagebus.publish('TestTopic','publish msg');
