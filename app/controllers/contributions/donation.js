import Ember from 'ember';
const {
  Controller,
  inject
} = Ember;
const { service } = inject;

export default Controller.extend({
  account: service(),
  queryParams: ['donationID'],
  donationID: '',
  paymentStatus: null,
  paymentSuccess: null,
  actions: {
    toContributions() {
      const paymentSuccess = this.get('paymentSuccess');
      let contributionFilter = 'open';
      if (paymentSuccess) {
        contributionFilter = 'paid';
      }
      this.transitionToRoute('contributions', {queryParams: {contributionFilter: contributionFilter}});
    }
  }
});
