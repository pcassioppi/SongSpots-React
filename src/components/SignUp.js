import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'urql'


const SIGNUP_MUTATION = gql`
    mutation ($username: String!, $email: String!, $password: String!) {
           createUser(username: $username, email: $email, password: $password){
               user{
                    id
                    username
                    email
               }
           }
       }
  `;

const SignUp = props => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [data, executeMutation] = useMutation(SIGNUP_MUTATION)
  
  const signUpMutation = React.useCallback(() => {
      executeMutation({ username, email, password }).then((data) => {
          if(data){
            props.history.push('/login')
        }
      })
  }, [executeMutation, username, email, password, props.history])

    return (
        <div>
            <div className="flex flex-column">
                
                <input value={username}
                    onChange = {e=>setUsername(e.target.value)}
                    type="text"
                    placeholder="Your username"/>
                <input value={email}
                    onChange = {e=>setEmail(e.target.value)}
                    type="text"
                    placeholder="Your Email"/>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password"/>
            </div>

            <div className="flex mt3">
                <button className="pointer mr2 button"
                // disabled={data.fetching}
                onClick={signUpMutation}
                >
                    {"create"}
                </button>
                <button
                    type="button" className="pointer button" 
                    disabled={data.fetching}
                    onClick = {()=>props.history.push('/login')}
                    >
                        {'already have an account?'}
                </button>
            </div>
        </div>
    

  )
}

export default SignUp