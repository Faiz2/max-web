import Mixin from '@ember/object/mixin';
import { later } from '@ember/runloop';

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
                window.console.info(JSON.parse(message.data));
                this.Msg(conteollInstance, JSON.parse(message.data), services);
            },
            onOnline: function () {},                  //本机网络连接成功
            onOffline: function () {},                 //本机网络掉线
            onError: function ( message ) {}           //失败回调
        });
        this.Msg(conteollInstance, "ymCalc", services);
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
        //         this.set('isShowProgress', true); // 开启进度条
        //         break;
        //     case 'ing':
        //         services.progress.setPercent(message.attributes.progress);
        //         break;
        //     case 'done':
        //         services.progress.setPercent(message.attributes.progress);
        //         let list = ["201601", "201602", "201603", "201604", "201605", "201606"]
        //         this.set('years', list);
        //         this.set('yearsSuccessModal', true); // 解析后弹框 要改成这个
        //         this.set('isUploadRight', true); // 解析后标识
        //         this.set('progressRight', true);// 正确弹框
        //         break;
        //     case 'error':
        //         this.set('isUploadRight', false);
        //         this.set('yearsErrorModal', true);
        //         break;
        //     default:
        //         window.console.info('default');
        // }

        later(this, function() {
            this.set('isShowProgress', true); // 开启进度条
            services.progress.setPercent(10)
            let list = ["201601", "201602", "201603", "201604", "201605", "201606"]
            this.set('years', list);
            services.progress.setPercent(100);

            this.set('yearsSuccessModal', true); // 解析后弹框 要改成这个
            this.set('isUploadRight', true); // 解析后弹框

            set(this, 'progressRight', true);

        }, 2000);
    },
    ProgressMsg(conteollInstance, message, services) {
        // services.progress.setPercent(10)
        // later(conteollInstance, function() {
        //     conteollInstance.transitionToRoute('demo')
        // }, 1000);
    }
});
