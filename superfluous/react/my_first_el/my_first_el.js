/**
 * @jsx React.DOM
 *
 */

var _times = 0;
var my_first_el = React.createClass({
  getInitialState: function() {
    return {
      clicks: 0
    };
  },
  render: function() {
    var name = (this.state && this.state.clicks) || 0;

    return (<div>
      <div>Click me!</div>
      <button onClick={this.handleClick}>{this.formatClicks(name)}</button>
    </div>);
  },
  formatClicks: function(n) {
    if (n == 0) {
      return "Hello World";
    }

    return "Clicked: " + n;
  },
  handleClick: function() {
    this.setState({clicks: this.state.clicks + 1 });
  }
});

module.exports = my_first_el;
