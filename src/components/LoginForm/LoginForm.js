import React, { Component } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

import { Button } from "../Utils/Utils";

import "./LoginForm.css";

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = { error: null };

  handleSubmitJwtAuth = event => {
    event.preventDefault();
    this.setState({ error: null });
    const { user_email, password } = event.target;

    AuthApiService.postLogin({
      user_email: user_email.value,
      password: password.value
    })

      .then(res => {
        user_email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>

        <div className="user_email">
          <input
            required
            type="email"
            name="user_email"
            className="LoginForm__input"
            id="LoginForm__user_email"
            placeholder="Email"
          />
        </div>
        <div className="password">
          <input
            required
            name="password"
            type="password"
            className="LoginForm__input"
            id="LoginForm__password"
            placeholder="Password"
          />
        </div>
        <Button type="submit">Log in</Button>
      </form>
    );
  }
}
