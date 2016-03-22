JIRA Task #3: 

Add in todo_app.js after line 74:

<TodoList 
	handleCheck={ this.unCheckTodo } 
	title="Done" 
	data={ this.state.data.filter(function(todo) { return todo.checked }) } />