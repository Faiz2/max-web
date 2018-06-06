import Controller from '@ember/controller';
import { later } from '@ember/runloop';
export default Controller.extend({
    isShow: false,
    actions: {
        switch() {
            this.set('isShow', true);
            later(this, () => {
                this.set('isShow', false);
            }, 3000)
        },
    }
});
