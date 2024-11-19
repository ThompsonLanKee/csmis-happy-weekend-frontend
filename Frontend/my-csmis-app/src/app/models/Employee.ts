import { Department } from "./Department";
import { Division } from "./Division";
import { DoorLog } from "./DoorLog";
import { Team } from "./Team";

export interface Employee {
    id: number;
    staffID: string;
    name: string;
    email: string;
    isActive: boolean;
    status: 'ACTIVE' | 'INACTIVE'; // Enum for status type
    division: Division;
    department: Department;
    team: Team;
    joinedAt: Date;
    doorLog: DoorLog;
    isDeleted: boolean;
  }
  