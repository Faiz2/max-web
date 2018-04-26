import EmberObject from '@ember/object';

export default EmberObject.extend({
    getOption(data) {
        window.console.info(data.areaData)
        return {
            series: [{
                name: '中国',
                type: 'map',
                zoom: 1.5,
                mapType: 'china',
                roam: false,
                label: {normal: {show: true}},
                data: data.areaData
            }]
        }
    }
});
