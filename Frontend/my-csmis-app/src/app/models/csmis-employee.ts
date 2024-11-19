import { Department } from "./csmis-Department";
import { Division } from "./csmis-Division";
import { Team } from "./csmis-Team";
import { DoorLog } from "./DoorLog";
import { StatusType } from "./StatusType";

export class Employee {
  id: number = 0;
  staff_ID: string = '';
  name: string = '';
  email: string = '';
  is_active: boolean = true;
  status?: StatusType;
  division?: Division;
  department?: Department;
  team?: Team ;
  doorlog?:DoorLog;
  joined_at?: Date;
  isDeleted: boolean = false;
}
