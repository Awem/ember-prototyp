import Ember from 'ember';
import config from '../config/environment';

const sizeClassPrefix = 'size_';
const binaryAssets = config.APP.binaryAssets;

export default Ember.Service.extend({
  add: {
    icon: 'plus',
    size: sizeClassPrefix + (1),
    string: 'fa fa-plus fa-fw size_1'
  },
  app: {
    svg: 'assets/images/svgs/doppelherz.svg'
  },
  appHoriz: {
    svg: 'assets/images/svgs/logo_horizontal.svg'
  },
  appQuadrat: {
    svg: 'assets/images/svgs/logo_quadrat.svg'
  },
  checked: {
    icon: 'check',
    size: sizeClassPrefix + (1)
  },
  delete: {
    icon: 'times',
    size: sizeClassPrefix + (1),
    string: 'fa fa-times fa-fw size_1'
  },
  destination: {
    icon: 'crosshairs',
    size: sizeClassPrefix + (0),
    string: 'fa fa-crosshairs fa-fw size_0',
    svg: 'assets/images/svgs/fahne.svg'
  },
  down: {
    icon: 'angle-down',
    size: sizeClassPrefix + (0)
  },
  edit: {
    icon: 'pencil',
    size: sizeClassPrefix + (0),
    string: 'fa fa-pencil fa-fw'
  },
  empty: {
    icon: 'ban'
  },
  euro: {
    svg: 'assets/images/svgs/euro.svg'
  },
  group: {
    svg: 'assets/images/svgs/gruppe.svg'
  },
  groupLogoPath: `${binaryAssets}/`,
  groupLogoDefault: 'defaults/group.jpg',
  here: {
    icon: 'location-arrow',
    size: sizeClassPrefix + (0)
  },
  length: {
    icon: 'road',
    size: sizeClassPrefix + (0),
    svg: 'assets/images/svgs/km.svg'
  },
  marker: {
    icon: 'marker',
    size: sizeClassPrefix + (1),
    string: 'fa fa-map-marker fa-fw size_1'
  },
  matcher: {
    icon: 'gift',
    size: sizeClassPrefix + (2),
    string: 'fa fa-gift fa-fw',
    svg: 'assets/images/svgs/mal2.svg'
  },
  matcherLogoPath: `${binaryAssets}/`,
  matcherLogoDefault: 'defaults/matcher.png',
  multiplier: {
    icon: 'eur',
    size: sizeClassPrefix + (0)
  },
  next: {
    icon: 'arrow-circle-left',
    size: sizeClassPrefix + (0)
  },
  newTrip: {
    svg: 'assets/images/svgs/strasse_plus.svg'
  },
  origin: {
    icon: 'home',
    size: sizeClassPrefix + (0),
    string: 'fa fa-home fa-fw size_0',
    svg: 'assets/images/svgs/home.svg'
  },
  placeholder: {
    icon: 'file-image-o',
    size: sizeClassPrefix + (0)
  },
  previous: {
    icon: 'arrow-circle-right',
    size: sizeClassPrefix + (0)
  },
  project: {
    icon: 'heart',
    size: sizeClassPrefix + (0),
    string: 'fa fa-heart fa-fw',
    svg: 'assets/images/svgs/zielscheibe.svg'
  },
  projectLogoPath: `${binaryAssets}/`,
  projectLogoDefault: 'defaults/project.png',
  trip: {
    icon: 'tachometer',
    size: sizeClassPrefix + (1),
    svg: 'assets/images/svgs/strasse.svg'
  },
  up: {
    icon: 'angle-up',
    size: sizeClassPrefix + (0)
  },
  user: {
    icon: 'user',
    size: sizeClassPrefix + (0),
    svg: 'assets/images/svgs/id.svg'
  },
  userLogoPath: `${binaryAssets}/`,
  userLogoDefault: 'defaults/user.png',
  users: {
    icon: 'group',
    size: sizeClassPrefix + (-1)
  },
  waypoint: {
    icon: 'flag',
    size: sizeClassPrefix + (0),
    string: 'fa fa-flag fa-fw size_0'
  }
});
