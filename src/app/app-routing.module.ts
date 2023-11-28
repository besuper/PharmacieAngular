import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PatientsComponent} from "./components/patients/patients.component";
import {NewpatientComponent} from "./components/newpatient/newpatient.component";
import {EditpatientComponent} from "./components/editpatient/editpatient.component";

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'patients', component: PatientsComponent},
	{path: "editPatient/:idpatient", component: EditpatientComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
