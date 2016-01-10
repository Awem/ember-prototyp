import Ember from 'ember';

export default Ember.Component.extend({
  progressStatus: Ember.computed('contribution.payment.matchingInfo', function() {
    const info = this.get('contribution.payment.matchingInfo');
    if (info === 'scheduled') {
      return '33';
    } else if (info === 'requested') {
      return '66';
    } else {
      return '100';
    }
  }),
  progressClass: Ember.computed('progressStatus', function() {
    switch(this.get('progressStatus')) {
      case '33':
        return 'progress-bar-warning';
      case '66':
        return 'progress-bar-info';
      case '100':
        return 'progress-bar-success';
      default:
        return 'progress-bar-success';
    }
  }),
  progressStyle: Ember.computed('progressStatus', function() {
    const width = this.get('progressStatus');
    return new Ember.Handlebars.SafeString(`width: ${width}%`);
  }),
  actions: {
    clickDelete(contribution) {
      this.sendAction('delete', contribution);
    }
  }
});
