import EmberObject from '@ember/object';

export default EmberObject.extend({
    getOption(data) {
        let lastYear = data.lastYear;
        let currentYear = data.currentYear;
        return {
             series: [
                {
                    name: '当前计算',
                    type: 'bar',
                    data : currentYear,
                },
                {
                    name: '去年同期',
                    type: 'line',
                    data : lastYear
                }
            ]
        }
    }
});
