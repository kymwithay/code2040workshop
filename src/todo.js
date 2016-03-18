var React = require('react');

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
        <div style={{marginLeft: 10, fontSize: 10, fontStyle: 'italic'}}>- Added { this.props.todo.date }</div>
      </div>
    );
  }
});

module.exports = Todo;