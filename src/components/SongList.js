import React from 'react'
import { useQuery } from 'urql'
import gql from 'graphql-tag'

import Song from './Song'
import MapContainer from './MapContainer'

const FEED_QUERY = gql`
{
    songs{
        id
        title
        artist
        latitude
        longitude
        date
        taggedBy{
          username
          id
        }
      }
    }
`


const SongList = () => {

    const locations = [
        {
          name: "Location 1",
          location: { 
            lat: 41.88,
            lng: -87.62 
          },
        }]

    //useQuery returns array with the result as the first item (called data) with fetching
    // and error as the second and third
    const [result] = useQuery({query:FEED_QUERY})
    const {data, fetching, error}=result
    
    if (fetching) return <div>Fetching</div>
    if (error) return <div>Error</div>

    const songsToRender = data.songs

    return(
        <div>
            {songsToRender.map((song, index) => (
             <Song key={song.id} song={song} index={index} />
            ))}
            <MapContainer locations={locations}/>
        </div>
        )
    }

export default SongList