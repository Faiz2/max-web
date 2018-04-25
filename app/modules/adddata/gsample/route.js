import Route from '@ember/routing/route';
// import { inject } from '@ember/service';
// import rsvp from 'rsvp';
// import SampleGetOption from '../../components/sample-line-and-bar/getOption';

export default Route.extend({
    // ajax: inject(),
    // getAjaxOpt(data) {
    //     return {
    //         method: 'POST',
    //         dataType: "json",
    //         cache: false,
    //         data: JSON.stringify(data),
    //         contentType: "application/json,charset=utf-8",
    //         Accept: "application/json,charset=utf-8",
    //     }
    // },
    // init() {
    //     this._super(...arguments);
    //     const ajax = this.get('ajax');
    //     let condition = {name: "qp"};
    //     let sampleOption = SampleGetOption.create();

    //     new rsvp.Promise((resolve, reject) => {
    //         return ajax.request('/query/sample/hospital-numbers',
    //                                 this.getAjaxOpt(condition)).then((data) => {
    //             this.set('hospitalOption', sampleOption.getOption(data))
    //             return resolve({resule: data});
    //         },
    //         () => {return reject("Access Error");}
    //     );
    //     });

    //     new rsvp.Promise((resolve, reject) => {
    //         return ajax.request('/query/sample/product-numbers',
    //                                 this.getAjaxOpt(condition)).then((data) => {
    //             this.set('productOption', sampleOption.getOption(data))
    //             return resolve({resule: data});
    //         },() => {return reject("Access Error");});
    //     });


    //     new rsvp.Promise((resolve, reject) => {
    //         return ajax.request('/query/sample/sales-numbers',
    //                                 this.getAjaxOpt(condition)).then((data) => {
    //             this.set('salesOption', sampleOption.getOption(data))
    //             return resolve({resule: data});
    //         },() => {return reject("Access Error");});
    //     });


    // },
    model() {
        return [
            {
                'index': "1",
                'data': "201804",
                'provice': "shandong",
                'market': "num01",
                'product': "pro01",
                'sales': "man01",
                'units': 'aa'
            },
            {
                'index': "2",
                'data': "201804",
                'provice': "shandong",
                'market': "num01",
                'product': "pro01",
                'sales': "man01",
                'units': 'aa'
            },
            {
                'index': "3",
                'data': "201804",
                'provice': "shandong",
                'market': "num01",
                'product': "pro01",
                'sales': "man01",
                'units': 'aa'
            },
            {
                'index': "4",
                'data': "201804",
                'provice': "shandong",
                'market': "num01",
                'product': "pro01",
                'sales': "man01",
                'units': 'aa'
            },
            {
                'index': "5",
                'data': 20180501,
                'provice': "shandong",
                'market': "num01",
                'product': "pro01",
                'sales': "man01",
                'units': 'aa'
            },
        ]
    },
    setupController(controller) {
        this._super(...arguments);
        controller.set('columns', [
            { propertyName: 'index', 'className':'text-center', title: '序号', useSorting: false },
            { propertyName: 'data', 'className': 'text-center', useSorting: false },
            { propertyName: 'provice', 'className': 'text-center', useSorting: false },
            { propertyName: 'market', 'className': 'text-center', useSorting: false },
            { propertyName: 'product', 'className': 'text-center', useSorting: false },
            { propertyName: 'sales', 'className': 'text-center', useSorting: false },
            { propertyName: 'units', 'className': 'text-center', useSorting: false }
        ]);
    }
});
