var React = require('react');

var Todo = React.createClass({
  render: function () {
    return (
      <div className="todo">
        <input 
          ref={`checkbox-${this.props.todo.text}`}
          type="checkbox" 
          checked={ this.props.todo.checked } 
          onChange={ (e) => { this.props.handleCheck(this.props.todo) } } />
        <span style={ { fontSize: 18, textDecoration: 'underline' } }>
          { this.props.todo.text }
        </span>
      </div>
    );
  }
});

module.exports = Todo;