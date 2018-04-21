import EmberObject, { computed } from '@ember/object';
// import {get, set} from '@ember/object';

export default EmberObject.extend({
    percent: 0,
    getData: computed('percent', function(){
        return [{
            value: this.get('percent'),
            itemStyle: {
                normal: {
                    color: '#0BBC96',
                    shadowBlur: 10,
                    shadowColor: '#0BBC96'
                }
            }
        }, {
            value: 100 - this.get('percent'),
            itemStyle: {
                normal: {
                    color: 'transparent'
                }
            }
        }];
    }),
    setOption: computed('getData', function() {
        const text = this.get('percent') + '%'
        return {
            title: {
                text: text,
            },
            series: [{
                    name: 'main',
                    type: 'pie',
                    radius: ['37%', '40%'],
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: this.get('getData'),
                    hoverAnimation: false,
                    animationEasingUpdate: 'cubicInOut',
                    animationDurationUpdate: 500
                }
            ]
        }
    })
});
