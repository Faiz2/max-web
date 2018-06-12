import Controller from '@ember/controller';
import {
	later
} from '@ember/runloop';
import {
	inject
} from '@ember/service';

export default Controller.extend({
	isShow: false,
	ajax: inject(),
	cookies: inject(),
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
	queryCleanFiles() {
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": "5b023787810c6e0268fe6ff6"
				}
			}
		}
		this.get('ajax').request('/api/maintenance/dataclean/allfiles', this.getAjaxOpt(condition))
			.then(({
				status,
				result,
				error,
			}) => {
				console.log("match tables and universe_files is ok");
				console.log(result);
				this.set('match_tabels', result.match_tables);
				this.set('universe_files', result.universe_files);
			}, () => {})
	},
	init() {
		this._super(...arguments);
		this.queryCleanFiles();
	},
	actions: {
		switch () {
			this.set('isShow', true);
			later(this, () => {
				this.set('isShow', false);
			}, 3000)
		},
	}

});