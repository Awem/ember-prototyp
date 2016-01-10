import Ember from 'ember';
import ResponseHandlers from '../../mixins/response-handlers';

export default Ember.Controller.extend(ResponseHandlers, {
  formType: 'trip',
  queryParams: ['projectId'],
  projectId: null,
  project: null,
  buttonClasses: Ember.computed('formType', function() {
    const active = this.get('formType');
    const buttonClasses = {trip: '', bare: ''};
    if (active !== '') {
      buttonClasses[active] = 'active';
    }
    return buttonClasses;
  }),
  actions: {
    setForm(form) {
      this.set('formType', form);
    },
    createContribution(contributionData, tripData) {
      const contribution = this.store.createRecord('contribution', contributionData);
      let trip;
      if (this.get('formType') === 'trip') {
        trip = this.store.createRecord('trip', tripData);
        contribution.set('trip', trip);
      }
      contribution.save().then(
        (response) => {
          this.send("actionSucceeded", response, 'Created contribution');
          return this.transitionToRoute('contributions');
        },
        (response) => {
          return this.send("actionFailed", response, 'Creating contribution');
        }
      );
    }
  }
});
