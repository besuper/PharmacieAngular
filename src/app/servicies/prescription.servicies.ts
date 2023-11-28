import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Patient} from "../entities/patient.entities";
import {Prescription} from "../entities/prescription.entities";

@Injectable({providedIn: "root"})

export class PrescriptionsService {
	private host = environment.host;

	constructor(private http: HttpClient) {
	}

	getPrescription(idPrescription: number): Observable<Prescription> {
		return this.http.get<Prescription>(this.host + '/prescriptions/' + idPrescription);
	}

	searchPrescriptions(start: Date, end: Date): Observable<Prescription[]> {
		return this.http.get<Prescription[]>(this.host + '/prescriptions/' + start + "/" + end);
	}

	deletePrescription(prescription: Prescription): Observable<void> {
		return this.http.delete<void>(this.host + '/prescriptions/' + prescription.id);
	}

	save(prescription: Prescription): Observable<Prescription> {
		return this.http.post<Prescription>(this.host + '/prescriptions', prescription);
	}

	updatePrescription(prescription: Prescription): Observable<Prescription> {
		return this.http.put<Prescription>(this.host + '/prescriptions/' + prescription.id, prescription);
	}
}
