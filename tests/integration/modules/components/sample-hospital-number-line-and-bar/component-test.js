import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sample-hospital-number-line-and-bar', 'Integration | Component | sample hospital number line and bar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sample-hospital-number-line-and-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sample-hospital-number-line-and-bar}}
      template block text
    {{/sample-hospital-number-line-and-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
