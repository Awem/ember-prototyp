import Ember from 'ember';
const {
  Controller,
  inject
  } = Ember;
const { service } = inject;

export default Controller.extend({
  session: service(),
  actions: {
    authenticate() {
      const { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
        const errors = [{message: reason.error}];
        this.set('loginErrors', errors);
      });
    }
  }
});
