import Controller from '@ember/controller';
import styles from './styles';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
import rsvp from 'rsvp';
const { keys } = Object;

export default Controller.extend({
    ajax: inject(),
    cookies: inject(),
    styles,
    title: 'Pharbers 数据平台',
    output: false,
    startDate: new Date('2018-01'),
    endDate: new Date(),
    outputStartData: new Date('2018-01'),
    outputEndData: new Date(),
    currentPage: 1,
    fullName: '', // 这应该后端返回firstName与lastName 有前端计算出来
    account: '',

    getAjaxOpt(data) {
        return {
            method: 'POST',
            dataType: "json",
            cache: false,
            data: JSON.stringify(data),
            contentType: "application/json,charset=utf-8",
            Accpt: "application/json,charset=utf-8",
        }
    },

    queryUserInfo() {
        let condition = {
            condition: {
                user_id: this.get('cookies').read('uid')
            }
        }
        this.get('ajax').request('/api/user/detail', this.getAjaxOpt(condition)).
            then(({status, result, error}) =>{
                if (status === 'ok') {
                    let {user: {screen_name, email}} = result
                    this.set('fullName', screen_name)
                    this.set('account', email)
                }
            }, () => {})
    },
    init() {
        this._super(...arguments);
        this.set('columns', [
            { propertyName: 'id','className': 'text-center', title: '序号', useSorting: false },
            { propertyName: 'date','className': 'text-center', title: '日期', useSorting: false },
            { propertyName: 'province','className': 'text-center', title: '省份', useSorting: false },
            { propertyName: 'city','className': 'text-center', title: '城市', useSorting: false },
            { propertyName: 'market','className': 'text-center', title: '市场', useSorting: false },
            { propertyName: 'product','className': 'text-center', title: '最小产品单位', useSorting: false },
            { propertyName: 'sales','className': 'text-center', title: '销售额', useSorting: false },
            { propertyName: 'units','className': 'text-center', title: '销售量', useSorting: false }
        ]);
        this.queryUserInfo();

    },

    actions: {
        logut() {
            let cookies = this.get('cookies')
            keys(this.get('cookies').read()).forEach(item => {
                window.console.info(item);
                this.get('cookies').clear(item, {path:'/'})
            });
            later(this, () => {
                window.location = "/";
            }, 1000)
        }
    }
});
