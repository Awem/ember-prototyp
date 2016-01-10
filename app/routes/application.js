import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  actions: {
    transitionToLoginRoute() {
      this.transitionTo('login');
    },
    transitionToRegistrationRoute() {
      this.transitionTo('users.new');
    }
  }
});
