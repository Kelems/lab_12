import React from "react";

export default function Repo(props) {
  return (
    <li class="list-group-item">
      <tr>
        <td>
          <img src={props.avatar} alt="avatar" />
        </td>
        <td>
          <p className="login">{props.login}</p>
        </td>
        <td>
          <a className="url" href={props.url}>
            {props.name}
          </a>
        </td>
      </tr>
    </li>
  );
}
