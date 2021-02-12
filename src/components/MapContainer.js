import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { withRouter } from 'react-router'


const MapContainer = ({songs}) => {
    const [ selected, setSelected ] = useState({});

    
   

    const onSelect = item => {
       setSelected(item);
    }

    const mapStyles = {        
      height: "100vh",
      width: "100%"};

    const defaultCenter = {
      lat: 40.42, lng: -96.4
    }



    
    return (
       <LoadScript googleMapsApiKey=''>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={4}
            center={defaultCenter}>
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
               
            </GoogleMap>

       </LoadScript>
    )
}

export default withRouter(MapContainer);