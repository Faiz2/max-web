import Controller from '@ember/controller';
import styles from '../styles';

export default Controller.extend({
    styles,
    init() {
        this._super(...arguments);
        this.set('columns', [
            { propertyName: 'index', 'className':'text-center', title: '序号', useSorting: false },
            { propertyName: 'data', 'className': 'text-center', useSorting: false },
            { propertyName: 'provice', 'className': 'text-center', useSorting: false },
            { propertyName: 'market', 'className': 'text-center', useSorting: false },
            { propertyName: 'product', 'className': 'text-center', useSorting: false },
            { propertyName: 'sales', 'className': 'text-center', useSorting: false },
            { propertyName: 'units', 'className': 'text-center', useSorting: false }
        ])
    }
});
