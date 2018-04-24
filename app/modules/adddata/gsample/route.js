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
