import EmberObje from '@ember/object';

export default EmberObje.create({
    years: null, // 存储xmpp返回的年月数据 type []
    fileParsingSuccess: false, // 文件解析成功
    fileParsingError: false,// 文件解析失败
    isShowProgress: false, // 是否显示进度条

    calcYearsProgress: false, // 计算年月的进度条
    calcPanelProgress: false, // 计算Panel文件的进度条

    calcYearsProgressOption: null, // 计算年月的进度条Option
    calcPanelProgressOption: null, // 计算Panel文件的进度条Option
    cantFindMonth: false,   // 未能找到月份
});
