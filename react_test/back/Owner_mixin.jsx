/**
 * Author : ginko
 * Date : 15/12/4
 * Description :
 */
import React from 'React';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import TodoItem from './TodoItem.jsx';

const Owner = React.createClass({
    mixins : [ LinkedStateMixin ],
    getInitialState(){
        return{
            todoItems:[
                {
                    task : 'Lear React'
                },
                {
                    task : 'Learn Webpack'
                },
                {
                    task : 'Conquer World'
                }
            ],
            owner : 'John Doe'
        }
    },
    updateOwner( e ){
        this.setState({
            owner : e.target.value
        });
    },
    render(){
        let todoItems = this.state.todoItems;
        let owner = this.state.owner;

        return(
            <div>
                <div className="ChangeOwner">
                    <input
                        type="text"
                        valueLink={ this.linkState('owner')}
                    />
                </div>
                <div className="TodoItems">
                    <ul>{ todoItems.map( ( todoItem , i ) =>
                    <li key = { 'todoitem' + i }>
                        <TodoItem owner = { owner } task={ todoItem.task } />
                    </li>
                        )}</ul>
                </div>
            </div>
        );
    }
});

module.exports = Owner;
export default Owner;