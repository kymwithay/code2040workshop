var React = require('react');
var Todo = require('./todo');

var TodoList = React.createClass({
  render: function () {
    var todosData = this.props.data;
    var todoNodes = todosData.map(todo => {
      return <Todo 
        todo={ todo } 
        handleCheck={ this.props.handleCheck } />
    });

    return (
      <div className="todoList">
        <h4>{ this.props.title }</h4>
        { todoNodes }
      </div>
    );
  }
});

module.exports = TodoList;