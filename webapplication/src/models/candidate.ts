import { WorkExperience } from "./work-experience";
import { Competition } from "./competition";
import { Training } from "./training";

export interface Candidate {
    id?:string;
    identification: string;
    name: string;
    positionId: string;
    department: string;
    aspiratedSalary: string;
    workExperiences: WorkExperience[];
    recommendBy: string;
    competitions: Competition[],
    trainings: Training[]
}