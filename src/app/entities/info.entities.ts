import {Medicament} from "./medicament.entities";
import {Prescription} from "./prescription.entities";

export type Info = {
	medicament: Medicament;
	prescription: Prescription;
	quantite: number;
}
