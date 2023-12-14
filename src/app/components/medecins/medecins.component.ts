import {Component, OnInit} from '@angular/core';
import {Patient} from "../../entities/patient.entities";
import {PatientsService} from "../../servicies/patients.servicies";
import {Router} from "@angular/router";
import {Medecin} from "../../entities/medecin.entities";
import {MedecinsService} from "../../servicies/medecin.servicies";

@Component({
	selector: 'app-medecins',
	templateUrl: './medecins.component.html',
	styleUrl: './medecins.component.css'
})
export class MedecinsComponent implements OnInit {

	medecins?: Medecin[];

	constructor(private medecinService: MedecinsService, private router: Router) {
	}

	ngOnInit() {
		this.medecinService.getMedecins().subscribe({
			next: (medecins) => {
				this.medecins = medecins;
			}
		})
	}

}
