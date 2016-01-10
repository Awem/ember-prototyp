import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    const users = DS.PromiseArray.create({
      promise: this.store.query('user', {top: 5})
    });
    users.then(function() {
      controller.set('users', users);
    });
    const projects = DS.PromiseArray.create({
      promise: this.store.query('project', {featured: 'full'})
    });
    projects.then(function() {
      controller.set('projects', projects);
    });
    const matchers = DS.PromiseArray.create({
      promise: this.store.query('matcher', {featured: 'campaign'})
    });
    matchers.then(function() {
      controller.set('matchers', matchers);
    });
  }
});
