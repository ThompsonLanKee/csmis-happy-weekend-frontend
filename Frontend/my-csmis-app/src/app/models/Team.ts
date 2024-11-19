import { Department } from "./Department";

export interface Team {
  id: number;
  name: string;
  department: Department; // The associated Department object
  isDeleted: boolean;
}
