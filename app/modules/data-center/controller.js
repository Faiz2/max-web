import Controller from '@ember/controller';
import styles from './styles';

export default Controller.extend({
    styles,
    title: 'Pharbers 数据平台',
    output: false,
    startDate: null,
    endDate: null,
    init() {
        this._super(...arguments);
        this.set('columns', [
            { propertyName: 'index','className': 'text-center', title: '序号', useSorting: false },
            { propertyName: 'data','className': 'text-center', useSorting: false },
            { propertyName: 'provice','className': 'text-center', useSorting: false },
            { propertyName: 'market','className': 'text-center', useSorting: false },
            { propertyName: 'product','className': 'text-left', useSorting: false },
            { propertyName: 'sales','className': 'text-center', useSorting: false },
            { propertyName: 'units','className': 'text-center', useSorting: false }
        ]);
    },

    actions: {
        outputDate() {
            console.log('aaa')
            this.set('output',true)
        },
        changeStartMonth(date) {
            this.set('startDate', date.toLocaleDateString());
        },
        changeEndMonth(date) {
            let start_date = this.get('startDate')
            this.set('endDate', date.toLocaleDateString());
            if (start_date!== null && date.getFullYear()>=start_date.slice(0,4) ) {
                if(date.getMonth()<start_date.slice(5,6)){
                    alert('所选日期小于开始日期')
                }
            } else if(start_date!== null && date.getFullYear()<start_date.slice(0,4)){
                alert('所选日期小于开始日期')
            } else {
            }
        }
    }
});
