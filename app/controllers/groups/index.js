import Ember from 'ember';
import ResponseHandlers from '../../mixins/response-handlers';
import GroupActions from '../../mixins/group-actions';
const {
  Controller,
  computed,
  inject
} = Ember;
const { service } = inject;

export default Controller.extend(ResponseHandlers, GroupActions, {
  globals: service(),
  queryParams: ['groupFilter'],
  groupFilter: 'all',
  sortProperties: ['total_don:desc'],
  sortedGroups: computed.sort('filteredGroups', 'sortProperties'),
  filteredGroups: computed('model', 'groupFilter', 'model.length', function() {// 'model.length' as workaround until new Ember data filter API is ready
    const groups = this.get('model');
    const filter = this.get('groupFilter');
    return groups.filter(function(group) {
      const status = group.get('membership_status');
      let roles;
      switch (filter) {
        case 'member':
          roles = ['founder', 'member'];
          return roles.indexOf(status) !== -1;
        case 'noMember':
          roles = ['possible', 'forbidden', 'pending'];
          return roles.indexOf(status) !== -1;
        default:
          return true;
      }
    });
  }),
  buttonClasses: computed('groupFilter', function() {
    const active = this.get('groupFilter');
    const buttonClasses = {member: '', noMember: '', all: ''};
    if (active !== '') {
      buttonClasses[active] = 'active';
    }
    return buttonClasses;
  }),
  actions: {
    setFilter(filter) {
      this.set('groupFilter', filter);
    }
  }
});
