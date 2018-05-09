import DS from 'ember-data';
import {
    query,
} from '../common/serializer-split';

export default DS.JSONSerializer.extend({
    pageSize: 10,
    primaryKey: 'id',
    normalizeResponse(store, model, payload, id, requestType) {
        // switch(requestType) {
        //     case 'queryObject':
        //         return query(this, model, payload.result);
        //     default:
        //         return this._super(...arguments);
        // }
        return payload.result
    },
    // extractId(model, hash) {
    //     window.console.info(hash)
    //     return hash.id || 0;
    // }
});
