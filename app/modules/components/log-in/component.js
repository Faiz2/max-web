import Component from '@ember/component';
import {get} from '@ember/object';
export default Component.extend({
    password: null,
    username: null,
    actions: {
        logIn() {
            console.log(this.get('password'))
        }
    }
});
