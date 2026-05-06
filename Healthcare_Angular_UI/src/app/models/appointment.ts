export interface Appointment {
  id: number;
  patientId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: string; // Upcoming, Completed, Cancelled
  shift: string;  // Morning, Evening
}
