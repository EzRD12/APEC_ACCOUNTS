import { TrainingLevel } from "../enums/trainingLevel";

export interface Training {
    id?: string;
    description: string;
    level: TrainingLevel;
    startDateTime: Date;
    endDateTime: Date;
    institution: string;
}