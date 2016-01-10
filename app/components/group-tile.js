import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    clickJoin(group) {
      this.sendAction('join', group);
    },
    clickLeave(group) {
      this.sendAction('leave', group);
    },
    clickDestroy(group) {
      this.sendAction('destroyDemanded', group);
    }
  }
});
