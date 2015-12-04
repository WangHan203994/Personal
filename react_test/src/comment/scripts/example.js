/**
 * Author : yingu
 * Date : 15/12/1
 * Description : 注释
 */

//var data = [
//    { id : 1 , author : "Tester1" , text : "Tester1 text" , suffix : '(tt1)'},
//    { id : 2 , author : "Tester2" , text : "Tester2 text" , suffix : '(tt2)'}
//];

//从父组件传入的数据会做为子组件的 属性（ property ） ，这些 属性（ properties ） 可以通过 this.props 访问到。使用属性（ props ），我们就可以读到从 CommentList 传到 Comment 的数据，然后渲染一些标记：
var Comment = React.createClass({
    //rawMarkup : function(){
    //    var rawMarkup = this.props.text + '&nbsp;<i style="color:red">'+ this.props.suffix+'</i>';
    //    console.log( this );
    //    console.log( this.props.author );
    //    console.log( this.props.children );
    //
    //    return { __html: rawMarkup };
    //},
    render : function(){

        //console.log( this );
        //console.log( this.props.author );
        //console.log( this.props.children );

        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    { this.props.author }
                </h2>
                { this.props.children }
            </div>
        );
    }
});

//在 JSX 中，通过使用大括号包住一个 JavaScript 表达式（例如作为属性或者儿子节点），你可以在树结构中生成文本或者 React 组件。我们通过 this.props 来访问传入组件的数据，键名就是对应的命名属性，也可以通过 this.props.children 访问组件内嵌的任何元素。
var CommentList = React.createClass({
    render : function(){
        var commentNodes = this.props.data.map(function (comment) {
            console.log(comment);
            return (
                <Comment author={ comment.author } key={ comment.id }>
                    { comment.text }
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit : function( e ){
        e.preventDefault();
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();

        if( !text || !author ){
            return;
        }

        this.props.onCommentSubmit({ author: author , text : text });
        this.refs.author.value = '';
        this.refs.text.value = '';

        return;
    },
    render : function(){
        return (
            <form className="commentForm" onSubmit={ this.handleSubmit }>
                <input type="text" placeholder="Your name" ref="author"/>
                <input type="text" placeholder="say something" ref="text"/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState : function(){
        return { data : [] }
    },
    loadCommentsFromServer : function(){
        $.getScript(
            this.props.url ,
            function(){
                this.setState( { data : data || [] });
            }.bind(this)
        );
    },
    handleCommentSubmit: function( comment ){
        $.ajax({
            url : this.props.url,
            dataType : 'json',
            type : 'POST',
            data : comment,
            success : function( data ){
                this.setState( { data : data || [] } );
            }.bind( this ),
            error : function( xhr , status , err ){
                console.log( this.props.url , status , err.toString() );
            }.bind( this )
        });
    },
    componentDidMount : function(){
        this.loadCommentsFromServer();
        setInterval( this.loadCommentsFromServer , this.props.pollInterval );
    },
    render : function(){
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={ this.state.data }/>
                <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
            </div>
        );
    }
});

//ReactDOM.render(
//    <CommentBox data={ data }/>,
//   document.getElementById('comment')
//);

ReactDOM.render(
    <CommentBox url="scripts/data.js" pollInterval={5000}/>,
    document.getElementById('comment')
);
