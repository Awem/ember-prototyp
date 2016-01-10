import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  user: belongsTo('user', { async: true }),
  group: belongsTo('group', { async: true, inverse: 'memberships' }),
  affiliatedGroup: belongsTo('group', { async: true, inverse: 'affiliations' }),
  prospectiveGroup: belongsTo('group', { async: true, inverse: 'applications' }),
  role: attr('string')
});
