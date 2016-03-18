var React = require('react');
var ReactDOM = require('react-dom');
var TodoForm = require('./todo_form');
var TodoList = require('./todo_list');

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
    var currentDate = new Date();
    var todo = { checked: false, text: todo, date: currentDate };

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
      <div className="todoApp">
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

ReactDOM.render(
  <TodoApp url="todos.json" />,
  document.getElementById('todo')
);
