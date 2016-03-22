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
        this.setState({ data: todos.data });
      }.bind(this)
    );
  },
  unCheckTodo: function(todo) {
    // Make current todo checked/ unchecked
    $.ajax({
      url: this.props.url + '/id/' + todo.id, 
      type: 'PUT', 
      data: {checked: false}, 
      success: function (response) {
        var updatedTodo = response.data;

        var clonedTodosData = JSON.parse(JSON.stringify(this.state.data));
        var newTodosData = clonedTodosData.filter(function(todo) {
          return todo.id !== updatedTodo.id;
        }).concat(updatedTodo);

        this.setState({ data: newTodosData });
      }.bind(this)
    });
  },
  checkTodo: function(todo) {
    // Make current todo checked/ unchecked
    $.ajax({
      url: this.props.url + '/id/' + todo.id, 
      type: 'PUT', 
      data: {checked: true}, 
      success: function (response) {
        var updatedTodo = response.data;

        var clonedTodosData = JSON.parse(JSON.stringify(this.state.data));
        var newTodosData = clonedTodosData.filter(function(todo) {
          return todo.id !== updatedTodo.id;
        }).concat(updatedTodo);

        this.setState({ data: newTodosData });
      }.bind(this)
    });
  },
  handleTodoSubmit: function (todo) {
    var todo = { checked: false, text: todo };

    // POST to add todo to database
    $.post(this.props.url, todo, function (todos) {
      console.log('todos = ', todos);
        this.setState({ data: todos.data });
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
          handleCheck={ this.checkTodo } 
          title="To Do" 
          data={ this.state.data.filter(function(todo) { return !todo.checked }) } />
        <TodoList 
          handleCheck={ this.unCheckTodo } 
          title="Done" 
          data={ this.state.data.filter(function(todo) { return todo.checked }) } />
      </div>
    );
  }
});

ReactDOM.render(
  <TodoApp url="/api/v1/task" />,
  document.getElementById('todo')
);
