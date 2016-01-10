import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    clickPay: function () {
      this.sendAction('pay');
    },
    clickNo: function () {
      this.sendAction('abort');
    }
  }
});
