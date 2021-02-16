import React from 'react'
import { useQuery } from 'urql'
import gql from 'graphql-tag'
import {Row, Col, Container, Card} from 'react-bootstrap'

import Song from './Song'
import MapContainer from './MapContainer'
import '../App.css'

const FEED_QUERY = gql`
{
    songs{
        id
        title
        artist
        latitude
        longitude
        date
        description
        taggedBy{
          username
          id
        }
      }
    }
`


const SongList = () => {

    //useQuery returns array with the result as the first item (called data) with fetching
    // and error as the second and third
    const [result] = useQuery({query:FEED_QUERY})
    const {data, fetching, error}=result
    
    if (fetching) return <div>Fetching</div>
    if (error) return <div>Error</div>

    const songsToRender = data.songs

    
    return(
      <div>
        {/* <Container> */}
          
            <Container>
              <Row>
                <Col xs sm={3}>
                
                {/* {data.songs} */}
                {songsToRender.map((song, index) => (
                <Song key={song.id} song={song} index={index} />
                
                ))}
                
                </Col>
                  
                <Col xs={9}>
                  <Card>
                    <MapContainer songs={songsToRender}/>
                  </Card>
                </Col>
              </Row>
            </Container>
          
        {/* </Container> */}
        </div>
        )
    }

export default SongList