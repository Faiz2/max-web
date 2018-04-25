import Controller from '@ember/controller';
import { inject } from '@ember/service';
import xmppMessage from './xmppMessage';

export default Controller.extend({
    webIm: inject('xmpp-service'),
    progress: inject('circle-progress-serivce'),
    init() {
        this._super(...arguments);
        const { result, status, message} = this.get('webIm').load();
        let services = {
            'progress': this.get('progress')
        };
        if(status === 'yes') {
            let conn = result;
            xmppMessage.callback(conn, services);
        } else {
            // this.transitionTo('login');
            this.set('webImErrorMessage', message);
        }
    }

});
