import Component from '@ember/component';
import { A } from '@ember/array';
const { set,get } = Ember;
export default Component.extend({
    // filename: [null,null],
    // index: 0,
    // actions: {
    //     clickToUploadFiles(file) {
    //         console.log(this.get('index'))
    //         if(this.get('index') === 0) {
    //             console.log('first btn')
    //         } else {
    //             console.log("other btn")
    //         }
    //         set(this,'filename',get(file,'name'))
    //
    //         return file.upload('/photos/new').then(({ body: { filename, url, type } }) => {
    //             debugger
    //             this.get('imageArray').pushObject({
    //                 filename,
    //                 preview: url,
    //                 type,
    //                 file: null
    //             });
    //             set(this, 'imageArray', this.get('imageArray'));
    //         }, () => {});
    //     }
    // }
});
