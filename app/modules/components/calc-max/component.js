import Component from '@ember/component';
import { set } from '@ember/object';
import { later } from '@ember/runloop';
// const { set,get } = Ember;

export default Component.extend({
    isShowCalcProgress: false, // scalc-max中开始按钮控制的进度显示
    calcHasDone: false,    // MAX计算是否完成
    actions: {
        // calc-max 中的开始计算按钮
        startCalcMAX() {
            set(this, 'isShowCalcProgress', true);
            // Ember.run.later(() => {
            //     set(this, 'calcHasDone', true);
            // }, 1800);
            later(() => {
                set(this, 'calcHasDone', true);
            }, 1800);
        },
    }
});
