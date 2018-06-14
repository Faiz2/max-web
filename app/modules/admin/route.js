import Route from '@ember/routing/route';
import {
	inject
} from '@ember/service';

export default Route.extend({
	cookies: inject(),

	beforeModel(transition) {
		let role = this.get('cookies').read('user_role');

		if (role === "1") {
			// this.transitionTo('admin.data-center');
		} else if (role === "0") {
			this.transitionTo('data-center');
		} else {
			this.transitionTo('/');
		}
	},

});