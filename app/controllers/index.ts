import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import calculate from '../helpers/calculate'

export default class Index extends Controller {
	@service notifications: any;

	@tracked cost = 0.25;
	@tracked bags = 1;

	@action
	calculate() {
		const calculation = calculate(this.cost, this.bags);
		this.notifications.success(`Answer: ${calculation}`, {
			clearDuration: 3000,
			autoClear: true
		});

		return calculation;
	}
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
	interface Registry {
		'index': Index;
	}
}
