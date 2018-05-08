import { computed } from '@ember/object';
import Controller from '@ember/controller';
import {inject} from '@ember/service';
import rsvp from 'rsvp';
import SampleObject from '../../../common/xmpp-message-object/SampleObjectMessage'
import styles from '../styles';

export default Controller.extend({
    ajax: inject(),
    cookies: inject(),
    progress: inject('circle-progress-serivce'),
    circleProgressOption: computed('progress.option', function() {
        return this.get('progress').getOption();
    }),
    styles,
    SampleObject,
    init() {
        this._super(...arguments);
        this.set('cpafilename', this.get('cookies').read('filecpa'))
        this.set('gycxfilename', this.get('cookies').read('filegycx'))
    },
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
        startParsingFile: function() {
            let condition = {
                "condition": {
                    "job_id": this.get('cookies').read('job_id'),
                    "user_id": this.get('cookies').read('uid'),
                    "args": {
                        "cpa": this.get('cookies').read('cpahash'),
                        "gycx": this.get('cookies').read('gycxhash') || ''
                    }
                }
            };
            new rsvp.Promise((resolve, reject) => {
                return this.get('ajax').request('api/job/ymCalc',
                    this.getAjaxOpt(condition)).then((response) => {
                        window.console.info(response);
                        return resolve({ resule: response });
                    },
                        () => {
                            return reject("Access Error");
                        }
                    );
            });
        },
        startGenerateSample: function() {
            // TODO : 未添加异常处理
            let years = this.get('SampleObject').years.filterBy('isChecked')
                .map((elt, i, array) => {
                    return elt.year
                });
            let condition = {
                "condition": {
                    "job_id": this.get('cookies').read('job_id'),
                    "user_id": this.get('cookies').read('uid'),
                    "args": {
                        "cpa": this.get('cookies').read('cpahash'),
                        "gycx": this.get('cookies').read('gycxhash') || '',
                        "ym":years.toString()
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
        },
        // 未显示要计算的月份
        cantFindMonth: function() {
            this.set('SampleObject.cantFindMonth', true);
        }
    }
});
