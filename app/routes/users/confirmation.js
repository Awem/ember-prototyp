import Ember from 'ember';
import config from '../../config/environment';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
const { $, Route, Logger } = Ember;
const { info } = Logger;
const host = config.APP.host;

export default Route.extend(UnauthenticatedRouteMixin, {
  beforeModel(transition) {
    transition.send('confirmUser', transition.queryParams.confirmationToken);
  },
  actions:{
    confirmUser(confirmationToken) {
      const url = `${host}/users/confirmation?confirmation_token=${confirmationToken}`;
      return $.getJSON(url).then(
        (success) => {
          return this.send("confirmationSucceeded", success);
        },
        (failure) => {
          return this.send("confirmationFailed", failure);
        }
      );
    },
    confirmationSucceeded(success) {
      this.controller.set('confirmationSuccess', true);
      this.controller.set('confirmationErrors', null);
      info(`confirmation succeeded: User with ID ${success.user.id} confirmed`);
    },
    confirmationFailed(failure) {
      const errors = failure.responseJSON.errors;
      this.controller.set('confirmationSuccess', false);
      this.controller.set('confirmationErrors', errors);
      info('confirmation failed:');
      errors.forEach(function(element /*, index*/) {
        info(element.title);
      });
    }
  }
});
