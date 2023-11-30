import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientsService} from "../../servicies/patients.servicies";
import {Prescription} from "../../entities/prescription.entities";
import {PrescriptionsService} from "../../servicies/prescription.servicies";
import {Patient} from "../../entities/patient.entities";
import {Observable, Subject} from "rxjs";

@Component({
	selector: 'app-editpatient',
	templateUrl: './editpatient.component.html',
	styleUrls: ['./editpatient.component.css']
})
export class EditpatientComponent implements OnInit {
	patientFormGroup?: FormGroup;
	submitted = false;
	idPatient: number = 1;

	patient: Subject<Patient> = new Subject<Patient>();

	prescriptions?: Prescription[];

	constructor(
		private patientService: PatientsService,
		private prescriptionService: PrescriptionsService,
		private fb: FormBuilder,
		private router: Router,
		activatedRoute: ActivatedRoute) {

		this.idPatient = activatedRoute.snapshot.params.idPatient;
	}

	ngOnInit(): void {
		this.patientService.getPatient(this.idPatient).subscribe(patient => {
			this.patient.next(patient);

			this.patientFormGroup = this.fb.group({
				id: [patient.id, Validators.required],
				nom: [patient.nom, Validators.required],
				prenom: [patient.prenom, Validators.required],
				nss: [patient.nss, Validators.required],
				dateNaissance: [patient.dateNaissance, Validators.required],
			});
		});

		this.prescriptionService.getPrescriptionsPatient(this.idPatient).subscribe({
			next: data => {
				this.prescriptions = data.sort((a, b) => {
					return new Date(b.datePrescription).getTime() - new Date(a.datePrescription).getTime();
				});
			},
			error: err => {
				(window as any).sendAlert("danger", err.headers.get("error"));
			}
		});
	}

	onUpdatePatient(): void {
		this.submitted = true;

		if (this.patientFormGroup?.invalid
		) {
			return;
		}

		this.patientService.updatePatient(this.patientFormGroup?.value).subscribe({
			next: data => {
				(window as any).sendAlert("success", "Patient modifié!");
			},
			error: err => {
				(window as any).sendAlert("danger", err.headers.get("error"));
			}
		});
	}

	editPrescription(prescription: Prescription): void {
		this.router.navigateByUrl("/prescription/" + prescription.id);
	}

	deletePrescription(prescription: Prescription) {
		let confirmation = confirm('Etes vous sûr de vouloir supprimer ?');

		if (confirmation) {
			this.prescriptionService.deletePrescription(prescription).subscribe({
				next: () => {
					// TODO: Remove the prescription
				},
				error: (err) => {
					(window as any).sendAlert("danger", err);
				}
			})
		}
	}
}
