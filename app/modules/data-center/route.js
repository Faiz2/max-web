import Route from '@ember/routing/route';
import {
	inject
} from '@ember/service';
export default Route.extend({
	cookies: inject(),
	beforeModel(transition) {
		let role = this.get('cookies').read('user_role');
		// console.log(role);

		if (role === "1") {
			this.transitionTo('admin.data-center');
		} else if (role === "0") {

		} else {
			this.transitionTo('/');
		}
	},

});