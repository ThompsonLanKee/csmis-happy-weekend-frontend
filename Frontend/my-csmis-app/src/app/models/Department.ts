import { Division } from "./Division";

export interface Department {
    id: number;
    name: string;
    division: Division; // The associated Division object
    isDeleted: boolean;
  }
  