import Mixin from '@ember/object/mixin';
import { later } from '@ember/runloop';
import SampleObject from '../common/xmpp-message-object/SampleObjectMessage';
import MaxCalculateObject from '../common/xmpp-message-object/MaxCalculateMessage';

// TODO: 第一波结束 重构xmpp
export default Mixin.create({
    record: 0,
    callback(conteollInstance, xmppConn, services) {
        let that = this;
        xmppConn.listen({
            onOpened: function ( message ) {window.console.log("连接成功")},
            onClosed: function ( message ) {
                alert("异地登入")
            },
            onTextMessage: function ( message ) {
                window.console.info(message)
                that.Msg(conteollInstance, JSON.parse(message.data), services);
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

        // if (message.target === services.cookies.read('uid')) {
        // }
        let call = message.call + "Msg";
        if (message.attributes.progress >= this.get('record')
            && message.attributes.progress != 100) {
            this[call](conteollInstance, message, services);
            this.set('record', message.attributes.progress)
        } else if (message.stage == 'done') {
            this[call](conteollInstance, message, services);
            this.set('record', 0);
        }

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
                    SampleObject.set('fileParsingSuccess', true); // 解析成功 years modal
                }, 500);
                break;
            case 'error':
                SampleObject.set('fileParsingError', true); // 解析失败 error modal
                break;
            default:
                window.console.info('default');
        }
    },
    panelMsg(conteollInstance, message, services) {
        switch(message.stage) {
            case 'start':
                SampleObject.set('fileParsingSuccess', false);
                later(conteollInstance, function() {
                    services.progress.setPercent(message.attributes.progress);
                }, 500);
                break;
            case 'ing':
                SampleObject.set('fileParsingSuccess', false);
                services.progress.setPercent(message.attributes.progress);
                break;
            case 'done':
                services.progress.setPercent(message.attributes.progress);
                let panel = message.attributes.content.panel
                services.cookies.write('panel', panel);
                later(conteollInstance, function() {
                    conteollInstance.transitionToRoute('adddata.generate-sample.sample-finish')
                }, 2000);
                break;
            case 'error':
                SampleObject.set('fileParsingError', true);
                break;
            default:
                window.console.info('default');
        }
    },
    calcMsg(conteollInstance, message, services) {
        switch(message.stage) {
            case 'start':
                MaxCalculateObject.set('isShowCalcProgress', true);
                services.progress.setPercent(message.attributes.progress);
                break;
            case 'ing':
                services.progress.setPercent(message.attributes.progress);
                break;
            case 'done':
                MaxCalculateObject.set('calcHasDone', true);
                later(conteollInstance, function() {
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
