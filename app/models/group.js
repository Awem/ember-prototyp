import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  name: attr('string'),
  category: attr('string'),
  description: attr('string'),
  membership_status: attr('string'),
  total_km: attr('number'),
  total_don: attr('number'),
  contributions_count: attr('number'),
  membership_with: attr('string'),
  logo_url: attr('string'),
  memberships: hasMany('membership', {async: true, inverse: 'group'}),
  affiliations: hasMany('membership', {async: true, inverse: 'affiliatedGroup'}),
  applications: hasMany('membership', {async: true, inverse: 'prospectiveGroup'})
});
