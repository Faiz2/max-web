import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        // let result = this.store.queryObject('data-center', {})
        // window.console.info(result);
        return this.store.query('data-center', {})

    }
});
