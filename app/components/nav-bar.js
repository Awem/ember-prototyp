import Ember from 'ember';
const {
  Component,
  inject
} = Ember;
const { service } = inject;

export default Component.extend({
  //router: service('-routing'),
  session: service(),
  account: service(),
  actions: {
    login() {
      this.sendAction('login');
    },
    logout() {
      this.get('session').invalidate();
    },
    register() {
      //this.get('router').transitionTo('users.new');
      this.sendAction('register');
    }
  }
});
