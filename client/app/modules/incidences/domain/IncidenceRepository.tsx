import { Incidence } from './Incidence';

export interface IncidenceRepository {
    getAll: () => Promise<Incidence[]>;
}