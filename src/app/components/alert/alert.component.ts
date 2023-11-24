import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
	alerts: Alert[] = [];

	ngOnInit(): void {
		(window as any).sendAlert = (type: string, message: string) => {
			this.alerts.push(new Alert(type, message));

			setTimeout(() => {
				this.alerts.pop();
			}, 5000)
		};
	}
}

class Alert {

	constructor(public type: string, public message: string) {
	}
}
