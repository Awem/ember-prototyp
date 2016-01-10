import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    clickOkay: function () {
      this.sendAction('okay');
    }
  }
});
