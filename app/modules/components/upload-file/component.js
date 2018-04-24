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
            return file.upload('/upload/cpa').then(({ body: { filename, url, type } }) => {
                let demo = {
                    filename,
                    data: url,
                    type
                }
                window.console.info(demo);
            }, () => { });
        },
        uploadGycxFile(file) {
            set(this, 'filegycx', get(file, 'name'));
            if (this.get('filecpa') !== '') {
                set(this, 'isDisabled', false)
            } else {
                set(this, 'isDisabled', true)
            }

            return file.upload('/upload/gycx').then(({ body: { filename, url, type } }) => {
                let demo = {
                    filename,
                    data: url,
                    type
                }
                window.console.info(demo);
            }, () => { });
        }
    }
});
