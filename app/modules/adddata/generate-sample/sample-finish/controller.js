import Controller from '@ember/controller';
import styles from '../styles';
import { inject } from '@ember/service';

export default Controller.extend({
    ajax: inject(),
    sampleCheckError: false,
    styles,
    getAjaxOpt(data) {
        return {
            method: 'POST',
            dataType: "json",
            cache: false,
            data: JSON.stringify(data),
            contentType: "application/json,charset=utf-8",
            Accpt: "application/json,charset=utf-8",
        }
    },
    init() {
        this._super(...arguments);
        this.set('columns', [
            // { propertyName: 'index', 'className':'text-center', title: '序号', useSorting: false },
            { propertyName: 'date', 'className': 'text-center', useSorting: false },
            { propertyName: 'province', 'className': 'text-center', useSorting: false },
            { propertyName: 'market', 'className': 'text-center', useSorting: false },
            { propertyName: 'product', 'className': 'text-center', useSorting: false },
            { propertyName: 'sales', 'className': 'text-center', useSorting: false },
            { propertyName: 'units', 'className': 'text-center', useSorting: false }
        ]);

        this.get('ajax').request('/query/sample/finish', this.getAjaxOpt({})).then(response => {
            this.set('model', response.result);
        }, reject => {

        })

    }
});
