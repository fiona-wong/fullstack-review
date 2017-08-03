import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
      {props.repos.map((repo, index) => (
	      <li><a key={index} href={repo.url}>{repo.name}</a></li>
      ))}
    </ul>
  </div>
)

export default RepoList;