import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  /**
   * 404
   * @type {String}
   */
  this.route('page-not-found', {path: '/*path'});
  this.route('adddata', function() {
    this.route('first-step');
    this.route('second-step');
    this.route('third-step');
    this.route('fourth-step');
  });
});

export default Router;
