import Controller from '@ember/controller';
import {
	inject
} from '@ember/service';
import {
	observer
} from '@ember/object';
export default Controller.extend({

	ajax: inject(),
	cookies: inject(),
	isShow: false,
	queryParams: ['coid', 'coname'],
	checkCompany: observer('coid', function() {
		let companyid = this.get('coid');
		if (companyid) {
			this.queryMaxFiles(companyid)
		}
	}),

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

	queryMaxFiles(id) {
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": id,
					"module_tag": "max"
				}
			}
		};

		this.get('ajax').request('/api/maintenance/module/matchfiles', this.getAjaxOpt(condition))
			.then(({
				status,
				result,
				error,
			}) => {
				console.log("from enlarge ");
				console.log(result);
				this.set('max_tabels', result.match_files);
				this.set('max_model', result.module_title);
				// this.set('max_universe', result.universe_files);
			}, () => {})
	},

	replaceMaxFile(originkey, uuid) {
		// console.log('replaceMaxFile');
		// console.log(this.get('coid'))
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": this.get('coid'),
					"module_tag": "max",
				},
				"origin_file": {
					"file_key": originkey,
				},
				"current_file": {
					"file_uuid": uuid,
				}
			}
		}
		// console.log('condition is');
		// console.log(condition);
		this.get('ajax').request('/api/maintenance/matchfile/replace', this.getAjaxOpt(condition))
			.then(({
				status,
				result,
				error,
			}) => {
				console.log(result);
				let coid = this.get('coid');
				this.queryMaxFiles(coid);
				// result:{"file_key":"","file_name":""}
			}, () => {})
	},

	init() {
		this._super(...arguments);
	},

	actions: {

		replaceFile(originfile, file) {
			this.set('isShow', true);
			let originkey = originfile.file_key;

			return file.upload('/api/file/upload').then(({
				body: {
					result,
					error,
					status
				}
			}) => {
				if (status === 'ok') {
					this.set('isShow', false);
					let uuid = result;
					this.replaceMaxFile(originkey, uuid);
				} else {
					console.log('status !=== ok')
				}
			}, () => {});
		}
	}
});