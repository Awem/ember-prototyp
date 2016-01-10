import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from '../../../config/environment';
const { $, Controller, Logger } = Ember;
const { info } = Logger;
const host = config.APP.host;

export default Controller.extend(EmberValidations, {
  queryParams: ['resetPasswordToken'],
  resetPasswordToken: '',
  formValid: true,
  resetSuccess: false,
  resetErrors: null,
  password: '',
  passwordConfirmation: '',
  validations: {
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
  requestData() {
    const { resetPasswordToken, password, passwordConfirmation } = this.getProperties('resetPasswordToken', 'password', 'passwordConfirmation');
    return { reset_password_token: resetPasswordToken, password: password, password_confirmation: passwordConfirmation };
  },
  actions:{
    resetPassword() {
      const data = this.requestData();
      const errors = this.get('errors');
      const url = `${host}/users/password`;
      if (errors.password.length + errors.passwordConfirmation.length === 0) {
        this.set('formValid', true);
        return $.ajax({url: url, type: 'PUT', data: data}).then(
          (success) => {
            return this.send("resetSucceeded", success);
          },
          (failure) => {
            return this.send("resetFailed", failure);
          }
        );
      } else {
        this.set('formValid', false);
      }
    },
    resetSucceeded(success) {
      this.set('resetSuccess', true);
      this.set('resetErrors', null);
      info(`reset succeeded: set new password for user with ID ${success.user.id}`);
    },
    resetFailed(failure) {
      const errors = failure.responseJSON.errors;
      this.set('resetSuccess', false);
      this.set('resetErrors', errors);
      info('reset failed:');
      errors.forEach(function(element /*, index*/) {
        info(element.title);
      });
    }
  }
});
