import "./styles.css"

import { Component } from "react";
import P from "prop-types";

export class Button extends Component {
  render() {
    const { text, onClick, disabled } = this.props;

    return (
      <button className="button" onClick={onClick} disabled={disabled}>
      {text}
      </button>
    )
  }
}

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool.isRequired
}
