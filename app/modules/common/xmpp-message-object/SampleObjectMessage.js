import EmberObje from '@ember/object';

export default EmberObje.create({
    years: null, // 存储xmpp返回的年月数据 type []
    fileParsingSuccess: false, // 文件解析成功
    fileParsingError: false,// 文件解析失败
    isShowProgress: false, // 是否显示进度条
    cantFindMonth: false,   // 未能找到月份
});
