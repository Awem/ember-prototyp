import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const {
  Route,
  Logger
} = Ember;
const { PromiseObject } = DS;

export default Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);
    const donationID = controller.get('donationID');
    const payment = PromiseObject.create({
      promise: this.store.findRecord('payment', donationID, { reload: true })
    });
    payment.then(function() {
      const status = payment.get('status');
      controller.set('paymentStatus', status);
      if (status === 'COMPLETED' || status === 'CLEARED' || status === 'PAID') {
        controller.set('paymentSuccess', true);
        controller.get('account').reloadUser();
      } else {
        controller.set('paymentSuccess', false);
      }
    }, function(error) {
      Logger.error("saving failed: ", error);
      controller.transitionTo('trips');
    });
  }
});
