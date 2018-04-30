import Mixin from '@ember/object/mixin';
import { later } from '@ember/runloop';
import ymCalcObject from '../common/xmpp-message-object/ymCalcMessage';

export default Mixin.create({
    callback(conteollInstance, xmppConn, services) {
        let that = this;
        xmppConn.listen({
            onOpened: function ( message ) {window.console.log("连接成功")},
            onClosed: function ( message ) {
                later(conteollInstance, function() {
                    conteollInstance.transitionToRoute('/')
                }, 1000);
            },
            onTextMessage: function ( message ) {
                // window.console.info(JSON.parse(message.data));
                // window.console.info(message);
                // that.Msg(conteollInstance, JSON.parse(message.data), services);
                that.Msg(conteollInstance, "ymCalc", services);
            },
            onOnline: function () {},                  //本机网络连接成功
            onOffline: function () {},                 //本机网络掉线
            onError: function ( message ) {}           //失败回调
        });

    },
    Msg(conteollInstance, message, services) {

        // if (message.target === services.cookies.read('webim_user')) {
        //     let call = message.call + "Msg";
        //     this[call](conteollInstance, message, services);
        // }
        let call = message + "Msg";
        this[call](conteollInstance, message, services);
    },
    ymCalcMsg(conteollInstance, message, services) {
        // 真实处理情况 状态要重构了，好乱
        // switch(message.stage) {
        //     case 'start':
        //         ymCalcObject.set('isShowProgress', true); // 开启进度条
        //         break;
        //     case 'ing':
        //         services.progress.setPercent(message.attributes.progress);
        //         break;
        //     case 'done':
        //         services.progress.setPercent(message.attributes.progress);
        //         let list = ["201601", "201602", "201603", "201604", "201605", "201606"]
        //         ymCalcObject.set('years', list);
        //         ymCalcObject.set('yearsSuccessModal', true); // 解析后弹框 要改成这个
        //         ymCalcObject.set('isUploadRight', true); // 解析后标识
        //         ymCalcObject.set('progressRight', true);// 正确弹框
        //         break;
        //     case 'error':
        //         ymCalcObject.set('isUploadRight', false);
        //         ymCalcObject.set('yearsErrorModal', true);
        //         break;
        //     default:
        //         window.console.info('default');
        // }

        services.progress.setPercent(Math.floor(Math.random() * 100) + 1);

        later(this, function() {
            services.progress.setPercent(100);
            let list = ["201601", "201602", "201603", "201604", "201605", "201606"]
            ymCalcObject.set('years', list);
            ymCalcObject.set('yearsSuccessModal', true); // 解析后弹框 要改成这个
            ymCalcObject.set('isUploadRight', true); // 解析后弹框
            ymCalcObject.set('progressRight', true);

        }, 5000);
    },
    ProgressMsg(conteollInstance, message, services) {
        // services.progress.setPercent(10)
        // later(conteollInstance, function() {
        //     conteollInstance.transitionToRoute('demo')
        // }, 1000);
    }
});
