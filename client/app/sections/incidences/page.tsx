'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import {createApiIncidenceRepository} from "@/app/modules/incidences/infrastructure/ApiIncidenceRepository";
import {IncidencesContextProvider} from "@/app/sections/incidences/IncidencesContext";

// Dynamically import the Map component to ensure it loads properly with Next.js
const Map = dynamic(() => import('@/app/sections/incidences/components/Map'), { ssr: false });

const repository = createApiIncidenceRepository();

const MapPage: React.FC = () => {
    return (
        <IncidencesContextProvider repository={repository}>
            <div>
                <h1>Map Centered on Seville</h1>
                <Map/>
            </div>
        </IncidencesContextProvider>
    );
};

export default MapPage;