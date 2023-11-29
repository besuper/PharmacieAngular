import {Component} from '@angular/core';
import {Patient} from "../../entities/patient.entities";
import {PatientsService} from "../../servicies/patients.servicies";
import {Router} from "@angular/router";

@Component({
	selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrl: './patients.component.css'
})
export class PatientsComponent {

	patients?: Patient[];

	constructor(private patientsService: PatientsService, private router: Router) {
	}

	onSearch(value: Patient) {
		this.patientsService.searchPatients(value.nom).subscribe({
			next: data => {
				this.patients = data;
			}
		});
	}

	onEdit(patient: Patient) {
		this.router.navigateByUrl('editPatient/' + patient.id);
	}

	onDelete(patient: Patient) {
		let confirmation = confirm('Etes vous sûr de vouloir supprimer ?');

		if (confirmation) {
			this.patientsService.deletePatient(patient).subscribe({
				next: () => {
					this.onSearch(patient);
				}
			})
		}
	}

}
