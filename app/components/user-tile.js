import Ember from 'ember';
const {
  Component,
  computed,
  inject
} = Ember;
const { service } = inject;

export default Component.extend({
  session: service(),
  account: service(),
  correctUser: computed('user', function() {
    const session = this.get('session');
    if (session.isAuthenticated) {
      return this.get('user.id') === this.get('account.user.id');
    } else {
      return false;
    }
  }),
  actions: {
    clickAccept(membership) {
      this.sendAction('acceptMember', membership);
    },
    clickReject(membership) {
      this.sendAction('rejectMember', membership);
    },
    clickExpel(membership) {
      this.sendAction('expelDemanded', membership);
    }
  }
});
