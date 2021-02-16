import React from 'react'
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'urql';
import {Card,Form, Button, Container, Alert, Col, Row} from 'react-bootstrap';


import NewSongMap from './AddSongMap'

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


export const CreateSong = props =>{
    const [title, setTitle] = React.useState('')
    const [artist, setArtist] = React.useState('')
    // const [latitude, setLatitude] = React.useState('')
    // const [longitude, setLongitude] = React.useState('')
    const [date, setDate] = React.useState('')
    const [description, setDescription] = React.useState('')
    
    const [show, setShow] = React.useState(false);


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
        const latitude = localStorage.getItem('latitude')
        const longitude = localStorage.getItem('longitude')
        const newSong = {title, artist, latitude, longitude, date, description}
        song(newSong).then((error)=>console.log(error));
        
        setShow(true)
        e.target.reset()
         
        
    }

    
    const [result] = useQuery({query:FEED_QUERY})
    const {data, fetching, error}=result
    
    if (fetching) return <div>Fetching</div>
    if (error) return <div>Error</div>

    const songsToRender = data.songs



    return (
        <div>
            {show ? 
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Submission Confirmed!</Alert.Heading>
                <p>
                Reload the page to see your new song added.
                </p>
                
            </Alert>: ''}
        {/* <Container> */}
            <Row>
                <Col>
                <Card bg='secondary'>
                    <Form className="form-horizontal" onSubmit={onSubmit}>
                        <Form.Group>
                        <Row className="justify-content-md-center">
                            <Col xs={8}>
                                <Form.Control size='lg' type="text" onChange = {e=>setTitle(e.target.value)} placeholder="Enter title here" />
                            </Col>
                        </Row>
                        </Form.Group>
                        <Form.Group>
                        <Row className="justify-content-md-center">
                            <Col xs={8}>
                                <Form.Control size='lg' type="text" onChange = {e=>setArtist(e.target.value)} placeholder="Enter artist here" />
                            </Col>
                        </Row>
                        </Form.Group>
                        <Form.Group>
                        <Row className="justify-content-md-center">
                            <Col xs={8}>
                                <Form.Control size='lg' type="text" onChange = {e=>setDate(e.target.value)} placeholder="Enter date here" />
                            </Col>
                            
                            
                        </Row>
                        </Form.Group>
                        <Form.Group>
                        <Row className="justify-content-md-center">
                            
                            <Col xs={8}>
                                <Form.Control size='lg' as='textarea' rows={5} type="text" onChange = {e=>setDescription(e.target.value)} placeholder="Enter description here" />
                            </Col>
                        </Row>
                        </Form.Group>
                        <Form.Group>
                        <Row className="justify-content-md-center">
                            <Col xs='auto'>
                                <Button size='lg' variant="primary" type="submit" className='mb-4'>Submit Song</Button>

                            </Col>
                        </Row>
                        </Form.Group>
                        
                    </Form>
                    </Card>
                </Col>
            
                <Col xs ={8}>
                    <NewSongMap songs={songsToRender}/>
                </Col>
            </Row>
        
            {/* </Container> */}
        </div>
    )
}

export default CreateSong