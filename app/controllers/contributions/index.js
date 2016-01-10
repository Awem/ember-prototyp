import Ember from 'ember';
import ResponseHandlers from '../../mixins/response-handlers';

export default Ember.Controller.extend(ResponseHandlers, {
  queryParams: ['contributionFilter'],
  contributionFilter: 'open',
  sortProperties: ['created_at:desc'],
  sortedContributions: Ember.computed.sort('filteredContributions', 'sortProperties'),
  filteredContributions: Ember.computed('model', 'contributionFilter', 'model.length', function() {// 'model.length' as workaround until new Ember data filter API is ready
    const contributions = this.get('model');
    const filter = this.get('contributionFilter');
    return contributions.filter(function(contribution) {
      switch (filter) {
        case 'open':
          return Ember.isEmpty(contribution.get('payment.id'));
        case 'paid':
          return !Ember.isEmpty(contribution.get('payment.id'));
        default:
          return true;
      }
    });
  }),
  buttonClasses: Ember.computed('contributionFilter', function() {
    const active = this.get('contributionFilter');
    const buttonClasses = {open: '', paid: '', all: ''};
    if (active !== '') {
      buttonClasses[active] = 'active';
    }
    return buttonClasses;
  }),
  actions: {
    setFilter(filter) {
      this.set('contributionFilter', filter);
    },
    deleteContribution(contribution) {
      contribution.deleteRecord();
      contribution.save().then(
        (response) => {
          return this.send("actionSucceeded", response, 'Deleted contribution');
        },
        (response) => {
          return this.send("actionFailed", response, 'Deleting contribution');
        }
      );
    }
  }
});
