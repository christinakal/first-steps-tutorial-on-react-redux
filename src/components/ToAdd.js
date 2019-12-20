import React from "react";
import { connect } from "react-redux";

import { addTodo } from "../redux/action";

class ToAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStr: "",
      inputArr: []
    };
  }
  updateInput = input => {
    this.setState({ inputStr: input });
  };

  handleAddTodo = () => {
    this.props.addTodo(this.state.inputStr);
    this.setState({ inputStr: "" });
  };
  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.inputStr}
        />
        <button onClick={this.handleAddTodo}>add</button>
      </div>
    );
  }
}

export default connect(
    null ,
  { addTodo }
)(ToAdd);
