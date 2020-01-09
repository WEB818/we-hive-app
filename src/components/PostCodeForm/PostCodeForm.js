import React, { Component } from "react";
import HiveContext from "../../context/HiveContext";
import HiveApiService from "../../services/hive-api-service";
import { Button } from "../Utils/Utils";

export default class PostCodeForm extends Component {
  static defaultProps = {
    onAddCode: () => {}
  };

  static contextType = HiveContext;

  handleCodeSubmit = ev => {
    ev.preventDefault();
    const { hiveId } = this.props;
    const { code } = ev.target;

    HiveApiService.postCode(hiveId, code.value)
      .then(this.context.setCode)
      .then(() => {
        code.value = "";
        this.props.onAddCode();
      })
      .catch(this.context.setError);
  };
  render() {
    return (
      <form className="PostCodeForm" onSubmit={this.handleCodeSubmit}>
        <input name="code" type="text" required />
        <Button type="submit">Save password</Button>
      </form>
    );
  }
}
