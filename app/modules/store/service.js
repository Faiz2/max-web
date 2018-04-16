import DS from 'ember-data';

import { assert } from '@ember/debug';

import normalizeModelName from "../common/normalize-model-name";

import {
  // promiseArray,
  promiseObject
} from "../common/promise-proxies";

import {
  _queryObject
} from "../common/store-finders";

/**
 * 重新扩展DS.Stroe方法
 */
export default DS.Store.extend({
    adapter:'pharbers-adapter',
    init() {
        this._super(...arguments)
        window.console.info("The Custom DS.Store Init()")
    },

    queryObject(modelName, jsonObject) {
        let normalizedModelName = normalizeModelName(modelName);
        let adapter = this.adapterFor(normalizedModelName);
        assert(`you must implement 'queryObject' in your Adapter`,
                typeof adapter.queryObject === 'function');
        return promiseObject(
            _queryObject(adapter, this, modelName, jsonObject)
                .then(internalModel => {
                    if(internalModel) {
                        return internalModel.getRecord();
                    }
                    return null;
        }));
    }

});

// const store = this;
        // const modelClass = store.modelFor(modelName);
        // const adapter = store.adapterFor(this.get('adapter'));//PharbersStore(this, modelName);
        // const serializer = store.serializerFor(modelName);
        // const url = adapter.buildURL(modelName);
        // let ajaxPromise = typeof(adapter.queryObject) === "function" ?
        //                 adapter.queryObject(modelName, query) :
        //                 adapter.ajax(url, 'POST', this.get('headOpt')(query))
        //
        // return ajaxPromise.then((data) => {
        //     const normalized = serializer.normalizeResponse(store, modelClass, data, 0, 'json');
        //     // return store.push(store.normalize(modelName, data))
        //     return store.push(normalized)
        // }, (result)=> {
        //     window.console.error(result.message);
        // });
