import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'urql'

import { setToken } from '../token'


export const Login = props => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [data, login] = useMutation(`
    mutation ($username: String!, $password: String!) {
           tokenAuth(username: $username, password: $password){
             token
           }
       }
  `);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    login({ username, password }).then(({ data }) => {
      if (data.tokenAuth) {
        setToken(data.tokenAuth.token);
        props.history.push('/')
      }
    })
  }


    return (
        
        <form onSubmit={handleSubmit}>
            <div className="flex flex-column">
                
                <input value={username}
                    onChange = {e=>setUsername(e.target.value)}
                    type="text"
                    placeholder="Your username"/>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password"/>
            </div>

            <div className="flex mt3">
                <button type="submit" className="pointer mr2 button"
                disabled={data.fetching}
                // onClick={mutate}
                >
                    {"login"}
                </button>
                <button
                    type="button" className="pointer button" 
                    disabled={data.fetching}
                    onClick = {()=>props.history.push('/signup')}
                    >
                        {'need to create an account?'}
                </button>
            </div>
        </form>
  )
}
export default Login