export interface Billing {
  id: number;
  patientId: string;
  appointmentId: number;
  doctorName: string;
  amount: number;
  date: string;
  status: string; // Paid, Pending, Cancelled
}
