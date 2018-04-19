import Component from '@ember/component';

const { set,get } = Ember;

export default Component.extend({
    filenameone:null,
    filenametwo:null,
    isDisabled: true,
    isStepOne: true,
    isStepTwo: false,
    isStepThree: false,
    isStepFour: false,
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

        // 进入step two的‘下一步’按钮
        toSecond() {
            console.log('has clicked and ');
            set(this,'isStepOne',false);
            set(this,'isStepTwo',true);
            // setupController(controller) {
            //     this._super(...arguments);
            //     controller.set('stepTwo',true)
            // };
        },

        //重新上传文件按钮
        reUpload() {
            // set(this, 'showCheckReUpload', true)
            set(this,'isStepOne',true);
            set(this,'isStepTwo',false);
            set(this,'modal3',false)
        },

    }
});
