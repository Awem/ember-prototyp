import Ember from 'ember';
import DS from 'ember-data';
const { computed } = Ember;
const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
    name: attr('string'),
    description: attr('string'),
    matching_partners_count: attr('number'),
    donated_contributions_count: attr('number'),
    supporting_partners_count: attr('number'),
    matching_partners: hasMany('matcher', { async: true, inverse: 'matched_projects'}),
    supporting_partners: hasMany('matcher', { async: true, inverse: 'supported_projects'}),
    logo_url: attr('string'),
    logo_name: attr('string'),
    logoExternal: computed('logo_name', function() {
      if (typeof(this.get('logo_name')) !== 'undefined') {
        //const name = this.get('logo_name');
        //return name === 'gravatar';
        return false;
      }
    })
});
