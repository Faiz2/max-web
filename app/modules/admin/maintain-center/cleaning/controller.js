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
					"company_id": id
				}
			}
		}
		// console.log(condition)
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
	replaceCleanFile(originkey, originname, uuid, fname) {
		console.log('replaceCleanFile');
		console.log(this.get('coid'))
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
		console.log('condition is');
		console.log(condition);
		this.get('ajax').request('/api/maintenance/dataclean/replacefile', this.getAjaxOpt(condition))
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
					this.replaceCleanFile(originkey, originname, result, fname);
					console.log(result); // file_uuid
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