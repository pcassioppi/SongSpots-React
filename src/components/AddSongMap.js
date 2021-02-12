import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { withRouter } from 'react-router'


const NewSongMap = ({songs}) => {
    const [ selected, setSelected ] = useState({});

    const onSelect = item => {
       setSelected(item);
    }

    const mapStyles = {        
      height: "90vh",
      width: "100%"};

    const defaultCenter = {
        lat: 37, lng: -97.75
    }
    
    const [latitude, setLat] = React.useState('')
    const [longitude, setLong] = React.useState('')
   
    return (
       <LoadScript googleMapsApiKey=''>
            <GoogleMap
            
            mapContainerStyle={mapStyles}
            zoom={5}
            center={defaultCenter}
            onClick={(e)=>{
                
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
                    
                    />   
                }
            </GoogleMap>

       </LoadScript>
       
    )
}

export default withRouter(NewSongMap);