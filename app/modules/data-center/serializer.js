import DS from 'ember-data';
import PharbersSerializer from '../common/phserializer'; // 所有的Serializer都要继承phserializer

export default PharbersSerializer.extend({
    primaryKey: 'id',
    normalizeResponse(store, model, payload, id, requestType) {
        this._super(...arguments);
        return payload.result;
    },
});
