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
            { propertyName: 'id','className': 'text-center', title: '序号', useSorting: false },
            { propertyName: 'date','className': 'text-center', useSorting: false },
            { propertyName: 'province','className': 'text-center', useSorting: false },
            { propertyName: 'market','className': 'text-center', useSorting: false },
            { propertyName: 'product','className': 'text-left', useSorting: false },
            { propertyName: 'sales','className': 'text-center', useSorting: false },
            { propertyName: 'units','className': 'text-center', useSorting: false }
        ]);
        // this.set('model',[{
        //     'index': "1",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "2",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "测试字数会不会撑开表格",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "3",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "一二三四五六七八九十十一十二十三十四十五",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "4",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "5",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "6",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "7",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "8",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "9",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "10",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "11",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "12",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //   {
        //     'index': "13",
        //     'data': "201804",
        //     'provice': "shandong",
        //     'market': "num01",
        //     'product': "pro01",
        //     'sales': "man01",
        //     'units': 'aa'
        //   },
        //
        // ] )
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
