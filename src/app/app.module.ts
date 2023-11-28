import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PatientsComponent} from './components/patients/patients.component';
import {NewpatientComponent} from "./components/newpatient/newpatient.component";
import {AlertComponent} from './components/alert/alert.component';
import {EditpatientComponent} from "./components/editpatient/editpatient.component";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HomeComponent,
		PatientsComponent,
		NewpatientComponent,
		AlertComponent,
		EditpatientComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
