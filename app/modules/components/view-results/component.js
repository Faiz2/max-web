import Component from '@ember/component';
import {set} from '@ember/object';

export default Component.extend({
    isSave: false,
    actions: {
        saveData() {
            set(this, 'isSave', true)
        },
        confirmSave() {
            set(this, 'isSave', false);
        },
    },
});
