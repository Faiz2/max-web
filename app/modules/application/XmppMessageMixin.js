import Mixin from '@ember/object/mixin';
import { later } from '@ember/runloop';
import SampleObject from '../common/xmpp-message-object/SampleObjectMessage';
import MaxCalculateObject from '../common/xmpp-message-object/MaxCalculateMessage';

export default Mixin.create({

    callback(conteollInstance, xmppConn, services) {
        let that = this;
        xmppConn.listen({
            onOpened: function ( message ) {window.console.log("连接成功")},
            onClosed: function ( message ) {
                // later(conteollInstance, function() {
                //     conteollInstance.transitionToRoute('/')
                // }, 1000);
                alert("异地登入")
            },
            onTextMessage: function ( message ) {
                window.console.info(message)
                that.Msg(conteollInstance, JSON.parse(message.data), services);
                // that.Msg(conteollInstance, "ymCalc", services);
            },
            onOnline: function () {
                window.console.info("上线啦")
            },                  //本机网络连接成功
            onOffline: function () {
                window.console.info("掉线啦")
            },                 //本机网络掉线
            onError: function ( message ) {}           //失败回调
        });

    },
    Msg(conteollInstance, message, services) {

        // if (message.target === services.cookies.read('webim_user')) {
        //     let call = message.call + "Msg";
        //     this[call](conteollInstance, message, services);
        // }
        let call = message.call + "Msg";
        this[call](conteollInstance, message, services);
    },
    ymCalcMsg(conteollInstance, message, services) {
        switch(message.stage) {
            case 'start':
                SampleObject.set('isShowProgress', true); // 开启进度条
                break;
            case 'ing':
                services.progress.setPercent(message.attributes.progress);
                break;
            case 'done':
                later(conteollInstance, function() {
                    services.progress.setPercent(message.attributes.progress);
                    let years = message.attributes.content.ymList.split(",")
                        .map((elt, i, array) => {
                            return {year: elt,isChecked: false}
                        });
                    SampleObject.set('years', years);
                    SampleObject.set('isUploadRight', true); // 解析后标识
                    SampleObject.set('progressRight', true);// 正确弹框
                }, 500);
                break;
            case 'error':
                SampleObject.set('isUploadRight', false);
                SampleObject.set('yearsErrorModal', true);
                break;
            default:
                window.console.info('default');
        }
    },
    panelMsg(conteollInstance, message, services) {
        switch(message.stage) {
            case 'start':
                SampleObject.set('progressRight', false);
                later(conteollInstance, function() {
                    services.progress.setPercent(message.attributes.progress);
                }, 500);
                break;
            case 'ing':
                services.progress.setPercent(message.attributes.progress);
                break;
            case 'done':
                services.progress.setPercent(message.attributes.progress);
                let panel = message.attributes.content.panel
                later(conteollInstance, function() {
                    conteollInstance.transitionToRoute('adddata.generate-sample.sample-finish')
                }, 1000);
                break;
            case 'error':
                SampleObject.set('isUploadRight', false);
                SampleObject.set('yearsErrorModal', true);
                break;
            default:
                window.console.info('default');
        }
    },
    calcMsg(conteollInstance, message, services) {
        switch(message.stage) {
            case 'start':
                MaxCalculateObject.set('isShowCalcProgress', true);
                later(conteollInstance, function() {
                    services.progress.setPercent(message.attributes.progress);
                }, 500);
                break;
            case 'ing':
                services.progress.setPercent(message.attributes.progress);
                break;
            case 'done':
                later(conteollInstance, function() {
                    services.progress.setPercent(message.attributes.progress);
                }, 500);
                MaxCalculateObject.set('calcHasDone', true);
                break;
            case 'error':
                SampleObject.set('isUploadRight', false);
                SampleObject.set('yearsErrorModal', true);
                break;
            default:
                window.console.info('default');
        }


    }
});
