import {Component, OnInit} from '@angular/core';
import {Prescription} from "../../entities/prescription.entities";
import {PrescriptionsService} from "../../servicies/prescription.servicies";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {InfosService} from "../../servicies/info.servicies";
import {Info} from "../../entities/info.entities";

@Component({
	selector: 'app-editprescription',
	templateUrl: './editprescription.component.html',
	styleUrl: './editprescription.component.css'
})
export class EditprescriptionComponent implements OnInit {

	idPrescription: number = 1;
	prescription?: Prescription;

	prescriptionFormGroup?: FormGroup;

	infos?: Info[];

	constructor(private infoService: InfosService,
				private prescriptionService: PrescriptionsService,
				private fb: FormBuilder,
				private router: Router,
				activatedRoute: ActivatedRoute) {

		this.idPrescription = activatedRoute.snapshot.params.idPrescription;
	}


	ngOnInit(): void {
		this.prescriptionService.getPrescription(this.idPrescription).subscribe({
			next: (pres) => {
				this.prescription = pres;

				this.prescriptionFormGroup = this.fb.group({
					id: [pres.id, Validators.required],
					medecin: [pres.medecin.nom + " " + pres.medecin.prenom, Validators.required],
					patient: [pres.patient.nom + " " + pres.patient.prenom, Validators.required],
					date: [pres.datePrescription, Validators.required],
					cout_total: [pres.cout_total, Validators.required],
				});

				this.infoService.getPrescriptionInfos(pres.id).subscribe({
					next: (data) => {
						this.infos = data;
					},
					error: (err) => {
						(window as any).sendAlert("danger", err);
					}
				})
			},
			error: (err) => {
				(window as any).sendAlert("danger", err);
			}
		});
	}

	seePatient() {
		this.router.navigateByUrl("/editPatient/" + this.prescription?.patient.id);
	}

	onAddedInfo(info: Info) {
		this.infos?.push(info);

		// Mettre a jour le prix total de la prescription
		let new_cout_total = 0;

		for (let i of this.infos!) {
			new_cout_total += i.medicament.prixUnitaire * i.quantite;
		}

		this.prescriptionFormGroup?.patchValue({
			"cout_total": new_cout_total.toFixed(2)
		});
	}

}
