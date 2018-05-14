import EmberObject from '@ember/object';

export default EmberObject.extend({
    getOption(data) {
        return {
            series: [{
                name: '中国',
                type: 'map',
                zoom: 1.2,
                mapType: 'china',
                roam: false,
                label: {normal: {show: false}},
                data: data
            }]
        }
    }
});
