import Controller from '@ember/controller';
import { inject } from '@ember/service';
import XmppMessageMixin from './XmppMessageMixin';
import { later } from '@ember/runloop';

export default Controller.extend(XmppMessageMixin, {
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
            this.callback(this, conn, services);
        } else {
            later(this, function() {
                this.set('webImErrorMessage', message);
                // this.transitionToRoute('/');
            }, 500);
        }
    },
});
