import Ember from 'ember';
import config from '../config/environment';
import DS from 'ember-data';
const host = config.APP.host;
const namespace = config.APP.namespace;
const {
  $,
  Service,
  computed
} = Ember;

export default Service.extend({
  jsonData: computed(function() {
    const url = `${host}/${namespace}/globals`;
    return DS.PromiseObject.create({
      promise: $.getJSON(url)
    });
  })
});
