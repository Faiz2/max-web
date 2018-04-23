import Route from '@ember/routing/route';

export default Route.extend({
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
            { propertyName: 'index', title: '序号', useSorting: false },
            { propertyName: 'data', useSorting: false },
            { propertyName: 'provice', useSorting: false },
            { propertyName: 'market', useSorting: false },
            { propertyName: 'product', useSorting: false },
            { propertyName: 'sales', useSorting: false },
            { propertyName: 'units', useSorting: false }
        ]);
    }
});
