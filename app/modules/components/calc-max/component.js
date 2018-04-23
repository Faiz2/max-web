import Component from '@ember/component';
import { set, get } from '@ember/object';
import { later } from '@ember/runloop';
import SetPercent from '../circle-progress/setPercent';
import { inject } from '@ember/service';
// const { set,get } = Ember;

export default Component.extend({
    isShowCalcProgress: false, // scalc-max中开始按钮控制的进度显示
    calcHasDone: false,    // MAX计算是否完成
    actions: {
        // calc-max 中的开始计算按钮
        startCalcMAX() {
            set(this, 'isShowCalcProgress', true);

            // later(() => {
            //     set(this, 'calcHasDone', true);
            // }, 1800);
        },
    },
    poll: inject(),
    init() {
        this._super(...arguments);
        let objSetPercent = SetPercent.create();
        const callbackFn = () => {
            if(get(this,'isShowCalcProgress') === true) {
                objSetPercent.set('percent', objSetPercent.get('percent') + 1);
                this.set('option', objSetPercent.get('setOption'));
                // 判断出现正确 or 错误 的弹窗(目前根据百分比)
                if (objSetPercent.get('percent') === 100) {
                    this.get('poll').stopPollByLabel('calcmaxcircle');
                    // set(this, 'progressRight', true);
                    // objSetPercent.set('percent', 100);
                    set(this, 'calcHasDone', true);
                } 
            }

        };
        this.get('poll').addPoll({
            interval: 1 * 300,
            callback: callbackFn,
            label: 'calcmaxcircle'
        });
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
