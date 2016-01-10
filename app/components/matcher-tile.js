import Ember from 'ember';

export default Ember.Component.extend({
  progressStatus: Ember.computed('matcher.total_budget', 'matcher.remaining_budget', function() {
    return this.get('matcher.remaining_budget') / this.get('matcher.total_budget') * 100;
  }),
  progressClass: Ember.computed('progressStatus', function() {
    const percent = this.get('progressStatus');
    if (percent > 50) {
      return 'progress-bar-success';
    }
    if (percent > 10) {
      return 'progress-bar-info';
    }
    if (percent > 0) {
      return 'progress-bar-warning';
    }
    return 'progress-bar-danger';
  }),
  progressStyle: Ember.computed('progressStatus', function() {
    const width = this.get('progressStatus');
    return new Ember.Handlebars.SafeString(`width: ${width}%`);
  })
});
