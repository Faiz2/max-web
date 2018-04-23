import Component from '@ember/component';
import SampleBaseOptionComponent from '../../common/echarts/sample-modules-base';

import { later } from '@ember/runloop';

export default SampleBaseOptionComponent.extend({
    init() {
        this._super(...arguments);
        this.set('chartsName', '样本医院数量');
        this.set('option', this.get('baseOption'));
        later(this, function() { // TODO：想想我为什么这么写
            this.set("option", {
                 series: [
                    {
                        name: this.get('chartsName'),
                        type: 'bar',
                        data : [0, 0, 0, 0, 0, 0, 1080, 0, 0, 0, 0, 0],
                    },
                    {
                        name: '去年同期',
                        type: 'line',
                        data : [1026, 602, 962, 632, 1002, 1008, 123, 520, 142, 112, 335, 509]
                    }
                ]
            });
        }, 500);
    }
});
