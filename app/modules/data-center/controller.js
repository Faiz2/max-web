import Controller from '@ember/controller';
import styles from './styles';

export default Controller.extend({
    styles,
    title: 'Pharbers 数据平台',
    output: false,
    startDate: new Date('2018-01'),
    endDate: new Date(),
    outputStartData: new Date('2018-01'),
    outputEndData: new Date(),
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
            this.set('output',true)
        },
        changeStartMonth(date) {
            let end_date = this.get('endDate');
            this.set('startDate', date);
            if(date.getFullYear() > end_date.getFullYear()) {
                this.set('endDate',date)
            } else if (date.getFullYear() === end_date.getFullYear()) {
                if (date.getMonth() > end_date.getMonth()) {
                    this.set('endDate',date)
                }
            }
        },
        changeEndMonth(date) {
            let start_date = this.get('startDate');
            this.set('endDate', date);
            if (date.getFullYear() === start_date.getFullYear()) {
                if(date.getMonth() < start_date.getMonth()){
                    this.set('startDate',date)
                }
            } else if (date.getFullYear()<start_date.getFullYear()) {
                this.set('startDate',date)
            }
        },
        changeOutputStartMonth(date) {
            let end_date = this.get('outputEndData');
            this.set('outputStartData', date);
            if(date.getFullYear() > end_date.getFullYear()) {
                this.set('outputEndData',date)
            } else if (date.getFullYear() === end_date.getFullYear()) {
                if (date.getMonth() > end_date.getMonth()) {
                    this.set('outputEndData',date)
                }
            }
        },
        changeOutputEndMonth(date) {
            let start_date = this.get('outputStartData');
            this.set('outputEndData', date);
            if (date.getFullYear() === start_date.getFullYear()) {
                if(date.getMonth() < start_date.getMonth()){
                    this.set('outputStartData',date)
                }
            } else if (date.getFullYear()<start_date.getFullYear()) {
                this.set('outputStartData',date)
            }
        },
    }
});
