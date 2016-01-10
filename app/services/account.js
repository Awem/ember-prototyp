import Ember from 'ember';
import DS from 'ember-data';
const {
  Service,
  inject,
  computed,
  isEmpty
} = Ember;
const { PromiseObject } = DS;
const { service } = inject;

export default Service.extend({
  session: service(),
  store: service(),

  user: computed('session.data.authenticated.user_id', function() {
    const userId = this.get('session.data.authenticated.user_id');
    if (!isEmpty(userId)) {
      return PromiseObject.create({
        promise: this.get('store').findRecord('user', userId)
      });
    }
  }),
  reloadUser() {
    const user = this.get('user');
    user.then((user) => {
      user.reload();
    });
  }
});
