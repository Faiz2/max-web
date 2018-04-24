import Component from '@ember/component';
import { set} from '@ember/object';
import { later } from '@ember/runloop';
// import { inject } from '@ember/service';

export default Component.extend({
    isShowCalcProgress: false, // scalc-max中开始按钮控制的进度显示
    calcHasDone: false,    // MAX计算是否完成
    actions: {
        // calc-max 中的开始计算按钮
        startCalcMAX() {
            set(this, 'isShowCalcProgress', true);

            later(() => {
                set(this, 'calcHasDone', true);
            }, 1800);
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
