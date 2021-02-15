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
    
    //centering map on continental us
    const defaultCenter = {
        lat:41.88, lng: -87.62
    }
    
    const [latitude, setLat] = React.useState('41.88')
    const [longitude, setLong] = React.useState('-87.62')
    
    

    return (
       <LoadScript googleMapsApiKey='AIzaSyDm54gm4NZ9mquneS-M6-uwYnpemx7mSwE'>
            <GoogleMap
            
            mapContainerStyle={mapStyles}
            zoom={5}
            //centering map on continental us
            center={{lat:parseFloat(latitude), lng:parseFloat(longitude)}}
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
                    <Marker key={item.id} position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}} onClick={() => onSelect(item)}/>
                    )
                })
                }
                {
                    selected.latitude && 
                    (
                    <InfoWindow
                    position={{ lat: parseFloat(selected.latitude), lng: parseFloat(selected.longitude)}}
                    clickable={true}
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