import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ResponseHandlers from '../../mixins/response-handlers';
const { Controller } = Ember;

export default Controller.extend(EmberValidations, ResponseHandlers, {
  formValid: true,
  validations: {
    name: {
      presence: {
        message: 'name required'
      },
      length: { minimum: 3 }
    }
  },
  actions: {
    createGroup() {
      const data = this.getProperties('name', 'description');
      const group = this.store.createRecord('group', data);
      const errors = this.get('errors');
      if (errors.name.length === 0) {
        this.set('formValid', true);
        group.save().then(
          (response) => {
            this.store.findRecord('group', parseInt(response.id), { reload: true }).then(() => {
              this.send("actionSucceeded", response, 'Group created');
              return this.transitionToRoute('groups.show', parseInt(response.id));
            });
          },
          (response) => {
            return this.send("actionFailed", response, 'creating');
          }
        );
      } else {
        this.set('formValid', false);
      }
    }
  }
});
