/**
 * Author : ginko
 * Date : 15/12/4
 * Description :
 */
import React from 'react';

const TodoItem = React.createClass({
    getInitialState(){
        return {
            likes: 0
        };
    },
    like(){
        this.setState({
            likes : this.state.likes + 1
        });
    },
    render(){
        let owner = this.props.owner;
        let task = this.props.task;
        let likes = this.props.likes;

        return(
            <div className="TodoItem">
                <span className="TodoItem-owner">{ owner }</span>
                <span className="TodoItem-task">{ task }</span>
                <span className="TodoItem-likes">{ likes }</span>
                <span className="TodoItem-like" onClick={ this.like }>Like</span>
            </div>
        );
    }
});

export default TodoItem;
module.exports = TodoItem;