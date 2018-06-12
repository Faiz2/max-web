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
		// console.log('computed has started');
		let companyid = this.get('coid');

		if (companyid) {
			this.querySampleFile(companyid)
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
	querySampleFile(id) {
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": id
				}
			}
		}
		this.get('ajax').request('/api/maintenance/simple/allfiles', this.getAjaxOpt(condition))
			.then(({
				status,
				result,
				error
			}) => {
				if (status === 'ok') {
					console.log("sample");
					console.log(result);
					this.set('sample_sheets', result.match_tables);
					this.set('sample_universe', result.universe_files);

				}
			}, () => {})
	},
	replaceSampleFile(originkey, originname, uuid, cname) {
		console.log('replaceSampleFile');
		console.log(this.get('coid'));
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
					"file_name": cname
				}
			}
		}
		console.log('condition is');
		console.log(condition);
		this.get('ajax').request('/api/maintenance/simple/replacefile', this.getAjaxOpt(condition))
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
		// this.querySampleFile();
	},
	actions: {
		replaceFile(originfile, file) {
			this.set('isShow', true);
			console.log(originfile);
			console.log('replaceFile');
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
					console.log(file);
					let fname = file.get('name');
					this.replaceSampleFile(originkey, originname, result, fname);
					console.log(result); // file_uuid
				} else {
					console.log('status !=== ok')
					// this.set('uploadError', true);
					// this.set('errorMessage', error.message);
				}
			}, () => {});
		}
	}

});