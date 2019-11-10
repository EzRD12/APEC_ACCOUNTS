import { LanguageStatus } from "../enums/languageStatus";

export interface Language{
    id?: string,
    name: string,
    status: LanguageStatus
}