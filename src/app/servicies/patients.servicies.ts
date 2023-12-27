import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Patient} from "../entities/patient.entities";

@Injectable({providedIn: "root"})

export class PatientsService {
	private host = environment.host;

	constructor(private http: HttpClient) {
	}

	getPatients(): Observable<Patient[]> {
		return this.http.get<Patient[]>(this.host + '/patients/all');
	}

	getPatient(idPatient: number): Observable<Patient> {
		return this.http.get<Patient>(this.host + '/patients/' + idPatient);
	}

	searchPatients(nom: string): Observable<Patient[]> {
		return this.http.get<Patient[]>(this.host + '/patients/nom=' + nom);
	}

	deletePatient(patient: Patient): Observable<void> {
		return this.http.delete<void>(this.host + '/patients/' + patient.id);
	}

	save(patient: Patient): Observable<Patient> {
		return this.http.post<Patient>(this.host + '/patients', patient);
	}

	updatePatient(patient: Patient): Observable<Patient> {
		return this.http.put<Patient>(this.host + '/patients/' + patient.id, patient);
	}
}
