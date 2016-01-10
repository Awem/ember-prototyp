import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResponseHandlers from '../../mixins/response-handlers';
const { Route } = Ember;
const { PromiseObject } = DS;

export default Route.extend(AuthenticatedRouteMixin, ResponseHandlers, {
  model(params) {
    return this.store.findRecord('contribution', params.contribution_id, { reload: true });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('donationID', null);
    controller.set('payPalKey', null);
    this.controllerFor('contributions.donation').set('paymentStatus', null);
    this.controllerFor('contributions.donation').set('paymentSuccess', null);
    const data = {
      provider: 'paypal',
      contribution: model
    };
    const payment = PromiseObject.create({
      promise: this.store.createRecord('payment', data).save()
    });
    payment.then(
      (response) => {
        controller.set('donationID', payment.get('id'));
        controller.set('payPalKey', payment.get('paypal_key'));
        return this.send('actionSucceeded', response, 'prepared Payment');
      },
      (response) => {
        return this.send('actionFailed', response, 'creating');
      }
    );
  },
  actions: {
    abort() {
      //this.refresh(); //not working because of https://github.com/emberjs/ember.js/issues/12244
      this.controller.get('model').reload();
      this.controller.set('apiErrors', null);
      this.transitionTo('contributions');
    }
  }
});
