import { IncidenceRepository } from "@/app/modules/incidences/domain/IncidenceRepository";
import { Incidence } from "@/app/modules/incidences/domain/Incidence";

async function getAll() {
    return await fetch("/api/incidences").then(
        (response) => response.json() as Promise<Incidence[]>
    );
}

export function createApiIncidenceRepository(): IncidenceRepository {
    return {
        getAll
    };
}