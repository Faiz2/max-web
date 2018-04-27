import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
    remindUploadFile: false,    // 用于检测提醒用户上传文件的状态
    isDisabled: true,   // 下一步按钮点击状态。
    filecpa: "",
    filegycx: "",
    actions: {
        // 提示用户上传文件的弹窗
        pleaseUploadFile() {
            this.set('remindUploadFile', true);
        },
        // 上传cpa文件
        uploadCpaFile(file) {
            set(this, 'filecpa', get(file, 'name'));
            set(this, 'isDisabled', false);
            return file.upload('/upload/cpa').then(({ body: { filename, url, type } }) => {
                let demo = {
                    filename,
                    data: url,
                    type
                }
                window.console.info(demo);
            }, () => { });
        },
        //  删除cpa文件 （伪）只是将名字置为“”空。
        deleteCpaFile() {
            set(this, 'filecpa', "");
            set(this, 'isDisabled', true);
        },
        //  上传gycx文件
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
        },
        //  删除gycx 文件 （伪）只是将名字置为“”空。
        deleteGycxFile() {
            set(this, 'filegycx', "");
            if (this.get('filecpa') !== '') {
                set(this, 'isDisabled', false)
            } else {
                set(this, 'isDisabled', true)
            }
        }
    }
});
