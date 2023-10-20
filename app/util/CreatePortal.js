import React from "react";
import { createPortal } from "react-dom";

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.node = props.node;
    document.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      <div className="dialog">{this.props.children}</div>,
      this.node
    );
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
}
