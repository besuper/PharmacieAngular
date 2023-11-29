import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Patient} from "../entities/patient.entities";
import {Medecin} from "../entities/medecin.entities";

@Injectable({providedIn: "root"})

export class MedecinsService {
	private host = environment.host;

	constructor(private http: HttpClient) {
	}

	getMedecins(): Observable<Medecin[]> {
		return this.http.get<Medecin[]>(this.host + '/medecins/all');
	}
}
