import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const MapContainer = ({locations}) => {
    // const locations = [
    //     {
    //       name: "Location 1",
    //       location: { 
    //         lat: 41.88,
    //         lng: -87.62 
    //       },
    //     }]
    const mapStyles = {        
      height: "90vh",
      width: "100%"};

    const defaultCenter = {
      lat: 41.88, lng: -87.62
    }
    
    return (
       <LoadScript googleMapsApiKey=''>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}>
                {
                locations.map(item => {
                    return (
                    <Marker key={item.name} position={item.location}/>
                    )
                })
                }
            </GoogleMap>

       </LoadScript>
    )
}

export default MapContainer;