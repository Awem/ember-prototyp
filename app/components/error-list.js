import Ember from 'ember';

export default Ember.Component.extend({
  errors: [],
  alertClass: 'alert-warning',
  errorsHeading: 'Fehler:',
  messagePath: '',
  errorMessages: Ember.computed('errors', 'messagePath', function() {
    const errors = this.get('errors');
    const messagePath = this.get('messagePath');
    return errors.map(function(error) {
      return Ember.get(error, messagePath);
    });
  })
});
