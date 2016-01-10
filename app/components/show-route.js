/* global L */
import Ember from 'ember';
import EmberLeafletComponent from 'ember-leaflet/components/leaflet-map';
import TileLayer from 'ember-leaflet/layers/tile';
const { service } = Ember.inject;

export default EmberLeafletComponent.extend({
  images: service(),
  routingOptions: Ember.computed('model', function () {
    const Plan = L.Routing.Plan.extend({});
    const images = this.get('images');
    const trip = this.get('trip');
    const editable = this.get('editable');
    const buttonClass = 'btn btn-success';
    return {
      position: 'topleft',
      routeWhileDragging: true,
      fitSelectedRoutes: true,
      collapsible: editable,
      collapseBtn: function(itinerary) {
        const collapseBtn = L.DomUtil.create('span', itinerary.options.collapseBtnClass);
        const button = L.DomUtil.create('button', `${buttonClass} shadowed`, collapseBtn);
        L.DomUtil.create('i', `${images.edit.string} collapse-button`, button);
        L.DomEvent.on(button, 'click', function(e){e.preventDefault();}, itinerary);
        L.DomEvent.on(collapseBtn, 'click', itinerary._toggle, itinerary);
        itinerary._container.insertBefore(collapseBtn, itinerary._container.firstChild);
      },
      collapseBtnClass: 'leaflet-routing-collapse-btn-custom',
      plan: new Plan(
        [
          trip.get('origin_loc'),
          trip.get('destination_loc')
        ],
        {
          geocoder: new L.Control.Geocoder.Nominatim(),
          addWaypoints: editable,
          draggableWaypoints: editable,
          geocodersClassName: 'form-group shadowed',
          addButtonClassName: `${buttonClass} add-waypoint ${images.add.string}`,
          geocoderPlaceholder: function (i, numberWaypoints) {
            return i === 0 ? 'Start' : (i < numberWaypoints - 1 ? 'Via ' + i : 'End');
          },
          geocoderClass: function (i, numberWaypoints) {
            return i === 0 ? 'form-control start' : (i < numberWaypoints - 1 ? 'form-control' : 'form-control end');
          },
          createGeocoder: function (i, numberWaypoints) {
            const waypointSymbol = (i === 0) ? images.origin.string : (i < numberWaypoints - 1 ? images.waypoint.string : images.destination.string);
            const container = L.DomUtil.create('div', 'input-group');
            const inputGroupAddon = L.DomUtil.create('span', 'input-group-addon', container);
            const input = L.DomUtil.create('input', '', container);
            let remove;
            L.DomUtil.create('i', waypointSymbol, inputGroupAddon);
            if (editable) {
              const buttons = L.DomUtil.create('span', 'input-group-btn', container);
              const locate = L.DomUtil.create('button', `${buttonClass}`, buttons);
              remove = L.DomUtil.create('button', `${buttonClass}`, buttons);
              L.DomUtil.create('i', images.marker.string, locate);
              L.DomUtil.create('i', images.delete.string, remove);
            } else {
              input.disabled = true;
              remove = false;
            }
            return {
              container: container,
              input: input,
              closeButton: remove
            };
          }
        }
      )
    };
  }),
  routingMachine: Ember.computed('routingOptions', function () {
    const editable = this.get('editable');
    const routingMachine = L.Routing.control(this.get('routingOptions'));
    if (editable) {
      routingMachine.on('routingstart', (/*e*/) => {
        if (typeof routingMachine._line !== 'undefined') {
          this.sendAction('newRoute', routingMachine.getWaypoints(), routingMachine._line._route);
        }
      });
      routingMachine.on('routesfound', (e) => {
        this.sendAction('newRoute', routingMachine.getWaypoints(), e.routes[0]);
      });
      routingMachine._plan.on('waypointgeocoded', (e) => {
        const destinationIndex = e.target._waypoints.length - 1;
        let waypointType;
        if (e.waypointIndex === 0) {
          waypointType = 'origin';
        } else if (e.waypointIndex === destinationIndex) {
          waypointType = 'destination';
        } else {
          waypointType = 'via';
        }
        this.sendAction('waypointGeocoded', waypointType, e.waypoint.name);
      });
    }
    return routingMachine;
  }),
  didCreateLayer: function () {
    this._super();
    this.get('routingMachine').addTo(this._layer);
    L.control.zoom({position: 'bottomright'}).addTo(this._layer);
    L.Control.geocoder({position: 'bottomleft'}).addTo(this._layer);
  },
  center: Ember.computed('trip.origin_loc', function () {
    return this.get('trip.origin_loc') || L.latLng(51.1793, 10.0195);
  }),
  zoom: 6,
  options: {
    zoomControl: false,
    attributionControl: false
  },
  childLayers: [
    TileLayer.extend({
      //tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      tileUrl: 'https://{s}.tiles.mapbox.com/v3/dennisl.4e2aab76/{z}/{x}/{y}.png',
      options: {
        attribution: ''
      }
    })
  ]
});
