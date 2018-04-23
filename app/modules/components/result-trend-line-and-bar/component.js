import Component from '@ember/component';

export default Component.extend({
    init() {
        this._super(...arguments);
        let itemStyleColor = ['#3AD1C2', '#60C6CF', '#FFFFFF', '#009992'];
        this.set('option', {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    align: 'left'
                },
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: [
                {
                    name: '日期',
                    nameGap: 40,
                    type: 'category',
                    data: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'],
                    splitLine: {
                        show:false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '市场销量(百万)',
                    // max: 10000,
                    position: "left"
                },
                {
                    type: 'value',
                    name: '份额变化趋势',
                    show: true,
                    position: 'right',
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    splitLine: {
                        show:false
                    }
                }
            ],
            series: [
                {
                    name:'市场销量',
                    type:'bar',
                    barWidth: '80%',
                    yAxisIndex: 0,
                    data: [209, 236, 325, 439, 507, 576, 722, 879, 938, 1364, 1806, 1851],
                    label: {
                        normal: {
                            show: false,
                            color: "#FFFFFF",
                            position: 'minddle'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: itemStyleColor[0]
                        }
                    }
                },
                {
                    name:'份额占比',
                    type:'line',
                    yAxisIndex: 1,
                    data: [1, 13, 37, 35, 15, 13, 25, 21, 6, 45, 32, 2],
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: itemStyleColor[3]
                        }
                    }
                }
            ]
        });
    }
});
