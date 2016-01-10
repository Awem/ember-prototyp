import Ember from 'ember';
const { Logger } = Ember;
const { info } = Logger;

export default Ember.Mixin.create({
  actions: {
    actionSucceeded(response, action, errorList = 'apiErrors') {
      const context = (typeof this.controller === 'undefined') ?  this : this.controller;
      context.set(errorList, null);
      info(`${action} with ID ${response.id}`);
    },
    actionFailed(response, action, errorList = 'apiErrors', messagePath = 'detail.title') {
      const context = (typeof this.controller === 'undefined') ?  this : this.controller;
      context.set(errorList, response.errors);
      info(`${action} failed:`);
      response.errors.forEach(function(element /*, index*/) {
        info(Ember.get(element, messagePath));
      });
    }
  }
});
