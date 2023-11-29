import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../entities/patient.entities";
import {PrescriptionsService} from "../../servicies/prescription.servicies";
import {Observable, Subject} from "rxjs";
import {MedecinsService} from "../../servicies/medecin.servicies";
import {Medecin} from "../../entities/medecin.entities";

@Component({
	selector: 'app-newprescription',
	templateUrl: './newprescription.component.html',
	styleUrl: './newprescription.component.css'
})
export class NewprescriptionComponent implements OnInit {
	prescriptionFormGroup?: FormGroup;
	submitted = false;
	modal: any;

	@Input("patient") patient?: Observable<Patient>;
	medecins: Medecin[] = [];

	constructor(private fb: FormBuilder,
				private prescriptionService: PrescriptionsService,
				private medecinService: MedecinsService) {
	}

	ngOnInit(): void {
		this.medecinService.getMedecins().subscribe({
			next: (data) => {
				this.medecins = data;
			},
			error: (err) => {
				(window as any).sendAlert("danger", err);
			}
		})

		if (this.patient) {
			this.patient.subscribe({
				next: (patient) => {
					this.prescriptionFormGroup = this.fb.group({
						datePrescription: [new Date().toISOString().substring(0, 10), Validators.required],
						medecin: ['', Validators.required],
						patient: new FormControl({
							value: `${patient.nom} ${patient.prenom}`,
							disabled: true
						}, Validators.required),
					});
				}
			})
		}

		this.prescriptionFormGroup = this.fb.group({
			datePrescription: [new Date().toISOString().substring(0, 10), Validators.required],
			medecin: ['', Validators.required],
			patient: ["", Validators.required],
		});
	}

	OnOpenModal() {
		if (this.modal == undefined) {
			// @ts-ignore
			this.modal = new bootstrap.Modal("#createPrescriptionModal");
		}

		this.modal.show();
	}

	onSavePatient() {
		this.submitted = true;

		if (this.prescriptionFormGroup?.invalid) {
			return;
		}

		let wantedMedecin: string = this.prescriptionFormGroup?.value.medecin.split(" ");
		let medecin: Medecin | undefined = undefined;
		let wantedName = wantedMedecin[0];
		let wantedFirstname = wantedMedecin[1];

		for(const med of this.medecins) {
			if(med.nom == wantedName && med.prenom == wantedFirstname) {
				medecin = med;
				break;
			}
		}

		if(medecin == undefined) {
			// set errors
			return;
		}

		/*this.prescriptionService.save(this.prescriptionFormGroup?.value).subscribe({
			next: () => {
				(window as any).sendAlert("success", "Patient créé");

				this.modal.hide();
			}
		});*/
	}
}
