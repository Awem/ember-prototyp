import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  isShowingModal: false,
  formValid: true,
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  validations: {
    name: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 50
      }
    },
    email: {
      presence: true,
      length: { minimum: 5 },
      format: {
        with: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,
        allowBlank: true,
        message: 'must be a valid email'
      }
    },
    password: {
      confirmation: true,
      presence: {
        message: 'password required'
      },
      length: { minimum: 6 }
    },
    passwordConfirmation: {
      presence: {
        message: 'please confirm password'
      }
    },
    invite: {
      presence: true
    }
  },
  actions: {
    registerUser() {
      const data = this.getProperties('name','email', 'password', 'passwordConfirmation', 'invite');
      const errors = this.get('errors');
      let user;
      if (errors.name.length + errors.email.length + errors.password.length + errors.passwordConfirmation.length + errors.invite.length === 0) {
        this.set('formValid', true);
      } else {
        this.set('formValid', false);
      }
      if (data.password === data.passwordConfirmation) {
        user = this.store.createRecord('user', data);
        user.save().then(
          (response) => {
            //this.get('session').authenticate('simple-auth-authenticator:devise', {
            //  identification: data.email,
            //  password: data.password
            //});
            return this.send('registrationSucceeded', response);
          },
          (response) => {
            return this.send('registrationFailed', response);
          }
        );
      } else {
        this.set('formValid', false);
      }
    },
    registrationSucceeded(response) {
      this.set('isShowingModal', true);
      Ember.Logger.info(`Registration succeeded: account created with ID ${response.id}`);
    },
    registrationFailed(response) {
      this.set('apiErrors', response.errors);
      Ember.Logger.info('Registration failed:');
      response.errors.forEach(function(element /*, index*/) {
        Ember.Logger.info(element.detail.title);
      });
    },
    toggleModal() {
      this.set('isShowingModal', false);
      return this.transitionToRoute('index');
    }
  }
});
