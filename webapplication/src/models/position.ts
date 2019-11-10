import { PositionRiskLevel } from "../enums/PositionRiskLevel";
import { PositionStatus } from "../enums/positionStatus";

export interface Position {
    id?: string,
    name: string,
    riskLevel: PositionRiskLevel,
    minimumSalary: number,
    maximumSalary: number,
    status: PositionStatus
}