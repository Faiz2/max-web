import Component from '@ember/component';
import {get, set} from '@ember/object';
export default Component.extend({
    isCenter: true,
    // isCenter: Ember.computed('center', function() {
    //     return this.get('center')?'center':null;
    // }),
});
