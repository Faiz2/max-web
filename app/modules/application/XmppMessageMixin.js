import Mixin from '@ember/object/mixin';
import { later } from '@ember/runloop';
// 不要随便用这个Mixin
export default Mixin.create({
    callback(conteollInstance, xmppConn, services) {
        xmppConn.listen({
            onOpened: function ( message ) {window.console.log("连接成功")},
            onClosed: function ( message ) {
                later(conteollInstance, function() {
                    conteollInstance.transitionToRoute('login')
                }, 1000);
            },
            onTextMessage: function ( message ) {
                window.console.info(message)
            }
        });
        this.Msg(conteollInstance, "ProgressMsg")
    },
    Msg(conteollInstance, message) {
        this[message](conteollInstance, message);
    },
    ProgressMsg(conteollInstance, message) {
        // later(conteollInstance, function() {
        //     conteollInstance.transitionToRoute('demo')
        // }, 1000);
    },
    SampleCheckMsg(conteollInstance, message) {

    },
    ResultCheckMsg(conteollInstance, message) {

    }
});
