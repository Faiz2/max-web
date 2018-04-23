
/**
 * 本方法将数据序列化成Ember Data想要的标准格式 也就是JSONAPI
 */

export function query(serializer, modelClass, payload) {
    return serializer.normalize(modelClass, payload);
}
