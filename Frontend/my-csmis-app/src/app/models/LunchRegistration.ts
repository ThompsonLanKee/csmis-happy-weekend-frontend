// lunch-registration.dto.ts
export interface LunchRegistrationDTO {
    id?: number;
    userId: number;
    monthId: number;
    dailyLunchStatus: { [key: number]: boolean };
    avoidMeatIds: number[];
    //modificationDeadline?: string; // ISO string format for LocalTime
  }
  