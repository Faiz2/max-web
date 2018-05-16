import Mixin from '@ember/object/mixin';
import { later } from '@ember/runloop';
import SampleObject from '../common/xmpp-message-object/SampleObjectMessage';
import MaxCalculateObject from '../common/xmpp-message-object/MaxCalculateMessage';

// TODO: 第一波结束 重构xmpp
export default Mixin.create({
    record: 0,
    callback(controllInstance, xmppConn, services) {
        let that = this;
        xmppConn.listen({
            onOpened: function ( message ) {window.console.log("连接成功")},
            onClosed: function ( message ) {alert("异地登入")},
            onTextMessage: function ( message ) {
                window.console.info(message)
                that.Msg(controllInstance, JSON.parse(message.data), services);
            },
            onOnline: function () {window.console.info("上线啦")}, //本机网络连接成功
            onOffline: function () {window.console.info("掉线啦")}, //本机网络掉线
            onError: function ( message ) {}           //失败回调
        });

    },
    Msg(controllInstance, message, services) {
        if (message.target === services.cookies.read('uid')) {
            let call = message.call + "Msg";
            if (message.attributes.progress >= this.get('record')
                && message.attributes.progress != 100) {
                this[call](controllInstance, message, services);
                this.set('record', message.attributes.progress)
            } else if (message.stage == 'done') {
                this[call](controllInstance, message, services);
                this.set('record', 0);
            }
        }
    },
    ymCalcMsg(controllInstance, message, services) {
         SampleObject._ymCalcMsg(message, services);
    },
    panelMsg(controllInstance, message, services) {
        SampleObject._panelMsg(controllInstance, message, services)
    },
    calcMsg(controllInstance, message, services) {
        switch(message.stage) {
            case 'start':
                // MaxCalculateObject.set('isShowCalcProgress', true);
                // services.progress.setPercent(message.attributes.progress);
                break;
            case 'ing':
                MaxCalculateObject.set('isShowCalcProgress', true);
                services.progress.setPercent(message.attributes.progress);
                break;
            case 'done':
                MaxCalculateObject.set('calcHasDone', true);
                later(controllInstance, function() {
                    services.progress.setPercent(message.attributes.progress);
                }, 500);
                break;
            case 'error':
                MaxCalculateObject.set('calculateState', true);
                break;
            default:
                window.console.info('default');
        }
    }
});
