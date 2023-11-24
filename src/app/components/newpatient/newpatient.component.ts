import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientsService} from "../../servicies/patients.servicies";

@Component({
	selector: 'app-newpatient',
	templateUrl: './newpatient.component.html',
	styleUrl: './newpatient.component.css'
})
export class NewpatientComponent implements OnInit {
	patientFormGroup?: FormGroup;
	submitted = false;
	modal: any;

	constructor(private fb: FormBuilder, private patientService: PatientsService) {
	}

	ngOnInit(): void {
		this.patientFormGroup = this.fb.group({
			nom: ['', Validators.required],
			prenom: ['', Validators.required],
			nss: ['', Validators.required],
			dateNaissance: ['', Validators.required],
		});
	}

	OnOpenModal() {
		if(this.modal == undefined) {
			// @ts-ignore
			this.modal = new bootstrap.Modal("#createPatientModal");
		}

		this.modal.show();
	}

	onSavePatient() {
		this.submitted = true;

		if (this.patientFormGroup?.invalid) {
			return;
		}

		this.patientService.save(this.patientFormGroup?.value).subscribe({
			next: () => {
				// TODO: Show success

				this.modal.hide();
			}
		});
	}
}
