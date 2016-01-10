/* global L */
import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  origin: DS.attr(),
  destination: DS.attr(),
  origin_lat: DS.attr(),
  origin_lng: DS.attr(),
  destination_lat: DS.attr(),
  destination_lng: DS.attr(),
  length: DS.attr('number'),
  multiplier: DS.attr('number'),
  created_at: DS.attr(),
  payment: DS.belongsTo('payment', {async: true}),
  origin_loc: Ember.computed('origin_lat', 'origin_lng', function() {
    var x = parseFloat(this.get('origin_lat'));
    var y = parseFloat(this.get('origin_lng'));
    return L.latLng(x, y);
  }),
  destination_loc: Ember.computed('destination_lat', 'destination_lng', function() {
    var x = parseFloat(this.get('destination_lat'));
    var y = parseFloat(this.get('destination_lng'));
    return L.latLng(x, y);
  })
});
