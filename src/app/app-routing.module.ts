import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PatientsComponent} from "./components/patients/patients.component";
import {NewpatientComponent} from "./components/newpatient/newpatient.component";
import {EditpatientComponent} from "./components/editpatient/editpatient.component";
import {PrescriptionsComponent} from "./components/prescriptions/prescriptions.component";
import {EditprescriptionComponent} from "./components/editprescription/editprescription.component";
import {MedecinsComponent} from "./components/medecins/medecins.component";

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'patients', component: PatientsComponent},
	{path: 'prescriptions', component: PrescriptionsComponent},
	{path: 'medecins', component: MedecinsComponent},
	{path: 'editPatient/:idPatient', component: EditpatientComponent},
	{path: 'prescription/:idPrescription', component: EditprescriptionComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
