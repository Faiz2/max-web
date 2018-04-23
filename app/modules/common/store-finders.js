// import Ember from 'ember';
// import { A } from '@ember/array';
// import { Promise } from 'rsvp';
// import { assert, warn } from '@ember/debug';
// import { copy } from '@ember/object/internals';
// import { typeOf, isPresent, isNone } from '@ember/utils';

import {
  _bind,
  _guard,
  _objectIsAlive
} from "./store-common";

import { normalizeResponseHelper } from "./serializer-response";
import { serializerForAdapter } from "./serializers";

/**
 * 只做了2件事 监测绑定store与adapter转向代理方法的封装
 * 这是个封装的工具包
 */
export function _queryObject(adapter, store, modelName, query) {

    let modelClass = store.modelFor(modelName);
    let promise = adapter.queryObject(store, modelClass, query);

    let label = `DS: Handle Adapter#queryObject of ${modelName}`;

    promise = Promise.resolve(promise, label);
    promise = _guard(promise, _bind(_objectIsAlive, store));

    return promise.then((adapterPayload) => {

        let serializer = serializerForAdapter(store, adapter, modelName);
        let payload = normalizeResponseHelper(serializer, store, modelClass, adapterPayload, null, 'queryObject');//queryRecord queryObject

        return store._push(payload);
    }, null, `DS: Extract payload of queryObject ${modelName}`)
}
