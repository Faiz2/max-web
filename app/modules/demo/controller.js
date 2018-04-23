import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
    progress: inject('circle-progress'),
    actions: {
        go: function() {
            let num = 10;
            const progress = this.get('progress');
            progress.setPercent(num);
            this.set('option', progress.getOption());
        }
    }
});
