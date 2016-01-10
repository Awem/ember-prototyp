import Ember from 'ember';
import ResponseHandlers from '../../mixins/response-handlers';
import GroupActions from '../../mixins/group-actions';
const {
  Controller
} = Ember;

export default Controller.extend(ResponseHandlers, GroupActions, {
  isShowingMembershipModal: false,
  doomedMembership: null,
  actions: {
    groupEdited() {
      this.set('showSave', true);
    },
    clickJoin(group) {
      this.send('join', group);
    },
    clickLeave(group) {
      this.send('leave', group);
    },
    clickDestroy(group) {
      this.send('destroyDemanded', group);
    },
    acceptMember(membership) {
      const group = this.get('model');
      const user = membership.get('user.name');
      const affiliations = group.get('affiliations');
      membership.set('role', 'member');
      membership.save().then(
        () => {
          group.reload().then(() => {
            affiliations.reload().then(() => {
              return this.send('actionSucceeded', group, `User '${user}' added to group`);
            });
          });
        },
        (response) => {
          return this.send('actionFailed', response, 'adding');
        }
      );
    },
    rejectMember(membership) {
      const group = this.get('model');
      const user = membership.get('user.name');
      this.store.findRecord('membership', membership.id).then((membership) => {
        membership.destroyRecord().then(
          () => {
            group.reload().then(() => {
              return this.send('actionSucceeded', group, `User '${user}' rejected from group`);
            });
          },
          (response) => {
            return this.send('actionFailed', response, 'rejecting');
          }
        );
      });
    },
    expelDemanded(membership) {
      this.set('isShowingMembershipModal', true);
      this.set('doomedMembership', membership);
    },
    expelAborted() {
      this.set('isShowingMembershipModal', false);
      this.set('doomedMembership', null);
    },
    expelConfirmed() {
      const membership = this.get('doomedMembership');
      this.set('isShowingMembershipModal', false);
      this.set('doomedMembership', null);
      this.send('expelMember', membership);
    },
    expelMember(membership) {
      const group = this.get('model');
      const user = membership.get('user.name');
      this.store.findRecord('membership', membership.id).then((membership) => {
        membership.destroyRecord().then(
          () => {
            group.reload().then(() => {
              return this.send('actionSucceeded', group, `User '${user}' expelled from group`);
            });
          },
          (response) => {
            return this.send('actionFailed', response, 'expelling');
          }
        );
      });
    }
  }
});
