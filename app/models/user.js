import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
    name: attr('string'),
    email: attr('string'),
    password: attr('string'),
    invite: attr('string'),
    total_km: attr('number'),
    total_don: attr('number'),
    contributions_count: attr('number'),
    contribution_visibility: attr('string'),
    profile_picture_url: attr('string'),
    profile_picture_name: attr('string'),
    trips: hasMany('trip', {async: true}),
    profilePictureExternal: computed('profile_picture_name', function() {
      if (typeof(this.get('profile_picture_name')) !== 'undefined') {
        const name = this.get('profile_picture_name');
        return name === 'gravatar';
      }
    })
});
