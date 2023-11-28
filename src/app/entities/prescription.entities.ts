import {Medecin} from "./medecin.entities";
import {Patient} from "./patient.entities";

export interface Prescription {
	id: number;
	datePrescription: Date;
	medecin: Medecin;
	patient: Patient;
}
