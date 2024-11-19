import { Employee } from "./Employee";

export interface User {
  id: number;
  employee: Employee;
  photo?: string; // URL or base64-encoded string for the user's photo
  password?: string;
  identityNo: string;
  name:string;
  role: 'ADMIN' | 'OPERATOR'; // Assuming RoleType as a string enum
}
