import { computed } from '@ember/object';
import Component from '@ember/component';
import { later } from '@ember/runloop';
import {inject} from '@ember/service';
import rsvp from 'rsvp';
import ymCalcObject from '../../common/xmpp-message-object/ymCalcMessage';

export default Component.extend({
    ajax: inject(),
    progress: inject('circle-progress-serivce'),
    circleProgressOption: computed('progress.option', function() {
        return this.get('progress').getOption();
    }),
    // isDisabled: true,
    // isShowProgress: false,  // step two 中开始按钮控制的进度显示
    // isUploadRight: true,  // 文件解析过程中是否正确
    // progressRight: false,   // 文件解析正确弹窗
    // progressWrong: false,   // 文件解析错误弹窗
    hasResult: false,   // 文件解析是否有结果
    // modelData: '',  // 接收表格数据
    // columnsData: '',    // 接受表格表头信息
    ymCalcObj: ymCalcObject,
    getAjaxOpt(data) {
        return {
            method: 'POST',
            dataType: "json",
            cache: false,
            data: JSON.stringify(data),
            contentType: "application/json,charset=utf-8",
            Accpt: "application/json,charset=utf-8",
        }
    },
    actions: {
        // generate-sample 中的开始按钮
        startCalc() {
            let condition = {
                "condition": {
                    "job_id": "5adfeb4b52d78f67585c9d84",
                    "user_id": "5ad871fe52d78f494e56e772",
                    "company_id": "5ad871fd52d78f494e56e771",
                    "args": {
                        "company": "nhwa",
                        "cpa": "cpa.xlsx",
                        "gycx": "gycx.xlsx"
                    }
                }
            };

            this.set('isShowProgress', true);
            this.set('isUploadRight', true);


            // new rsvp.Promise((resolve, reject) => {
            //     return this.get('ajax').request('api/job/ymCalc',
            //         this.getAjaxOpt(condition)).then((response) => {
            //             window.console.info(response);
            //             return resolve({ resule: response });
            //         },
            //             () => {
            //                 return reject("Access Error");
            //             }
            //         );
            // });
            // if (this.get('isUploadRight') === true) {
            //     later(() => {
            //         set(this, 'progressRight', true);
            //     }, 10 * 1000);
            // } else {
            //     later(() => {
            //         set(this, 'progressWrong', true);
            //     }, 1800);
            // }
        },

        // 文件解析成功
        calcRight() {

            let condition = {
                "condition": {
                    "job_id": "5adfeb4b52d78f67585c9d84",
                    "user_id": "5ad871fe52d78f494e56e772",
                    "company_id": "5ad871fd52d78f494e56e771",
                    "args": {
                        "company": "nhwa",
                        "cpa": "cpa.xlsx",
                        "gycx": "gycx.xlsx",
                        "ym":"201711,201712"
                    }
                }
            };
            new rsvp.Promise((resolve, reject) => {
                return this.get('ajax').request('api/job/panel',
                    this.getAjaxOpt(condition)).then((response) => {
                        window.console.info(response);
                        return resolve({ resule: response });
                    },
                        () => {
                            return reject("Access Error");
                        }
                    );
            });

            this.set('progressRight', false);
            later(() => {
                this.set('hasResult', true);
            }, 1.5 * 60 * 1000);
        }
    },
});
