import Route from '@ember/routing/route';
import {
	inject
} from '@ember/service';
export default Route.extend({
	cookies: inject(),
	// beforeModel(transition) {
	//     if(!this.get('cookies').exists('uid')) {
	//         let loginController = this.controllerFor('index');
	//         loginController.set('previousTransition', transition);
	//         this.transitionTo('index');
	//     }
	// },
	beforeModel(transition) {
		// console.log(transition);
		// let url = transition.intent.url;
		// console.log(url);
		// console.log(this.get('cookies').read('user_role'));
		// let role = this.get('cookies').read('user_role')
		// if (role === 1) {
		// }
		// this._super(controller, model);

	},

});