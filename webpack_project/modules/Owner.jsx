/**
 * Author : ginko
 * Date : 15/12/4
 * Description :
 */

import React from 'react';
import TodoItem from './TodoItem.jsx';

module.exports = React.createClass({
    getInitialState() {
        return {
            todoItems: [
                {
                    task: 'Learn React'
                },
                {
                    task: 'Learn Webpack'
                },
                {
                    task: 'Conquer World'
                }
            ],
            owner: 'John Doe'
        };
    },

    render() {
        var todoItems = this.state.todoItems;
        var owner = this.state.owner;

        return <div>
            <div className='ChangeOwner'>
                <input type='text' defaultValue={owner} onChange={this.updateOwner} />
            </div>

            <div className='TodoItems'>
                <ul>{todoItems.map((todoItem, i) =>
                <li key={'todoitem' + i}>
                    <TodoItem owner={owner} task={todoItem.task} />
                </li>
                    )}</ul>
            </div>
        </div>;
    },

    updateOwner( e ) {
        this.setState({
            owner: e.target.value
        });
    }
});