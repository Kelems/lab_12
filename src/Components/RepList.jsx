import React from "react";
import Repo from "./Repo";

export default class ReposList extends React.Component {
  render() {
    return (
      <div id="repos">
        {this.props.data.map((repo, index) => {
          return (
            <Repo
              key={index}
              avatar={repo.owner.avatar_url}
              login={repo.owner.login}
              url={repo.url}
              name={repo.name}
            />
          );
        })}
      </div>
    );
  }
}
