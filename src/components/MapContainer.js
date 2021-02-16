import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { withRouter } from 'react-router'


const MapContainer = ({songs}) => {
    const [ selected, setSelected ] = useState({});
    
    const onSelect = item => {
       setSelected(item);
    }

    const mapStyles = {        
      height: "94vh",
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
    
     //centering map on users data
     const [defaultCenter, setDefaultCenter] = useState({
        lat: midLat, lng: midLong
      })
    
    
    return (
        
       <LoadScript id="script-loader" googleMapsApiKey=''>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={4}
            center={defaultCenter}
            clickableIcons = {false}
            >
                {
                songs.map(item => {
                    return (
                    <Marker key={item.id} position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}} onMouseOver={() => onSelect(item)}    />
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
               
            </GoogleMap>

       </LoadScript>
    )
}

export default withRouter(MapContainer);