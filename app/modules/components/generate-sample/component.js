import Component from '@ember/component';
import { set } from '@ember/object';
import { later } from '@ember/runloop';
import SetPercent from '../circle-progress/setPercent';
import { inject } from '@ember/service';
// import ObjectProxy from '@ember/object/proxy';
// const { set, get } = Ember;

export default Component.extend({
    isDisabled: true,
    isShowProgress: false,  // step two 中开始按钮控制的进度显示
    isUploadRight: true,  // 文件解析过程中是否正确
    progressRight: false,   // 文件解析正确弹窗
    progressWrong: false,   // 文件解析错误弹窗
    hasResult: false,   // 文件解析是否有结果
    modelData: '',  // 接收表格数据
    columnsData: '',    // 接受表格表头信息
    actions: {
        // generate-sample 中的开始按钮
        startCalc() {
            set(this, 'isShowProgress', true);
            set(this, 'isUploadRight', true);
            // if (this.get('isUploadRight') === true) {
            //     later(() => {
            //         set(this, 'progressRight', true);
            //     }, 1800);
            // } else {
            //     later(() => {
            //         set(this, 'progressWrong', true);
            //     }, 1800);
            // }
        },
        
        // 文件解析成功
        calcRight() {
            // console.log('right');
            set(this, 'progressRight', false);
            later(() => {
                set(this, 'hasResult', true);
            }, 1800);
        }
    },
    poll: inject(),
    init() {
        this._super(...arguments);
        let objSetPercent = SetPercent.create();
        const callbackFn = () => {
            if(get(this,'isShowProgress') === true) {
                objSetPercent.set('percent', objSetPercent.get('percent') + 1);
                this.set('optionData', objSetPercent.get('setOption'));
                // 判断出现正确 or 错误 的弹窗(目前根据百分比)
                if (objSetPercent.get('percent') === 18) {
                    this.get('poll').stopPollByLabel('gsampleCircle');
                    set(this, 'progressRight', true);
                    objSetPercent.set('percent', 100);
                } else if (objSetPercent.get('percent') === 100) {
                    this.get('poll').stopPollByLabel('gsampleCircle');
                }
            }

        };
        this.get('poll').addPoll({
            interval: 1 * 300,
            callback: callbackFn,
            label: 'gsampleCircle'
        });
        this.set('optionData', {
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
