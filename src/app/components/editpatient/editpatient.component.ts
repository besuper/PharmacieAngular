import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PatientsService} from "../../servicies/patients.servicies";

@Component({
	selector: 'app-editpatient',
	templateUrl: './editpatient.component.html',
	styleUrls: ['./editpatient.component.css']
})
export class EditpatientComponent implements OnInit {
	patientFormGroup?: FormGroup;
	submitted = false;
	@Input("idPatient") idPatient: number = 1;
	@Output() updatedPatient: EventEmitter<any> = new EventEmitter();
	modal: any;

	constructor(private patientService: PatientsService, private fb:
		FormBuilder, activatedRoute: ActivatedRoute) {
	}

	ngOnInit(): void {
	}

	onOpenModal() {
		this.patientService.getPatient(this.idPatient).subscribe(patient => {
			this.patientFormGroup = this.fb.group({
				id: [patient.id, Validators.required],
				nom: [patient.nom, Validators.required],
				prenom: [patient.prenom, Validators.required],
				nss: [patient.nss, Validators.required],
				dateNaissance: [patient.dateNaissance, Validators.required],
			})
		});

		if (this.modal == undefined) {
			// @ts-ignore
			this.modal = new bootstrap.Modal("#editPatientModal_" + this.idPatient);
		}

		this.modal.show();
	}

	onCloseModal() {
		this.modal.hide();
		this.modal = undefined;
	}

	onUpdatePatient(): void {
		this.submitted = true;

		if (this.patientFormGroup?.invalid) {
			return;
		}

		this.patientService.updatePatient(this.patientFormGroup?.value).subscribe({
			next: data => {
				this.modal.hide();
				(window as any).sendAlert("success", "Patient modifié!");

				this.modal = undefined;

				//this.updatedPatient();
				this.updatedPatient.emit();
			},
			error: err => {
				(window as any).sendAlert("danger", err.headers.get("error"));
			}
		});
	}
}
