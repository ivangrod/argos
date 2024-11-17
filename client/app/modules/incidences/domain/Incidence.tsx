export interface Incidence {
    external_id: string;
    type: string;
    description?: string;
    requested_date: Date;
    address?: string;
    latitude: number;
    longitude: number;
}