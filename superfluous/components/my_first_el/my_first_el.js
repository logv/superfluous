/**
 * @jsx React.DOM
 *
 */

var my_first_el = React.createClass({
  render: function() {
    return <div>
      <button onClick={this.handleClick}>Hello world</button>
      <div>Testing</div>
    </div>;
  },
  handleClick: function() {
    console.log("CLICKED!");
  }
});

module.exports = my_first_el;
