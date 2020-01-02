import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Section } from "../components/Utils/Utils";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <Section className="RegistrationPage">
        <h2>Create an Account</h2>
        <h4>
          Already a member? <Link to="/login">Sign in!</Link>
        </h4>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </Section>
    );
  }
}