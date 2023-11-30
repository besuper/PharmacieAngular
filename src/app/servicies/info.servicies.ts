import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Patient} from "../entities/patient.entities";
import {Medecin} from "../entities/medecin.entities";
import {Info} from "../entities/info.entities";

@Injectable({providedIn: "root"})

export class InfosService {
	private host = environment.host;

	constructor(private http: HttpClient) {
	}

	getPrescriptionInfos(idPrescription: number): Observable<Info[]> {
		return this.http.get<Info[]>(this.host + '/infos/' + idPrescription);
	}
}
