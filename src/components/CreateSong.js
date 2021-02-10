import React from 'react'
import gql from 'graphql-tag';
import { useMutation } from 'urql';
import {Card,Form, Button, Container, Jumbotron, Col} from 'react-bootstrap';


const POST_MUTATION = gql`
  mutation ($title: String!, $artist:String!, $latitude:String!, $longitude:String!, $date:String!, $description: String!) {
    createSong(title: $title, artist: $artist, latitude: $latitude, longitude: $longitude, date: $date, description: $description) {
        id
        title
        artist
        latitude
        longitude
        date
        description
        taggedBy{
            id
            username
            email
        }
    }
  }
`
export const CreateSong = props =>{
    const [title, setTitle] = React.useState('')
    const [artist, setArtist] = React.useState('')
    const [latitude, setLatitude] = React.useState('')
    const [longitude, setLongitude] = React.useState('')
    const [date, setDate] = React.useState('')
    const [description, setDescription] = React.useState('')
    

    const [state, song] = useMutation(`
    mutation ($title: String!, $artist:String!, $latitude:String!, $longitude:String!, $date:String!, $description: String!) {
      createSong(title: $title, artist: $artist, latitude: $latitude, longitude: $longitude, date: $date, description: $description) {
          id
          title
          artist
          latitude
          longitude
          date
          description
          taggedBy{
              id
              username
              email
          }
      }
    }
  `)


    const onSubmit = (e) => {
        e.preventDefault()
        song({ title, artist, latitude, longitude, date, description }).then((error)=>console.log(error));
        e.target.reset()
        
    }

    return (
        <div>
            <Form className="form-horizontal" onSubmit={onSubmit}>
                <Form.Row className="justify-content-md-center">
                    <Col xs='auto'>
                        <Form.Control size='lg' type="text" onChange = {e=>setTitle(e.target.value)} placeholder="Enter title here" />
                    </Col>
                    <Col xs='auto'>
                        <Form.Control size='lg' type="text" onChange = {e=>setArtist(e.target.value)} placeholder="Enter artist here" />
                    </Col>
                    <Col xs='auto'>
                        <Form.Control size='lg' type="text" onChange = {e=>setDate(e.target.value)} placeholder="Enter date here" />
                    </Col>
                    <Col xs='auto'>
                        <Form.Control size='lg' type="text" onChange = {e=>setLatitude(e.target.value)} placeholder="Enter latitude here" />
                    </Col>
                    
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Col xs='auto'>
                        <Form.Control size='lg' type="text" onChange = {e=>setLongitude(e.target.value)} placeholder="Enter longitude here" />
                    </Col>
                    <Col xs='auto'>
                        <Form.Control size='lg' type="text" onChange = {e=>setDescription(e.target.value)} placeholder="Enter description here" />
                    </Col>
                    <Col xs='auto'>
                        <Button size='lg' variant="primary" type="submit" className='mb-4'>Enter</Button>

                    </Col>
                </Form.Row>
            </Form>
        
            {/* <div className = "flex flex-column mt3"> */}
            {/* add two input fields for users to add descriptions and urls */}
            {/* values are save in the React state and will be used to send in mutation */}
            {/* <input
                className="mb2"
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="The Title for the song"
            />
            <input
                className="mb2"
                value={artist}
                onChange={e => setArtist(e.target.value)}
                type="text"
                placeholder="The Artist for the song"
            />
            <input
                className="mb2"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                type="text"
                placeholder="The Latitude for the song"
            />
            <input
                className="mb2"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                type="text"
                placeholder="The Longitude for the song"
            />
            <input
                className="mb2"
                value={date}
                onChange={e => setDate(e.target.value)}
                type="text"
                placeholder="The Date for the song"
            />
            <input
                className="mb2"
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="text"
                placeholder="A description for the song"
            />
            

            </div>
            <button
              disabled={state.fetching}
              onClick={this.onSubmit}>
              Submit
            </button> */}
        </div>
    )
}

export default CreateSong