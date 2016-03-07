var React = require('react');
var ReactDOM = require('react-dom');

var TodoApp = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  loadTodosFromServer: function () {
    // GET updated set of todos from database
    $.get(this.props.url, function (todos) {
        this.setState({ data: todos });
      }.bind(this)
    );
  },
  handleTodoSubmit: function (todo) {
    var todo = { checked: false, todo: todo };

    // POST to add todo to database
    $.post(this.props.url, todo, function (todos) {
        this.setState({ data: todos });
      }.bind(this)
    );
  },
  componentDidMount: function () {
    // Set this.state.data to most recent set of todos from database
    this.loadTodosFromServer();
  },
  render: function () {
    return (
      <div className="twitter">
        <h1>To Do List</h1>
        <TodoForm onTodoSubmit={ this.handleTodoSubmit } />
        <TodoList data={ this.state.data } />
      </div>
    );
  }
});

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
      <form className="tweetForm" onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="To Do" ref="todo" />
        <button type="submit" className="btn btn-info">Add Todo</button>
      </form>
    );
  }
});

var TodoList = React.createClass({
  render: function () {
    var todosData = this.props.data;
    var todoNodes = todosData.map(function (todo) {
      return <Todo todo={ todo.todo } checked={ todo.checked } />
    });

    return (
      <div className="todoList">
        { todoNodes }
      </div>
    );
  }
});

var Todo = React.createClass({
  render: function () {
    return (
      <div className="tweet">
        <input type="checkbox" checked={ this.props.checked === "true" ? true : false } />
        <span>{ this.props.todo }</span>
      </div>
    );
  }
});

ReactDOM.render(
  <TodoApp url="todos.json" />,
  document.getElementById('todo')
);
