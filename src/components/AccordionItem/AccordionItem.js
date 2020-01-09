import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AccordionItem extends Component {
  render() {
    const { goalTitle, id } = this.props;
    return (
      <Link to={`/myhives/${id}`} className="HiveNavItem">
        <button className="HiveNavItem__title">{goalTitle}</button>
      </Link>
    );
  }
}
