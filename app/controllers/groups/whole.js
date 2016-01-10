import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['total_don:desc'],
  sortedUsers: Ember.computed.sort('model', 'sortProperties')
});
