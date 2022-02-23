import React from 'react';
import { gql, useQuery } from '@apollo/client';

import UserHeader from '../components/UserHeaderForGraphQL';
import ReposList from '../components/ReposListForGraphQL';

/*
 * Caution!!!  This is not a safe way to incorporate an authentication token
 * into your app.  The token will be readable by anyone who runs the code.
 * We're doing it this way for ease of demonstration only.
 */
const token = process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;
const login = 'octocat';

const QUERY = gql`
query userDashboardQuery($login: String!) {
  user(login: $login) {
    name
    url
    avatarUrl(size: 96)
    repositories(first: 10, orderBy: {
      field: UPDATED_AT,
      direction: DESC
    }) {
      nodes {
        name
        url
        issues(first: 3, states: OPEN, orderBy: {
          field: CREATED_AT,
          direction: DESC
        }) {
          nodes {
            title
            url
            createdAt
          }
        }
      }
    }
  }
}
`

export default function UserIssuesDashboard() {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { login: "robwhess" }
  });
  console.log("== data:", data);
  return (
    <div>
      {token ? (
        <>
          <p>Let's work on loading some data...</p>
        </>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  );
}
