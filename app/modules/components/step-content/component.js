import Component from '@ember/component';
import Route from '@ember/routing/route';
const { set,get } = Ember;

export default Component.extend({
    filenameone: "",
    filenametwo: "",
    isDisabled: true,
    isShowProgress: false,
    isUploadRight: true,  // 文件解析过程中是否正确
    progressRight: false,   // 文件解析正确弹窗
    progressWrong: false,   // 文件解析错误弹窗
    hasResult: false,   // 文件解析是否有结果
    actions: {
        // 第一个上传文件按钮
        UploadFilesone(file) {
            console.log('first btn has clicked')
            set(this,'filenameone',get(file,'name'));
            set(this,'isDisabled',false)
            return file.upload('/photos/new').then(({ body: { filename, url, type } }) => {
                // debugger
                // this.get('imageArray').pushObject({
                //     filename,
                //     preview: url,
                //     type,
                //     file: null
                // });
                // set(this, 'imageArray', this.get('imageArray'));
            }, () => {});
        },

        // 第二个上传文件按钮
        UploadFilestwo(file) {
            console.log('second btn has clicked')
            set(this,'filenametwo',get(file,'name'));
            set(this,'isDisabled',false);
            return file.upload('/photos/new').then(({ body: { filename, url, type } }) => {
                // debugger
                // this.get('imageArray').pushObject({
                //     filename,
                //     preview: url,
                //     type,
                //     file: null
                // });
                // set(this, 'imageArray', this.get('imageArray'));
            }, () => {});
        },

        // step two 中的开始按钮
        startCalc() {
            set(this, 'isShowProgress', true);
            set(this, 'isUploadRight', true);
            if (this.get('isUploadRight') === true) {
                Ember.run.later(()=> {
                    set(this, 'progressRight', true);
                }, 1800);
            } else {
                Ember.run.later(()=> {
                    set(this, 'progressWrong', true);
                }, 1800);
            }
        },

        // 文件解析成功
        calcRight() {
            console.log('right');
            set(this, 'progressRight', false);
            Ember.run.later(()=> {
                // set(this, 'isStepTwo', false);
                // set(this, 'isStepThree', true);
                set(this, 'hasResult', true);
            }, 1800);
        }

    }
});
