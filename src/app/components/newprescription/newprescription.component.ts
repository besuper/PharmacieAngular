import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../entities/patient.entities";
import {PrescriptionsService} from "../../servicies/prescription.servicies";
import {Observable, Subject} from "rxjs";
import {MedecinsService} from "../../servicies/medecin.servicies";
import {Medecin} from "../../entities/medecin.entities";
import {Prescription} from "../../entities/prescription.entities";

@Component({
	selector: 'app-newprescription',
	templateUrl: './newprescription.component.html',
	styleUrl: './newprescription.component.css'
})
export class NewprescriptionComponent implements OnInit {
	prescriptionFormGroup?: FormGroup;
	submitted = false;
	modal: any;

	medecins: Medecin[] = [];

	@Input() patient?: Patient;
	@Output() addedPrescription: EventEmitter<any> = new EventEmitter<any>();

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
			this.prescriptionFormGroup = this.fb.group({
				datePrescription: [new Date().toISOString().substring(0, 10), Validators.required],
				medecin: ['', Validators.required],
				patient: new FormControl({
					value: `${this.patient.nom} ${this.patient.prenom}`,
					disabled: true
				}, Validators.required),
			});
		} else {
			this.prescriptionFormGroup = this.fb.group({
				datePrescription: [new Date().toISOString().substring(0, 10), Validators.required],
				medecin: ['', Validators.required],
				patient: ["", Validators.required],
			});
		}
	}

	OnOpenModal() {
		if (this.modal == undefined) {
			// @ts-ignore
			this.modal = new bootstrap.Modal("#createPrescriptionModal");
		}

		this.modal.show();
	}

	findMedecin(): Medecin | undefined {
		let wantedMedecin: string = this.prescriptionFormGroup?.value.medecin.split(" ");
		let medecin: Medecin | undefined = undefined;
		let wantedName = wantedMedecin[0];
		let wantedFirstname = wantedMedecin[1];

		for (const med of this.medecins) {
			if (med.nom == wantedName && med.prenom == wantedFirstname) {
				medecin = med;
				break;
			}
		}

		return medecin;
	}

	onSavePatient() {
		this.submitted = true;

		if (this.prescriptionFormGroup?.invalid) {
			return;
		}

		let medecin: Medecin | undefined = this.findMedecin();

		if (medecin == undefined) {
			this.prescriptionFormGroup?.controls.medecin.setErrors({'not': true});
			return;
		}

		if (!this.patient) {
			// TODO: Find patient
		}

		if (this.patient == undefined) {
			this.prescriptionFormGroup?.controls.patient.setErrors({'not': true});
			return;
		}

		let values = this.prescriptionFormGroup?.value;
		let body = {
			datePrescription: values.datePrescription,
			medecin: {
				id: medecin.id
			},
			patient: {
				id: this.patient!.id
			}
		};

		this.prescriptionService.save(body).subscribe({
			next: (prescription) => {
				(window as any).sendAlert("success", "Prescription créé");

				this.modal.hide();

				this.addedPrescription.emit(prescription);
			}
		});
	}
}
