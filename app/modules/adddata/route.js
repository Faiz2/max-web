import Route from '@ember/routing/route';

export default Route.extend({
    setupController(controller) {
        this._super(...arguments);
        controller.set('title','添加数据');
        controller.set('stepOne',true);
        controller.set('stepTwo',false);
        controller.set('stepThree',false);
        controller.set('stepFour',false);
  }
});
