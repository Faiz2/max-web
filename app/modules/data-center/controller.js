import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import styles from './styles';
import { inject } from '@ember/service';


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
    filterQueryParameters: {
        page: 'page',
        pageSize: 'pageSize'
    },
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
    queryData(parameters) {
        this.set('model', this.store.queryMultipleObject('data-center', parameters))
    },
    queryMarkets() {
        let condition = {
            condition: {
                user_id: this.get('cookies').read('uid')
            }
        }
        this.get('ajax').request('/api/search/market/all', this.getAjaxOpt(condition)).then(({result, error, status}, reject) => {
            if (status === 'ok') {
                this.set('markets', result.markets)
            } else {
                this.set('error', true);
                this.set('errorMessage', error.message);
            }
        })

    },
    init() {
        this._super(...arguments);
        this.set('columns', [
            { propertyName: 'id','className': 'text-center', title: '序号', useSorting: false },
            { propertyName: 'date','className': 'text-center', useSorting: false },
            { propertyName: 'province','className': 'text-center', useSorting: false },
            { propertyName: 'market','className': 'text-center', useSorting: false },
            { propertyName: 'product','className': 'text-center', useSorting: false },
            { propertyName: 'sales','className': 'text-center', useSorting: false },
            { propertyName: 'units','className': 'text-center', useSorting: false }
        ]);
        this.queryMarkets()
        // this.queryData({})
    },

    actions: {
        doQueryData(currentPage, pn) {
            // console.info(this.get('startDate'))
            // console.info(this.get('endDate'))
            pn.gotoCustomPage(currentPage)
            let market = $('select[name="markets"] :selected').val() || "All"
            this.queryData({})
        },
        addData() {
            let pushJobIdCondition = {
                condition: {
                    user_id: this.get('cookies').read('uid')
                }
            }
            this.get('ajax').request('/api/job/push', this.getAjaxOpt(pushJobIdCondition))
                .then(({result, error, status}, reject) => {
                    if (status === 'error') {
                        this.set('error', true);
                        this.set('errorMessage', error.message);
                    } else {
                        this.get('cookies').write('job_id', result.job.job_id);
                    }
                })
        },
        outputDate() {
            this.set('output',true)
        },
        changeStartMonth(date) {
            let end_date = this.get('endDate');
            this.set('startDate', date);
            if(date.getFullYear() > end_date.getFullYear()) {
                this.set('endDate',date)
            } else if (date.getFullYear() === end_date.getFullYear()) {
                if (date.getMonth() > end_date.getMonth()) {
                    this.set('endDate',date)
                }
            }
        },
        changeEndMonth(date) {
            let start_date = this.get('startDate');
            this.set('endDate', date);
            if (date.getFullYear() === start_date.getFullYear()) {
                if(date.getMonth() < start_date.getMonth()){
                    this.set('startDate',date)
                }
            } else if (date.getFullYear()<start_date.getFullYear()) {
                this.set('startDate',date)
            }
        },
        changeOutputStartMonth(date) {
            let end_date = this.get('outputEndData');
            this.set('outputStartData', date);
            if(date.getFullYear() > end_date.getFullYear()) {
                this.set('outputEndData',date)
            } else if (date.getFullYear() === end_date.getFullYear()) {
                if (date.getMonth() > end_date.getMonth()) {
                    this.set('outputEndData',date)
                }
            }
        },
        changeOutputEndMonth(date) {
            let start_date = this.get('outputStartData');
            this.set('outputEndData', date);
            if (date.getFullYear() === start_date.getFullYear()) {
                if(date.getMonth() < start_date.getMonth()){
                    this.set('outputStartData',date)
                }
            } else if (date.getFullYear()<start_date.getFullYear()) {
                this.set('outputStartData',date)
            }
        },
    }
});
