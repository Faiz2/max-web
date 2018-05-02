import EmberObject from '@ember/object';

export default EmberObject.create({
    isShowCalcProgress: false, //控制计算时进度条的显示
    calcHasDone: false, //计算完成
});
