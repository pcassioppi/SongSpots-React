import React from 'react'
import gql from 'graphql-tag'
import {Card, Col, Row} from 'react-bootstrap';

import { getToken } from '../token'


const Song = ({ index, song }) => {
    const isLoggedIn = getToken()
    
    

    return (
      
      <Card bg = {'info'} text = {'white'}>
      {/* <div className="flex mt2 items-start"> */}
        <div className="flex items-center">
            {/* numbering on side */}
            {/* <span className="gray">{index + 1}.</span> */}
        </div>
        <div className="ml1">
          <Card.Header>
            {song.artist}
            <br />
            {song.title}
            <br />
            {song.date}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {song.description}
            </Card.Text>
          </Card.Body>
          {/* <div className="f6 lh-copy gray">
            // if the song was posted by someone, display that person. 
            //otherwise display unknown
            {song.taggedBy
              ? song.taggedBy.username
              : 'Unknown'}{' '}
          </div> */}
        </div>
      {/* </div> */}
      </Card>
    )
  }
  
  export default Song