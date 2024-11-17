"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {useIncidencesContext} from "@/app/sections/incidences/IncidencesContext";
import {Incidence} from "@/app/modules/incidences/domain/Incidence";

// Fix icon issues with leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map: React.FC = () => {

    const { incidences } = useIncidencesContext()

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
                .map((incidence: Incidence, index) => (
                    <Marker key={index} position={[incidence.latitude, incidence.longitude]}>
                        <Popup>
                            <strong>Tipo de incidencia:</strong> {incidence.type}<br />
                            <strong>Dirección:</strong> {incidence.address}
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    );
};

export default Map;