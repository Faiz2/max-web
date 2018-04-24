import Component from '@ember/component';
// const { set, get } = Ember;
import { set, get } from '@ember/object';

export default Component.extend({
    isDisabled: true,
    filenameone: "",
    filenametwo: "",
    actions: {
        // 第一个上传文件按钮
        UploadFilesone(file) {
            // console.log('first btn has clicked');
            set(this, 'filenameone', get(file, 'name'));
            set(this, 'isDisabled', false)
            // return file.upload('/photos/new').then(({ body: { filename, url, type } }) => {
                // debugger
                // this.get('imageArray').pushObject({
                //     filename,
                //     preview: url,
                //     type,
                //     file: null
                // });
                // set(this, 'imageArray', this.get('imageArray'));
            // }, () => { });
        },

        // 第二个上传文件按钮
        UploadFilestwo(file) {
            // console.log('second btn has clicked');
            set(this, 'filenametwo', get(file, 'name'));
            set(this, 'isDisabled', false);
            // return file.upload('/photos/new').then(({ body: { filename, url, type } }) => {
                // debugger
                // this.get('imageArray').pushObject({
                //     filename,
                //     preview: url,
                //     type,
                //     file: null
                // });
                // set(this, 'imageArray', this.get('imageArray'));
            // }, () => { });
        },

    }
});
