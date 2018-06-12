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
	queryParams: ['coid', 'coname'],
	checkCompany: observer('coid', function() {
		// console.log('computed has started');
		let companyid = this.get('coid');

		if (companyid) {
			this.queryOutputFiles(companyid)
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
	queryOutputFiles(id) {
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": id
				}
			}
		}
		this.get('ajax').request('/api/maintenance/delivery/allfiles', this.getAjaxOpt(condition))
			.then(({
				status,
				result,
				error,
			}) => {
				console.log("output files ");
				console.log(result);
				this.set('output_tabels', result.match_tables);
				this.set('output_universe', result.universe_files);
			}, () => {})
	},
	replaceDeliveryFile(originkey, originname, uuid, fname) {
		// console.log('replaceMaxFile');
		// console.log(this.get('coid'))
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": this.get('coid')
				},
				"origin_file": {
					"file_key": originkey,
					"file_name": originname
				},
				"current_file": {
					"file_uuid": uuid,
					"file_key": originkey,
					"file_name": fname
				}
			}
		}
		// console.log('condition is');
		// console.log(condition);
		this.get('ajax').request('/api/maintenance/delivery/replacefile', this.getAjaxOpt(condition))
			.then(({
				status,
				result,
				error,
			}) => {
				console.log(result);
				// result:{"file_key":"","file_name":""}
			}, () => {})
	},
	init() {
		this._super(...arguments);
	},
	actions: {
		switch () {
			this.set('isShow', true);
			later(this, () => {
				this.set('isShow', false);
			}, 3000)
		},
		replaceFile(originfile, file) {
			this.set('isShow', true);
			let originname = originfile.file_name;
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
					let fname = file.get('name');
					this.replaceDeliveryFile(originkey, originname, result, fname);
				} else {
					console.log('status !=== ok')
				}
			}, () => {});
		}
	}
});