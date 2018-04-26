import Route from '@ember/routing/route';
export default Route.extend({
    redirect(model, transition) {
        this.refresh
    },
    model() {
    return [{
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
        'product': "测试字数会不会撑开表格",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "3",
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "一二三四五六七八九十十一十二十三十四十五",
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
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "pro01",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "6",
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "pro01",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "7",
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "pro01",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "8",
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "pro01",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "9",
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "pro01",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "10",
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "pro01",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "11",
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "pro01",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "12",
        'data': "201804",
        'provice': "shandong",
        'market': "num01",
        'product': "pro01",
        'sales': "man01",
        'units': 'aa'
      },
      {
        'index': "13",
        'data': "201804",
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
    controller.set('columns', [{
        propertyName: 'index',
        'className': 'text-center',
        title: '序号',
        useSorting: false
      },
      {
        propertyName: 'data',
        'className': 'text-center',
        useSorting: false
      },
      {
        propertyName: 'provice',
        'className': 'text-center',
        useSorting: false
      },
      {
        propertyName: 'market',
        'className': 'text-center',
        useSorting: false
      },
      {
        propertyName: 'product',
        'className': 'text-left',
        useSorting: false
      },
      {
        propertyName: 'sales',
        'className': 'text-center',
        useSorting: false
      },
      {
        propertyName: 'units',
        'className': 'text-center',
        useSorting: false
      }
    ]);
    controller.set('title', 'Pharbers 数据');
    },
    actions: {
      changeMonthAction(startData) {
          console.log(startData.toString().slice(4, 7) + " " + startData.toString().slice(11, 15))
      }
    }
});
