import EmberObject from '@ember/object';

export default EmberObject.extend({
    getOption(data) {
        // let date = data.date;
        // let marketSales = data.marketSales;
        // let percent = data.percent;
        let date = data.map((ele, index, array) => {
            return ele.date
        });
        let marketSales = data.map((ele, index, array) => {
            return ele.marketSales
        });
        let percent = data.map((ele, index, array) => {
            return ele.percentage
        });
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
