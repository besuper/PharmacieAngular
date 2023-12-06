import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientsService} from "../../servicies/patients.servicies";
import {InfosService} from "../../servicies/info.servicies";
import {Medicament} from "../../entities/medicament.entities";
import {MedicamentsServicies} from "../../servicies/medicament.servicies";
import {Patient} from "../../entities/patient.entities";
import {Prescription} from "../../entities/prescription.entities";

@Component({
	selector: 'app-newinfo',
	templateUrl: './newinfo.component.html',
	styleUrl: './newinfo.component.css'
})
export class NewinfoComponent implements OnInit {

	infoFormGroup?: FormGroup;
	submitted = false;
	modal: any;

	medicaments: Medicament[] = [];

	@Input("prescription") prescription?: Prescription;
	@Output("addedInfo") addedInfo: EventEmitter<any> = new EventEmitter<any>();

	constructor(private fb: FormBuilder, private infoService: InfosService, private medicamentService: MedicamentsServicies) {
	}

	ngOnInit(): void {
		this.infoFormGroup = this.fb.group({
			medicament: [0, [Validators.required, Validators.min(1)]],
			quantite: [1, [Validators.required, Validators.min(1)]],
		});

		// Charger les médicaments existant
		if (this.medicaments.length == 0) {
			this.medicamentService.getMedicaments().subscribe({
				next: (data) => {
					this.medicaments = data;
				}
			})
		}
	}

	onOpenModal() {
		if (this.modal == undefined) {
			// @ts-ignore
			this.modal = new bootstrap.Modal("#createInfoModal");
		}

		this.modal.show();
	}

	onSaveInfo() {
		this.submitted = true;

		if (this.infoFormGroup?.invalid) {
			return;
		}

		console.log(this.infoFormGroup?.value);

		let formValues = this.infoFormGroup?.value;

		let body = {
			"medicament": {
				"id": parseInt(formValues.medicament)
			},
			"prescription": {
				"id": this.prescription?.id
			},
			"quantite": formValues.quantite
		};

		this.infoService.save(body).subscribe({
			next: (info) => {
				(window as any).sendAlert("success", "Médicament ajouté");

				this.modal.hide();

				this.addedInfo.emit(info);
			}
		});
	}
}
