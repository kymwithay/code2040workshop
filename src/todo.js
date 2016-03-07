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
  handleCheck: function(e) {
    // Make current todo checked/ unchecked
    // Send updated todo to server
    // Refetch all todos from server; set TodoApp's state to response
    console.log('handleCheck', e.target);
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
        <TodoList 
          handleCheck={ this.handleCheck } 
          title="To Do" 
          data={ this.state.data.filter(todo => todo.checked === "false") } />
        <TodoList 
          handleCheck={ this.handleCheck } 
          title="Done" 
          data={ this.state.data.filter(todo => todo.checked === "true") } />
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
    var todoNodes = todosData.map(todo => {
      return <Todo 
        todo={ todo } 
        handleCheck={ this.props.handleCheck } />
    });

    return (
      <div className="todoList">
        <h2>{ this.props.title }</h2>
        { todoNodes }
      </div>
    );
  }
});

var Todo = React.createClass({
  render: function () {
    return (
      <div className="tweet">
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

ReactDOM.render(
  <TodoApp url="todos.json" />,
  document.getElementById('todo')
);
