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
                window.console.info(JSON.parse(message.data))
                // window.console.info(message)
            },
            onOnline: function () {},                  //本机网络连接成功
            onOffline: function () {},                 //本机网络掉线
            onError: function ( message ) {}          //失败回调
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
