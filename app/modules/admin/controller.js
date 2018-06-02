import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
const { keys } = Object;

export default Controller.extend({
    cookies: inject(),
    actions: {
        logut() {
            let cookies = this.get('cookies')
            keys(this.get('cookies').read()).forEach(item => {
                window.console.info(item);
                this.get('cookies').clear(item, {path:'/'})
            });
            later(this, () => {
                window.location = "/";
            }, 1000)
        }
    }
});
