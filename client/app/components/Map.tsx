"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { nervionCoordinates } from "./nervion-coordinates";

// Fix icon issues with leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map: React.FC = () => {
    const [incidences, setIncidences] = useState([]);

    useEffect(() => {

        // Fetch data from the API
        fetch("http://localhost:3001/api/incidences")
            .then((response) => response.json())
            .then((data) => {
                const incidencesWithCoordinates = data.map((incidence: { latitude: any; longitude: any; }) => ({
                    ...incidence,
                    coordinates: incidence.latitude && incidence.longitude
                        ? [incidence.latitude, incidence.longitude]
                        : null,
                }));
                setIncidences(incidencesWithCoordinates);
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, []);

    // Polygon coordinates delimiting the Seville town area
    const polygonCoords: L.LatLngExpression[] = nervionCoordinates;

    // @ts-ignore
    // @ts-ignore
    return (
        <MapContainer
            center={[37.38048238687146, -5.973369906729496]} // Center coordinate for Seville
            zoom={16}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {incidences
                .filter((incidence: any) => incidence.coordinates)
                .map((incidence: any, index) => (
                    <Marker key={index} position={incidence.coordinates}>
                        <Popup>
                            <strong>Incidencia:</strong> {incidence.type}<br />
                            <strong>Descripción:</strong> {incidence.description}
                        </Popup>
                    </Marker>
                ))}

            <Polygon
                positions={polygonCoords}
                pathOptions={{ color: 'red', weight: 2, dashArray: '4' }} // Red border with dashed lines
            />
        </MapContainer>
    );
};

export default Map;