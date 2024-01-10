import {Component} from '@angular/core';
import {Patient} from "../../entities/patient.entities";
import {PatientsService} from "../../servicies/patients.servicies";
import {Router} from "@angular/router";
import {Prescription} from "../../entities/prescription.entities";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrl: './patients.component.css'
})
export class PatientsComponent {

	patients?: Patient[];

	nameForm: FormGroup;
	prescriptionForm: FormGroup;

	constructor(private fb: FormBuilder, private patientsService: PatientsService, private router: Router) {
		this.nameForm = this.fb.group({
			nom: ['', Validators.required]
		});

		this.prescriptionForm = this.fb.group({
			date: ['', Validators.required]
		});
	}

	onSearch() {
		this.patientsService.searchPatients(this.nameForm.value.nom).subscribe({
			next: data => {
				this.patients = data;
			}
		});
	}

	onSearchPrescription() {
		this.patientsService.searchPatientsByPrescriptionDate(this.prescriptionForm.value.date).subscribe({
			next: data => {
				this.patients = data;
			}
		});
	}

	showAll() {
		this.patientsService.getPatients().subscribe({
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
					//this.onSearch(patient);

					let index = this.patients?.indexOf(patient);

					this.patients?.splice(index!, 1);

					(window as any).sendAlert("success", "Patient supprimé !")
				}
			})
		}
	}

	onAddedPatient(data: Patient) {
		this.patients?.push(data);
	}

}
