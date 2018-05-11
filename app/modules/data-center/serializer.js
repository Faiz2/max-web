import DS from 'ember-data';
import PharbersSerializer from '../common/phserializer'; // 所有的Serializer都要继承phserializer

export default PharbersSerializer.extend({
    issuesCount: 320,
    pageSize: 10,
    primaryKey: 'id',
    normalizeResponse(store, model, payload, id, requestType) {
        this._super(...arguments);
        const issuesCount = this.get('issuesCount');
        const newPayLoad = payload.result;
        newPayLoad.meta = {
            itemsCount: issuesCount,
            pagesCount: Math.round(issuesCount / this.get('pageSize'))
        }
        delete newPayLoad.page
        return newPayLoad;
    },
});
