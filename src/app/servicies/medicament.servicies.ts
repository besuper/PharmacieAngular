import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Patient} from "../entities/patient.entities";
import {Medecin} from "../entities/medecin.entities";
import {Info} from "../entities/info.entities";
import {Medicament} from "../entities/medicament.entities";

@Injectable({providedIn: "root"})

export class MedicamentsServicies {
	private host = environment.host;

	constructor(private http: HttpClient) {
	}

	getMedicaments(): Observable<Medicament[]> {
		return this.http.get<Medicament[]>(this.host + '/medicaments/all');
	}
}
