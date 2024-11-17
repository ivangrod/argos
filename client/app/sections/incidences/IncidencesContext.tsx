'use client'

import React, { useContext, useEffect, useState } from "react";

import { Incidence } from "@/app/modules/incidences/domain/Incidence";
import { IncidenceRepository } from "@/app/modules/incidences/domain/IncidenceRepository";
import { getAllIncidences } from "@/app/modules/incidences/application/getAll/getAllIncidences";
import {createApiIncidenceRepository} from "@/app/modules/incidences/infrastructure/ApiIncidenceRepository";

export interface ContextState {
    incidences: Incidence[];
}

export const IncidencesContext = React.createContext({} as ContextState);

export const IncidencesContextProvider = ({
                                           children,
                                       }: React.PropsWithChildren<{ repository: IncidenceRepository }>) => {
    const [incidences, setIncidences] = useState<Incidence[]>([]);
    const repository = createApiIncidenceRepository();

    async function getIncidences() {
        const incidences = await getAllIncidences(repository);
        setIncidences(incidences);
    }

    useEffect(() => {
        getIncidences().catch(() => {
            throw new Error("Unable to get incidences");
        });
    }, []);

    return (
        <IncidencesContext.Provider value={{ incidences: incidences }}>
            {children}
        </IncidencesContext.Provider>
    );
};

export const useIncidencesContext = () => useContext(IncidencesContext);