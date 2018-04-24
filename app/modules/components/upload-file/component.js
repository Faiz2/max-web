import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
    isDisabled: true,
    filecpa: "",
    filegycx: "",
    actions: {
        uploadCpaFile(file) {
            set(this, 'filecpa', get(file, 'name'));
            set(this, 'isDisabled', false)
            return file.upload('/photos/new').then(({ body: { filename, url, type } }) => {
                debugger;
                this.get('imageArray').pushObject({
                    filename,
                    preview: url,
                    type
                });
            }, () => { });
        },
        uploadGycxFile(file) {
            set(this, 'filegycx', get(file, 'name'));
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
        }
    }
});
