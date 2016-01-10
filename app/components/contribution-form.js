import Ember from 'ember';
import moment from 'moment';
const { computed, inject, $ } = Ember;
const { reads } = computed;
const { service } = inject;

export default Ember.Component.extend({
  images: service(),
  title: computed('contribution.title', function() {
    if (typeof(this.get('contribution.title')) === "undefined") {
      const date = moment().format('DD.MM.YYYY');
      return `Spende vom ${date}`;
    } else {
      return this.get('contribution.title');
    }
  }),
  origin: reads('contribution.trip.origin'),
  origin_lat: reads('contribution.trip.origin_lat'),
  origin_lng: reads('contribution.trip.origin_lng'),
  destination: reads('contribution.trip.destination'),
  destination_lat: reads('contribution.trip.destination_lat'),
  destination_lng: reads('contribution.trip.destination_lng'),
  length: computed('contribution.trip.length', function() {
    if (typeof(this.get('contribution.trip.length')) === "undefined") {
      return 0;
    } else {
      return this.get('contribution.trip.length');
    }
  }),
  multiplier: reads('contribution.trip.multiplier'),
  project: reads('contribution.project'),
  matcher: reads('contribution.matcher'),
  updateMatcher: function () {
    // workaround ember-cli-selectize #93
    this.set('matcher', this.get('contribution.matcher'));
  }.observes('project.matching_partners'),
  amount: reads('contribution.amount'),
  tripSum: computed('length','multiplier', function() {
    const sum = (this.get('length') * this.get('multiplier'));
    if ($.isNumeric(sum)) {
      if (sum > 0) {
        return sum.toFixed(2);
      }
    }
    return false;
  }),
  formValid: computed('amount','tripSum', 'project', 'formType', function() {
    const formType = this.get('formType');
    return (formType === 'trip' && this.get('tripSum')) || (formType === 'bare' && this.get('amount') && this.get('project'));
  }),
  budgetExceeded: computed('amount','tripSum', 'matcher.remaining_budget', 'formType', function() {
    const formType = this.get('formType');
    let amount;
    if (formType === 'trip' && this.get('tripSum')) {
      amount = this.get('tripSum');
    }
    if (formType === 'bare' && this.get('amount')) {
      amount = this.get('amount');
    }
    if (amount) {
      return amount > this.get('matcher.remaining_budget');
    } else {
      return false;
    }
  }),
  projectList(data, escape) {
    const images = this.get('images');
    const project = data.data;
    const name = escape(project.get('name'));
    const logo = `<i class="${images.project.string}"/>`;
    return `<div>
      <span class="selectList">
        ${logo} ${name}
      </span>
    </div>`;
  },
  matcherList(data, escape) {
    const images = this.get('images');
    const project_id = this.get('project.id');
    const matcher = data.data;
    const factor = matcher.get('matching_factors')[project_id];
    const name = escape(matcher.get('name'));
    const logo = `<i class="${images.matcher.string}"/>`;
    const badge = `<span class="badge list">${factor}×</span>`;
    return `<div>
      <span class="selectList">
        ${logo} ${name} ${badge}
      </span>
    </div>`;
  },
  contributionData() {
    const formType = this.get('formType');
    if (formType === 'trip') {
      this.set('amount', this.get('tripSum'));
    }
    return this.getProperties('title', 'project', 'matcher', 'amount');
  },
  tripData() {
    return this.getProperties('origin', 'origin_lat', 'origin_lng', 'destination', 'destination_lat', 'destination_lng', 'length', 'multiplier');
  },
  keyPress(e) {
    if (e.keyCode === 13 && e.target.className.substring(0, 12) === 'form-control') {
      //prevent submit on route enter
      e.preventDefault();
      return false;
    }
    //if (e.keyCode === 13 && e.target.className === 'ember-view ember-text-field') {
    //  //prevent submit on title enter
    //  e.preventDefault();
    //  return false;
    //}
  },
  actions: {
    clickSave() {
      this.sendAction('save', this.contributionData(), this.tripData());
    },
    updateRoute(waypoints, route) {
      this.set('origin', waypoints.get('firstObject.name'));
      this.set('origin_lat', waypoints.get('firstObject.latLng.lat'));
      this.set('origin_lng', waypoints.get('firstObject.latLng.lng'));
      this.set('destination', waypoints.get('lastObject.name'));
      this.set('destination_lat', waypoints.get('lastObject.latLng.lat'));
      this.set('destination_lng', waypoints.get('lastObject.latLng.lng'));
      this.set('length', route.summary.totalDistance / 1000);
    },
    updateWaypoint(waypoint, value) {
      this.set(waypoint, value);
    }
  }
});
