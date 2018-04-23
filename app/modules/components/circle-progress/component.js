import Component from '@ember/component';
import SetPercent from './setPercent';
import{ inject } from '@ember/service';
// import { computed } from '@ember/object';

export default Component.extend({
    poll: inject(),
    init() {
        this._super(...arguments);
        let objSetPercent = SetPercent.create();
        const callbackFn = () => {
            objSetPercent.set('percent', objSetPercent.get('percent') + 1)
            this.set('option', objSetPercent.get('setOption'))
            if (objSetPercent.get('percent') === 20) {
                this.get('poll').stopPollByLabel('test');
            }
        }
        this.get('poll').addPoll({
            interval: 1 * 1000,
            callback: callbackFn,
            label: 'test'
        })
        this.set('option', {
                title: {
                    text: '0%',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        color: '#0BBC96',
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
                                    color: '#DEDEDE',
                                    shadowBlur: 10,
                                    shadowColor: '#DEDEDE',
                                }
                            }
                        }],
                        animation: false
                    },{
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
                                    color: '#DEDEDE',
                                    shadowBlur: 10,
                                    shadowColor: '#DEDEDE'
                                }
                            }
                        }],
                        animation: false
                    },{
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
                                    color: '#0BBC96',
                                    shadowBlur: 10,
                                    shadowColor: '#0BBC96'
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
                    }
                ]
        });
    }
});
