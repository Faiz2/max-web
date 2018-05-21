import EmberObject from '@ember/object';

export default EmberObject.extend({
    getOption(data) {
        // let areaData = data.areaData;
        // let lastYear = data.lastYear;
        // let currentYear = data.currentYear;
        let areaData = data.current.map((ele, index, array) => {
            return ele.area;
        });

        let lastYear = data.lastyear.map((ele, index, array) => {
            return ele.marketSales;
        });

        let currentYear = data.current.map((ele, index, array) => {
            return ele.marketSales
        });
        return {
            baseOption: {
                yAxis: [
                    {
                        type: 'category',
                        inverse: true,
                        data: areaData,//areaData,
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        data: areaData,//areaData
                    },
                    {
                        gridIndex: 2,
                        type: 'category',
                        data: areaData//areaData,
                    }
                ]
            },
            options: [
                {
                    series: [
                        {
                            name: '去年同期',
                            type: 'bar',
                            data: lastYear//lastData,
                        },
                        {
                            name: '本期',
                            type: 'bar',
                            data: currentYear//curData,
                        }
                    ]
                }
            ]
        }
    }
});
