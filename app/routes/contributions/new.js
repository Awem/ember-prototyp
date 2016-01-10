import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);
    const projectId = controller.get('projectId');
    const projects = DS.PromiseArray.create({
      promise: this.store.findAll('project')
    });
    controller.set('formType', 'trip');
    projects.then(function() {
      controller.set('projects', projects);
      controller.set('project', projects.findBy('id', projectId));
    });
  }
});
