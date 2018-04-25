import Route from '@ember/routing/route';
import {set,get} from '@ember/object';

export default Route.extend({
    userid: '',
    password: '',
    setupController() {
        this._super(...arguments);
        this.controllerFor('login').set('userid', get(this, 'userid'));
        this.controllerFor('login').set('password', get(this, 'password'));
    },
    actions: {
        sbtinfo() {
            console.log('username:')
            console.info(get(this, 'userid'));
            console.info(get(this, 'password'));
        }
    }

});
