import Controller from '@ember/controller';
import {
	inject
} from '@ember/service';

export default Controller.extend({

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
	queryEnlargeFiles() {
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": "5b023787810c6e0268fe6ff6"
				}
			}
		}
		this.get('ajax').request('/api/maintenance/max/allfiles', this.getAjaxOpt(condition))
			.then(({
				status,
				result,
				error,
			}) => {
				console.log("from enlarge ")
				console.log(result);
				this.set('max_tabels', result.match_tables);
				this.set('max_universe', result.universe_files);
			}, () => {})
	},
	init() {
		this._super(...arguments);
		this.queryEnlargeFiles();
	}
});