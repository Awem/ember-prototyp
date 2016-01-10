import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ResponseHandlers from '../mixins/response-handlers';

export default Ember.Controller.extend(EmberValidations, ResponseHandlers, {
  formValid: true,
  passwordChanged: false,
  password: '',
  passwordConfirmation: '',
  validations: {
    'model.name': {
      presence: true,
      length: {
        minimum: 2,
        maximum: 50
      }
    },
    'model.email': {
      presence: true,
      length: { minimum: 5 },
      format: { with: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, allowBlank: true, message: 'must be a valid email' }
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
    }
  },
  actions: {
    passwordEntered() {
      this.set('passwordChanged', true);
    },
    saveSettings() {
      const errors = this.get('errors');
      const passwordChanged = this.get('passwordChanged');
      const user = this.model;
      const name = this.get('model.name');
      const email = this.get('model.email');
      const password = this.get('password');
      const contributionVisibility = this.get('model.contribution_visibility');
      const data = {name: name, email: email, contribution_visibility: contributionVisibility};
      if (errors.model.name.length + errors.model.email.length === 0) {
        this.set('formValid', true);
      } else {
        this.set('formValid', false);
      }
      if (passwordChanged) {
        if (errors.password.length + errors.passwordConfirmation.length === 0) {
          this.set('formValid', true);
          data.password = password;
        } else {
          this.set('formValid', false);
        }
      }
      if (this.get('formValid')) {
        user.setProperties(data);
        user.save().then(
          (response) => {
            return this.send('actionSucceeded', response, 'saving succeeded: updated User');
          },
          (response) => {
            return this.send('actionFailed', response, 'saving');
          }
        );
      }
    }
  }
});
