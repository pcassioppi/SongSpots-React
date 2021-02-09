import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'urql'

import { getToken } from '../token'

const VOTE_MUTATION = gql`
  mutation ($linkId: ID!) {
    createSong(linkId: $linkId) {
      link{
          id
          description
          url
          postedBy{
              id
              username
          }
          votes{
              user{
                  id
                  username
              }
          }
      }      
    }
  }
`

const Song = ({ index, song }) => {
    const isLoggedIn = getToken()
    
    
    const [state, executeMutation] = useMutation(VOTE_MUTATION);

    const upvote = React.useCallback(() => {
        if (!state.fetching) {
        executeMutation({ songId: song.id });
        }
    }, [state.fetching, song, executeMutation]);

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
            {/* numbering on side */}
            <span className="gray">{index + 1}.</span>
            {/* if they are logged in display the upvote button */}
            {/* maybe can use this to show if theyve seen the show */}
            {/* {isLoggedIn && (
                <button type="button" className="pointer button" onClick = {upvote} >
                    {'upvote'}
                </button> 
                // <div className="ml1 gray f11" onClick={upvote}>
                //     asdfasdfa
            // </div>
            )}*/}
        </div>
        <div className="ml1">
          <div>
            {song.title} ({song.artist}) {song.id}
          </div>
          <div className="f6 lh-copy gray">
            {/* if the song was posted by someone, display that person. 
            otherwise display unknown */}
            {song.taggedBy
              ? song.taggedBy.username
              : 'Unknown'}{' '}
          </div>
        </div>
      </div>
    )
  }
  
  export default Song