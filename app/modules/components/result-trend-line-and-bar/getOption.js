import EmberObject from '@ember/object';

export default EmberObject.extend({
    getOption(data) {
        let date = data.date;
        let marketSales = data.marketSales;
        let percent = data.percent;
        return {
            xAxis: [
                    {
                        name: '日期',
                        data: date,
                    }
                ],

                series: [
                    {
                        name:'市场销量',
                        type:'bar',
                        barWidth: '80%',
                        yAxisIndex: 0,
                        data: marketSales,
                    },
                    {
                        name:'份额占比',
                        type:'line',
                        yAxisIndex: 1,
                        data: percent,
                    }
                ]
        }
    }
});
