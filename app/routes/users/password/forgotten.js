import Ember from 'ember';
import config from '../../../config/environment';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
const { $, Route, Logger } = Ember;
const { info } = Logger;
const host = config.APP.host;

export default Route.extend(UnauthenticatedRouteMixin, {
  formData() {
    return this.controller.getProperties('email');
  },
  actions:{
    requestInstructions() {
      const data = this.formData();
      const url = `${host}/users/password`;
      return $.post(url, data).then(
        (success) => {
          return this.send("requestSucceeded", success);
        },
        (failure) => {
          return this.send("requestFailed", failure);
        }
      );
    },
    requestSucceeded(/*success*/) {
      this.controller.set('requestErrors', null);
      this.controller.set('isShowingModal', true);
    },
    requestFailed(/*failure*/) {
      const errors = [{title: 'Anfrage wurde nicht empfangen. Bitte überprüfe Deine Internetverbindung'}];
      this.controller.set('requestErrors', errors);
      info('request failed:');
      errors.forEach(function(element /*, index*/) {
        info(element.title);
      });
    }
  }
});
