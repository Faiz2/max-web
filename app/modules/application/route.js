import Route from '@ember/routing/route';
import { inject } from '@ember/service';
export default Route.extend({
    webIm: inject('web-im'),
    init() {
        this._super(...arguments);
        // TODO 王森 这段话放到login成功后
        this.get('webIm').login('test','123456')
    }
});
