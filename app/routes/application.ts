
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import config from 'corn-calculator/config/environment';
import { inject as service } from '@ember/service';

export default class Application extends Route {
	@service headData;
	@service pageProgress;

	afterModel() {
		super.afterModel(...arguments);

		Object.keys(config.head)
			.forEach((key) => this.headData[key] = config.head[key]);
	}


	@action
	async loading(transition) {
		this.pageProgress.start(transition.targetName);

		try {
			await transition.promise;
		} finally {
			this.pageProgress.done();
		}

		return true;
	}
}
