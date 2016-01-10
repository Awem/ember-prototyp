/* global L */
import config from '../config/environment';

export function initialize(/* container, application */) {
  L.Icon.Default.imagePath = `${config.APP.staticAssets}assets/images`;
}

export default {
  name: 'leaflet-initializer',
  initialize: initialize
};
