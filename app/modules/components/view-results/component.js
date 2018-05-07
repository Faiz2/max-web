import Component from '@ember/component';
import { set } from '@ember/object';
import {later} from '@ember/runloop';

export default Component.extend({
    isSave: false,
    saveState: false,
    allMonths: false,
    chooseTrueNums: 0,
    selectedArea: 1,
    months: [
        {year:'04/2018',isChecked: false},
        {year:'05/2018',isChecked: false},
        {year:'06/2018',isChecked: false},
        {year:'07/2018',isChecked: false},
        {year:'08/2018',isChecked: false},
        ],
    actions: {
        saveData() {
            set(this, 'isSave', true)
        },
        chooseAllMonth() {
            let allMOnthsBool = this.get('allMonths');
            if(allMOnthsBool) {
                this.set('chooseTrueNums', (this.get('months').length))
                this.get('months').forEach((item) => {
                    set(item,'isChecked',false);
                });
            } else {
                this.set('chooseTrueNums', 0)
                this.get('months').forEach((item) => {
                    set(item,'isChecked',true);
                });
            }
            this.toggleProperty('allMonths');
        },
        // 检查选择项与全选项
        checkChoose(item) {
            let trueNums = this.get('chooseTrueNums');
            if(!item.isChecked) {
                set(item,'isChecked',true);
                trueNums++;
                this.set('chooseTrueNums',trueNums)
                if(trueNums === (this.get('months').length)) {
                    this.set('allMonths',true);
                }
            } else {
                set(item,'isChecked',false);
                trueNums--;
                this.set('chooseTrueNums',trueNums);
                if(trueNums < (this.get('months').length)) {
                    this.set('allMonths',false);
                }
            }
        },
        confirmSave() {
            let checkedMonth = [];
            set(this, 'isSave', false);
            set(this, 'saveState', true);
            later(()=> {
                set(this, 'saveState', false);
            },1800);
            checkedMonth = this.get('months').filterBy('isChecked',true).
            map((ele) => {
                return ele.year
            })
            console.log(checkedMonth)
        },
    },
});
