import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('settings');
  this.route('users', function() {
    this.route('show', {path: ':user_id'});
    this.route('new');
    this.route('confirmation');
    this.route('password', function() {
      this.route('forgotten');
      this.route('edit');
    });
  });
  this.route('projects', function() {
    this.route('show', {path: ':project_id'});
  });
  this.route('matchers', function() {
    this.route('show', {path: ':matcher_id'});
  });
  this.route('groups', {}, function() {
    this.route('new', {});
    this.route('show', {path: ':group_id'});
    this.route('whole');
  });
  this.route('contributions', function() {
    this.route('show', {path: ':contribution_id'});
    this.route('new');
    this.route('donate', {path: ':contribution_id/donate'});
    this.route('donation', {path: ':contribution_id/donation'});
  });
});

export default Router;
