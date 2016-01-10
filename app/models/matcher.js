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
    total_budget: attr('number'),
    remaining_budget: attr('number'),
    matched_projects_count: attr('number'),
    supported_contributions_count: attr('number'),
    supported_projects_count: attr('number'),
    matched_projects: hasMany('project', { async: true, inverse: 'matching_partners'}),
    supported_projects: hasMany('project', { async: true, inverse: 'supporting_partners'}),
    matching_factors: attr(),
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
