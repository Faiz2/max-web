import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
    webIm: inject('web-im'),
    init() {
        this._super(...arguments);
        const { result, status, message} = this.get('webIm').load();
        if(status === 'yes') {
            let conn = result;
            conn.listen({
                onOpened: function ( message ) {//连接成功回调
                    window.console.log("连接成功");
                },
                onClosed: function ( message ) {},
                onTextMessage: function ( message ) {
                    window.console.info(message)
                }
            });
        } else {
            // this.transitionTo('login');
            this.set('webImErrorMessage', message);
        }
    }

});
