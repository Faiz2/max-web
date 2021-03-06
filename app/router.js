import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function() {
	this.route('page-not-found', {
		path: '/*path'
	});
	this.route('adddata', function() {
		this.route('uploadfiles');
		this.route('calcmax');
		this.route('viewresults');
		this.route('generate-sample', function() {
			this.route('sample-finish');
		});
	});
	this.route('data-center');
	this.route('demo');
	this.route('admin', function() {
		this.route('data-center');
		this.route('maintain-center', function() {
			this.route('cleaning');
			this.route('sample');
			this.route('enlarge');
			this.route('output');
		});
		this.route('cleaning');
	});

});

export default Router;