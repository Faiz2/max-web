import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://localhost:8080/',
    headOpt: function(query) {
        return {
            dataType: 'json',
            contentType: 'application/json,charset=utf-8',
            Accept: 'application/json,charset=utf-8',
            data: query
        }
    },
    defaultSerializer: '-default',
    queryObject(store, type, jsonObject) {
        return this.ajax('query/history','POST',this.get('headOpt')(jsonObject));
    },
    query(store, type, jsonObject) {
        return this.ajax(`${this.get('host')}query/history`,'POST',this.get('headOpt')(jsonObject));
    }

});
