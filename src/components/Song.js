import React from 'react'
import gql from 'graphql-tag'
import {Card, Col, Row} from 'react-bootstrap';

import { getToken } from '../token'


const Song = ({ index, song }) => {
    const isLoggedIn = getToken()
    
    

    return (
      
      <Card>
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
            {song.artist}

          </div>
          <div>
            {song.title}
          </div>
          <div>
            {song.date}
          </div>
          <div>
            {song.description}
          </div>
          {/* <div className="f6 lh-copy gray">
            // if the song was posted by someone, display that person. 
            //otherwise display unknown
            {song.taggedBy
              ? song.taggedBy.username
              : 'Unknown'}{' '}
          </div> */}
        </div>
      </div>
      </Card>
    )
  }
  
  export default Song