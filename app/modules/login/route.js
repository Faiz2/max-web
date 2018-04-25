import Route from '@ember/routing/route';
import {set,get} from '@ember/object';
import Userinfo from './userinfo';
import {inject} from '@ember/service';
export default Route.extend({
    userinfo: new Userinfo(),
    ajax: inject(),
    setupController() {
        this._super(...arguments);
        this.controllerFor('login').set('userinfo', get(this, 'userinfo'));
    },
    actions: {
        sbtinfo() {
            console.log('username:')
            console.info(get(this, 'userinfo'));
            console.info(get(this, 'userinfo.password'));
        }
    }

});
