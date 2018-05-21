import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import styles from './styles';
import { inject } from '@ember/service';
import rsvp from 'rsvp';

export default Controller.extend({
    ajax: inject(),
    // router: inject(),
    cookies: inject(),
    styles,
    title: 'Pharbers 数据平台',
    output: false,
    startDate: new Date('2018-01'),
    endDate: new Date(),
    outputStartData: new Date('2018-01'),
    outputEndData: new Date(),
    currentPage: 1,
    // filterQueryParameters: {
    //     page: 'page',
    //     pageSize: 'pageSize'
    // },
    formatDateyyyymm(date) {
        return date.getFullYear() + "" + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
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
        const promise = new rsvp.Promise((resolve, reject) => {
            this.set('loading', true);
            resolve(this.store.queryMultipleObject('data-center', parameters))
        })
        promise.then((resolve) => {
            this.set('loading', false);
            if ( resolve.isLoaded ) {
                this.set('model', resolve)
            } else {
                this.set('model', null)
            }
        })
        // this.set('model', this.store.queryMultipleObject('data-center', parameters))
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
                this.set('currentPage', 1)
                let startTime = this.formatDateyyyymm(this.get('startDate'))
                let endTime = this.formatDateyyyymm(this.get('endDate'))

                this.queryData({
                    condition: {
                        user_id: this.get('cookies').read('uid'),
                        market: 'All',
        				startTime: startTime,
        				endTime: endTime,
        				currentPage: 1,
        				pageSize: 10,
                        mode: 'search'
                    }
                })

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
            { propertyName: 'city','className': 'text-center', useSorting: false },
            { propertyName: 'market','className': 'text-center', useSorting: false },
            { propertyName: 'product','className': 'text-center', useSorting: false },
            { propertyName: 'sales','className': 'text-center', useSorting: false },
            { propertyName: 'units','className': 'text-center', useSorting: false }
        ]);
        this.queryMarkets()

    },

    actions: {
        search() {
            let market = $('select[name="markets"] :selected').val() || "All"
            let startTime = this.formatDateyyyymm(this.get('startDate'))
            let endTime = this.formatDateyyyymm(this.get('endDate'))
            this.queryData({
                condition: {
                    user_id: this.get('cookies').read('uid'),
                    market: market,
                    startTime: startTime,
                    endTime: endTime,
                    currentPage: 1,
                    pageSize: 10,
                    mode: 'search'
                }
            })
        },
        doPageSearch(currentPage, pn) {
            this.set('currentPage', currentPage)
            this.set('modalTablePageObj', pn);
            typeof this.get('modalTablePageObj') === 'undefined'
                ? '' : this.get('modalTablePageObj').gotoCustomPage(currentPage)

            let market = $('select[name="markets"] :selected').val() || "All"
            let startTime = this.formatDateyyyymm(this.get('startDate'))
            let endTime = this.formatDateyyyymm(this.get('endDate'))
            this.queryData({
                condition: {
                    user_id: this.get('cookies').read('uid'),
                    market: market,
                    startTime: startTime,
                    endTime: endTime,
                    currentPage: currentPage,
                    pageSize: 10,
                    mode: 'page'
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
            $('input[name="endDate"]').focus(); // 畸形code
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
        }
    }
});
