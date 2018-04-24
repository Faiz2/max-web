import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
export default Route.extend({
    setupController() {
        this._super(...arguments);
        this.controllerFor('login').set('password', get(this, 'password'));
    },
});
