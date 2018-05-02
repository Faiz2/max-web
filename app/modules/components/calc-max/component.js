import Component from '@ember/component';
import { set} from '@ember/object';
import { later } from '@ember/runloop';
import { inject } from '@ember/service';
import rsvp from 'rsvp';

export default Component.extend({
    ajax: inject(),
    isShowCalcProgress: false, // scalc-max中开始按钮控制的进度显示
    calcHasDone: false,    // MAX计算是否完成
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
        // calc-max 中的开始计算按钮
        startCalcMAX() {
            set(this, 'isShowCalcProgress', true);
            let condition = {
                "condition": {
                    "job_id": "5adfeb4b52d78f67585c9d84",
                    "user_id": "5ad871fe52d78f494e56e772",
                    "company_id": "5ad871fd52d78f494e56e771",
                    "args": {
                        "panel": "asdsadas"
                    }
                }
            };
            new rsvp.Promise((resolve, reject) => {
                return this.get('ajax').request('api/job/calc',
                    this.getAjaxOpt(condition)).then((response) => {
                        window.console.info(response);
                        return resolve({ resule: response });
                    },
                        () => {
                            return reject("Access Error");
                        }
                    );
            });

            // later(() => {
            //     set(this, 'calcHasDone', true);
            // }, 1800);
        },
    },
    // poll: inject(),
    init() {
        this._super(...arguments);
        // let objSetPercent = SetPercent.create();
        this.set('option', {
            title: {
                text: '0%',
                x: 'center',
                y: 'center',
                textStyle: {
                    color: '#60b3ad',
                    fontSize: 24,
                }
            },
            series: [{
                type: 'pie',
                radius: ['37%', '40%'],
                silent: true,
                label: {
                    normal: {
                        show: false,
                    }
                },
                data: [{
                    value: 1,
                    itemStyle: {
                        normal: {
                            color: '#dedede',
                            shadowBlur: 10,
                            shadowColor: '#dedede',
                        }
                    }
                }],
                animation: false,
            }, {
                type: 'pie',
                radius: ['37%', '40%'],
                silent: true,
                label: {
                    normal: {
                        show: false,
                    }
                },
                data: [{
                    value: 1,
                    itemStyle: {
                        normal: {
                            color: '#dedede',
                            shadowBlur: 10,
                            shadowColor: '#dedede',
                        }
                    }
                }],
                animation: false
            }, {
                name: 'main',
                type: 'pie',
                radius: ['37%', '40%'],
                label: {
                    normal: {
                        show: false,
                    }
                },
                data: [{
                    value: 0,
                    itemStyle: {
                        normal: {
                            color: '#60b3ad',
                            shadowBlur: 10,
                            shadowColor: '#60b3ad',
                        }
                    }
                }, {
                    value: 100 - 0,
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    }
                }],
                hoverAnimation: false,
                animationEasingUpdate: 'cubicInOut',
                animationDurationUpdate: 500
            }]
        });
    }
});
