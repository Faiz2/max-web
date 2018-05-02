import Component from '@ember/component';
import {get,set} from '@ember/object';
import {later} from '@ember/runloop';
export default Component.extend({
    isSave: false,
    saveState: false,
    months: [
        {year:'04/2018',isChecked: false},
        {year:'05/2018',isChecked: false},
        {year:'06/2018',isChecked: false},
        {year:'07/2018',isChecked: false},
        {year:'08/2018',isChecked: false},
        {year:'09/2018',isChecked: false},
        {year:'10/2018',isChecked: false},
        {year:'11/2018',isChecked: false},
        {year:'12/2018',isChecked: false}],
    actions: {
        saveData() {
            set(this, 'isSave', true)
        },
        chooseAllMonth() {
            this.get('months').forEach((item,index) => {
                set(item,'isChecked',true);
            })
        },
        confirmSave() {
            let checkedMonth = [];
            set(this, 'isSave', false);
            set(this, 'saveState', true);
            later(()=> {
                set(this, 'saveState', false);
            },1800);
            checkedMonth = this.get('months').filterBy('isChecked',true).
            map((ele,index,array) => {
                return ele.year
            })
            console.log(checkedMonth)
        },
    },
});
