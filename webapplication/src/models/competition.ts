import { CompetitionStatus } from "../enums/competitionStatus";

export interface Competition{
    id?: string;
    description: string;
    status: CompetitionStatus;
}