import Component from '@ember/component';
import {set} from '@ember/object';
import {later} from '@ember/runloop';
export default Component.extend({
    isSave: false,
    allMonth: false,
    saveState: false,
    actions: {
        saveData() {
            set(this, 'isSave', true)
        },
        chooseAllMonth() {
            set(this, 'allMonth',true);
        },
        confirmSave() {
            set(this, 'isSave', false);
            set(this, 'saveState', true);
            later(()=> {
                set(this, 'saveState', false);
            },1800)
        },
    },
});
