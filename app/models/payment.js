import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  provider: attr('string'),
  status: attr('string'),
  matched: attr('string'),
  paypal_key: attr('string'),
  contribution: belongsTo('contribution', {async: true}),
  matchingInfo: computed('matched', function() {
    if (this.get('matched')) {
      const matched = this.get('matched');
      let info = false;
      if (matched.includes('times-')) {
        const factor = parseFloat(matched.substring(6));
        info = `${factor}×`;
      } else if (matched.includes('invoice-')) {
        info = 'requested';
      } else if (matched === 'pending') {
        info = 'scheduled';
      }
      return info;
    }
  })
});
