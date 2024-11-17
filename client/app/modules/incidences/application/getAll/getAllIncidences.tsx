import {Incidence} from "@/app/modules/incidences/domain/Incidence";
import {IncidenceRepository} from "@/app/modules/incidences/domain/IncidenceRepository";

export async function getAllIncidences(incidenceRepository: IncidenceRepository): Promise<Incidence[]> {
    return incidenceRepository.getAll();
}