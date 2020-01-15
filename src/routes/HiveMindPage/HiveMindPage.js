import React, { Component } from "react";
import Moment from "react-moment";

import { Link } from "react-router-dom";
import { Button, Section } from "../../components/Utils/Utils";
import HiveContext from "../../context/HiveContext";
import HiveApiService from "../../services/hive-api-service";
import BeeIcon from "../../images/bee-icon.png";
import "./HiveMindPage.css";

export default class HiveMindPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      goForward: () => {}
    }
  };

  static contextType = HiveContext;

  componentDidMount() {
    const { hiveId } = this.props.match.params;
    this.context.clearError();
    HiveApiService.getHive(hiveId)
      .then(this.context.setHive)
      .catch(this.context.setError);
    HiveApiService.getActivity(hiveId)
      .then(this.context.setActivity)
      .catch(this.context.setError);
  }

  renderHiveActivity() {
    const { activityList } = this.context;
    return (
      <>
        <HiveActivity activityList={activityList} />
      </>
    );
  }

  redirectToTarget = () => {
    this.props.history.push(`/hivemind`);
  };
  render() {
    const { hive } = this.context;

    return (
      <Section className="HiveMind__page">
        <h2 className="user-welcome-heading">Hive Mind</h2>
        <h2 className="Goal-desc"> {hive.goal_description}</h2>
        {hive.group_message && (
          <>
            <h4 className="sub-heading">Message from hive admin</h4>
            <div className="group-message">{hive.group_message}</div>
          </>
        )}

        {this.renderHiveActivity()}
        <Link to={`/myhives/${hive.id}`}>
          <Button type="submit" onClick={this.redirectToTarget}>
            Add Activity
          </Button>
        </Link>
      </Section>
    );
  }
}

function HiveActivity({ activityList = [] }) {
  return (
    <ul className="HiveMindPage__activity-list">
      {activityList.map(activity => (
        <li key={activity.id} className="HiveMindPage__activity">
          {activity.action && (
            <div className="HiveMindPage__activity-label-buzz">
              <span>
                <img className="bee" src={BeeIcon} alt="bee icon" />
                {"  "}
                {activity.user} created some <span className="buzz">buzz</span>{" "}
                on <Moment format="MM/DD/YYYY">{activity.date_added}</Moment>
              </span>
            </div>
          )}
          {activity.action && (
            <div className="HiveMindPage__activity-text buzz-text">
              {activity.action}
            </div>
          )}
          {activity.notes && (
            <div className="HiveMindPage__activity-label-notes">
              {activity.user} commented on{" "}
              <Moment format="MM/DD/YYYY">{activity.date_added}</Moment>
            </div>
          )}
          {activity.notes && (
            <div className="HiveMindPage__activity-text notes-text">
              {activity.notes}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
