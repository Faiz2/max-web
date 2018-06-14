import Controller from '@ember/controller';
import {
	later
} from '@ember/runloop';
import {
	inject
} from '@ember/service';
import {
	computed,
	observer
} from '@ember/object';

export default Controller.extend({
	// queryParams: ['companyid'],
	// companyid: null,
	queryParams: ['coid', 'coname'],
	coid: null,
	// coname: null,
	isShow: false,
	ajax: inject(),
	cookies: inject(),
	checkCompany: observer('coid', function() {
		console.log('computed has started');
		let companyid = this.get('coid');

		console.log(companyid)

		if (companyid) {
			this.queryCleanFiles(companyid)
		} else {
			// return articles;
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

	queryCleanFiles(id) {
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": id,
					"module_tag": "clean"
				}
			}
		};
		this.get('ajax').request('/api/maintenance/module/matchfiles', this.getAjaxOpt(condition))
			.then(({
				status,
				result,
				error,
			}) => {
				console.log(result);
				this.set('match_tabels', result.match_files);
				this.set('clean_method', result.module_title);
			}, () => {})
	},

	replaceCleanFile(originkey, uuid) {
		console.log('replaceCleanFile');
		console.log(this.get('coid'))
		let condition = {
			"condition": {
				"user_id": this.get('cookies').read('uid'),
				"maintenance": {
					"company_id": this.get('coid'),
					"module_tag": "clean",
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
				this.queryCleanFiles(coid);
				// result:{"file_key":"","file_name":""}
			}, () => {})
	},
	init() {
		this._super(...arguments);
	},
	actions: {
		replaceFile(originfile, file) {
			this.set('isShow', true);
			console.log(originfile);
			console.log('replaceFile');
			// let originname = originfile.file_name;
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
					// console.log(file);
					// let fname = file.get('name');
					this.replaceCleanFile(originkey, uuid);
					// console.log(result); // file_uuid
					// this.set('filecpa', file.get('name'));
					// this.set('isDisabled', false);
					// let success = {
					// 	cpa: result,
					// 	status
					// }
					// this.get('cookies').write('filecpa', this.get('filecpa'), {path:'/'});
				} else {
					console.log('status !=== ok')
					// this.set('uploadError', true);
					// this.set('errorMessage', error.message);
				}
			}, () => {});
		}
	}

});