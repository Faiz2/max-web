import Component from '@ember/component';
import { set } from '@ember/object';
import { later } from '@ember/runloop';

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
                later(() => {
                    set(this, 'progressRight', true);
                }, 1800);
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
});
