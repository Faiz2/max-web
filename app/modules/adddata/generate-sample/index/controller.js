import { computed } from '@ember/object';
import Controller from '@ember/controller';
import {inject} from '@ember/service';
import rsvp from 'rsvp';
import SampleObject from '../../../common/xmpp-message-object/SampleObjectMessage'
import styles from '../styles';

export default Controller.extend({
    ajax: inject(),
    progress: inject('circle-progress-serivce'),
    circleProgressOption: computed('progress.option', function() {
        return this.get('progress').getOption();
    }),
    styles,
    SampleObject,
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
                    "job_id": "5adfeb4b52d78f67585c9d84",
                    "user_id": "5ad871fe52d78f494e56e772",
                    "company_id": "5ad871fd52d78f494e56e771",
                    "args": {
                        "company": "nhwa",
                        "cpa": "cpa.xlsx",
                        "gycx": "gycx.xlsx",
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
        cantFindMonth: function() {
            
        }
    }
});
