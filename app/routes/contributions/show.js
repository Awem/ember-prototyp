import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController: function(controller, model) {
    this._super(controller, model);
    const projects = DS.PromiseArray.create({
      promise: this.store.findAll('project')
    });
    projects.then(function() {
      controller.set('projects', projects);
    });
  }
});
