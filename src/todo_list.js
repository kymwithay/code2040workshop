var React = require('react');

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

var Todo = React.createClass({
  render: function () {
    return (
      <div className="todo">
        <input 
          ref={`checkbox-${this.props.todo.text}`}
          type="checkbox" 
          checked={ this.props.todo.checked === "true" } 
          onChange={ this.props.handleCheck } />
        <span>{ this.props.todo.text }</span>
      </div>
    );
  }
});

module.exports = TodoList;