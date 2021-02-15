import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { withRouter } from 'react-router'


const NewSongMap = ({songs}) => {
    const [ selected, setSelected ] = useState({});

    const onSelect = item => {
       setSelected(item);
    }

    const mapStyles = {        
      height: "100vh",
      width: "100%"};
    
    
    const lats = []
    songs.map(song =>{
        if (song.latitude){
            lats.push(parseFloat(song.latitude)) }
        return lats
    })
    const midLat = (Math.max(...lats) + Math.min(...lats))/2

    const longs = []
    songs.map(song =>{
        if (song.longitude){
            longs.push(parseFloat(song.longitude)) }
        return longs
    })
    
    const midLong = (Math.max(...longs) + Math.min(...longs))/2
    
    const [latitude, setLat] = React.useState(midLat)
    const [longitude, setLong] = React.useState(midLong)
    
    //centering map on continental us
    const [defaultCenter, setDefaultCenter] = useState({
        lat: midLat, lng: midLong
      })

    return (
       <LoadScript googleMapsApiKey=''>
            <GoogleMap
            
            mapContainerStyle={mapStyles}
            zoom={5}
            //centering map on continental us
            // center={{lat:parseFloat(latitude), lng:parseFloat(longitude)}}
            center={defaultCenter}
            clickableIcons = {false}
            onClick={(e)=>{
                // defaultCenter = {lat:e.latLng.lat(), lng:e.latLng.lng()}
                setLat(e.latLng.lat())
                setLong(e.latLng.lng())
                localStorage.setItem('latitude', e.latLng.lat())
                localStorage.setItem('longitude', e.latLng.lng())
            }}>
           
                {
                songs.map(item => {
                    return (
                    <Marker key={item.id} position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}} onMouseOver={() => onSelect(item)}/>
                    )
                })
                }
                {
                    selected.latitude && 
                    (
                    <InfoWindow
                    position={{ lat: parseFloat(selected.latitude), lng: parseFloat(selected.longitude)}}
                    // clickable={true}
                    onCloseClick={() => setSelected({})}
                    >
                    <span>
                        <div>{selected.title}</div>
                        <div>{selected.artist}</div>
                        <div>{selected.date}</div>
                        <div>{selected.description}</div>
                    </span>
                    
                    </InfoWindow>
                    )
                }
                {
                    <Marker
                    position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                    icon={{url: "http://maps.google.com/mapfiles/marker_green.png"}}
                    
                    />   
                }
            </GoogleMap>

       </LoadScript>
       
    )
}

export default withRouter(NewSongMap);