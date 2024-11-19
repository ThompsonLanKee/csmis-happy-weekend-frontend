export interface JwtResponse {
  token: string;
  id: number;
  email: string;
  roles: string[]; // This could be kept or removed if redundant
  staffId: string;
  name: string;
  defaultPassword: boolean;
  authorities: { authority: string }[]; // Add this line to match your response structure
}
