import Controller from '@ember/controller';
import { inject } from '@ember/service';
import rsvp from 'rsvp';
import SampleGetOption from '../components/sample-line-and-bar/getOption';
import ResuleGetOption from '../components/result-trend-line-and-bar/getOption';
import MirrorGetOption from '../components/result-mirror-bar/getOption';
import MapGetOption from '../components/result-map/getOption';

export default Controller.extend({
    ajax: inject(),
    progress: inject('circle-progress'),
    getAjaxOpt(data) {
        return {
            method: 'POST',
            dataType: "json",
            cache: false,
            data: JSON.stringify(data),
            contentType: "application/json,charset=utf-8",
            Accept: "application/json,charset=utf-8",
        }
    },
    init() {
        this._super(...arguments);

        const ajax = this.get('ajax');
        let condition = {name: "qp"};
        let sampleOption = SampleGetOption.create();
        let resultOption = ResuleGetOption.create();
        let mirrorOption = MirrorGetOption.create();
        let mapOption = MapGetOption.create();

        new rsvp.Promise((resolve, reject) => {
            return ajax.request('/query/sample/hospital-numbers',
                                    this.getAjaxOpt(condition)).then((data) => {
                this.set('hospitalOption', sampleOption.getOption(data))
                return resolve({resule: data});
            },
            () => {return reject("Access Error");}
        );
        });

        new rsvp.Promise((resolve, reject) => {
            return ajax.request('/query/sample/product-numbers',
                                    this.getAjaxOpt(condition)).then((data) => {
                this.set('productOption', sampleOption.getOption(data))
                return resolve({resule: data});
            },() => {return reject("Access Error");});
        });


        new rsvp.Promise((resolve, reject) => {
            return ajax.request('/query/sample/sales-numbers',
                                    this.getAjaxOpt(condition)).then((data) => {
                this.set('salesOption', sampleOption.getOption(data))
                return resolve({resule: data});
            },() => {return reject("Access Error");});
        });

        new rsvp.Promise((resolve, reject) => {
            return ajax.request('/query/result/trend',
                                    this.getAjaxOpt(condition)).then((data) => {
                this.set('trendOption', resultOption.getOption(data))
                return resolve({resule: data});
            },() => {return reject("Access Error");});
        });

        new rsvp.Promise((resolve, reject) => {
            return ajax.request('/query/result/mirror',
                                    this.getAjaxOpt(condition)).then((data) => {
                this.set('mirrorOption', mirrorOption.getOption(data))
                return resolve({resule: data});
            },() => {return reject("Access Error");});
        });

        new rsvp.Promise((resolve, reject) => {
            return ajax.request('/query/result/map',
                                    this.getAjaxOpt(condition)).then((data) => {
                this.set('mapOption', mapOption.getOption(data))
                return resolve({resule: data});
            },() => {return reject("Access Error");});
        });

    },
    actions: {
        go: function() {
            let num = 10;
            const progress = this.get('progress');
            progress.setPercent(num);
            this.set('option', progress.getOption());
        }
    }
});
