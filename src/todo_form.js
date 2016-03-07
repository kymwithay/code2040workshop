var React = require('react');

var TodoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    // Get new author and text from the input fields
    var todo = this.refs.todo.value;

    // Do nothing if either input field is blank
    if (!todo) { return; }

    // Send new todo up one level to TodoApp component
    // so updated todos can be passed down again into TodoList component
    this.props.onTodoSubmit(todo);

    // Set input field back to empty
    this.refs.todo.value = '';
  },
  render: function () {
    return (
      <form className="todoForm" onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="To Do" ref="todo" />
        <button type="submit" className="btn btn-info">Add Todo</button>
      </form>
    );
  }
});

module.exports = TodoForm;