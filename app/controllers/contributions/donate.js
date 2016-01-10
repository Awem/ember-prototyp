import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  paypal: Ember.inject.service(),
  paypalUrl: config.APP.paypalUrl,
  actions: {
    payTrip() {
      const donationID = this.get('donationID');
      const paykey = this.get('payPalKey');
      const paypalUrl = this.get('paypalUrl');
      const paypal = this.get('paypal');
      const url = `${paypalUrl}${paykey}`;
      const callback = () => {
        return this.send('checkPayment', donationID);
      };
      return paypal.openMinibrowser(url, callback);
    },
    abortPayment() {
      const donationID = this.get('donationID');
      this.send('checkPayment', donationID);
    },
    checkPayment(donationID) {
      const contribution = this.get('model');
      this.transitionToRoute('contributions.donation', contribution, {queryParams: {donationID: donationID}});
    }
  }
});
