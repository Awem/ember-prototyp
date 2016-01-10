import Ember from 'ember';
import Settings from 'dryw-ember/models/settings';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  queryParams: ['slide'],
  slide: null,
  settings: Settings.create(),
  showStartScreen: Ember.computed('currentPath', 'settings.startScreenSeen','session.isAuthenticated', function() {
    const index = (this.get('currentPath') === 'index');
    const startScreenSeen = this.get('settings.startScreenSeen');
    const isAuthenticated = this.get('session.isAuthenticated');
    return index && !(startScreenSeen || isAuthenticated);
  }),
  actions: {
    hideStartScreen() {
      this.set('settings.startScreenSeen', true);
      this.set('slide', null);
    },
    goToLogin() {
      this.send('hideStartScreen');
      this.send('transitionToLoginRoute');
    },
    registerAccount() {
      this.send('hideStartScreen');
      this.send('transitionToRegistrationRoute');
    }
  }
});
