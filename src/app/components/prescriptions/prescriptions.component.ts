import {Component} from '@angular/core';
import {Patient} from "../../entities/patient.entities";
import {PatientsService} from "../../servicies/patients.servicies";
import {Router} from "@angular/router";
import {Prescription} from "../../entities/prescription.entities";
import {PrescriptionsService} from "../../servicies/prescription.servicies";

@Component({
	selector: 'app-prescriptions',
	templateUrl: './prescriptions.component.html',
	styleUrl: './prescriptions.component.css'
})
export class PrescriptionsComponent {

	prescriptions?: Prescription[];

	constructor(private prescriptionsService: PrescriptionsService, private router: Router) {
	}

	onSearch(value: any) {
		this.prescriptionsService.searchPrescriptions(value.dateStart, value.dateEnd).subscribe({
			next: data => {
				this.prescriptions = data.sort((a, b) => {
					return new Date(b.datePrescription).getTime() - new Date(a.datePrescription).getTime();
				});
			}
		});
	}

}
