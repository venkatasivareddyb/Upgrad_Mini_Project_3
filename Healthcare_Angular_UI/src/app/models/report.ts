export interface Report {
  id: number;
  patientId: string;
  appointmentId: number;
  doctorName: string;
  reportType: string;   // Lab, X-Ray, Prescription
  description: string;
  date: string;
}
