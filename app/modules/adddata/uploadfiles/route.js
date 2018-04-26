import Route from '@ember/routing/route';
import {inject} from '@ember/service';
export default Route.extend({
    cookies: inject(),
    beforeModel(transition) {
        if (!this.controllerFor('index').get('userIsLoggedIn')) {
            let loginController = this.controllerFor('index');
            loginController.set('previousTransition', transition);
            this.transitionTo('index');
        }
    },
});
