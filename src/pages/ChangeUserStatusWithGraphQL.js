import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

/*
 * Caution!!!  This is not a safe way to incorporate an authentication token
 * into your app.  The token will be readable by anyone who runs the code.
 * We're doing it this way for ease of demonstration only.
 */
const token = process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;
const login = 'robwhess';

const MUTATION = gql`
  mutation changeUserStatus($emoji: String!, $message: String!) {
  changeUserStatus(input: {
    emoji: $emoji
    message: $message
    clientMutationId: "cs499Client"
  }) {
    status {
      updatedAt
      message
    }
  }
}
`;

export default function ChangeUserStatus() {
  const [ emoji, setEmoji ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ changeUserStatus, { data } ] = useMutation(MUTATION);

  return (
    <div>
      {token ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          changeUserStatus({ variables: {
            emoji: emoji,
            message: message
          }});
          setEmoji("");
          setMessage("");
        }}>
          <div>
            <input
              type="text"
              placeholder="Emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button>Submit</button>
            <p>Last updated at: {data?.changeUserStatus?.status.updatedAt}</p>
          </div>
        </form>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  );
}
