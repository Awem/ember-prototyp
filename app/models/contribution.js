import DS from 'ember-data';
const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  title: attr('string'),
  amount: attr('number'),
  created_at: attr('date'),
  project: belongsTo('project', {async: true}),
  matcher: belongsTo('matcher', {async: true}),
  user: belongsTo('user', {async: true}),
  trip: belongsTo('trip', {async: true}),
  payment: belongsTo('payment', {async: true})
});
