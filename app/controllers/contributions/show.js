import Ember from 'ember';
import ResponseHandlers from '../../mixins/response-handlers';

export default Ember.Controller.extend(ResponseHandlers, {
  actions: {
    updateContribution(contributionData, tripData) {
      const contribution = this.model;
      contribution.setProperties(contributionData);
      if (contribution.get('trip.id')) {
        contribution.get('trip').setProperties(tripData);
      }
      contribution.save().then(
        (response) => {
          this.send("actionSucceeded", response, 'Updated contribution');
          return this.transitionToRoute('contributions');
        },
        (response) => {
          return this.send("actionFailed", response, 'Updating contribution');
        }
      );
    }
  }
});
