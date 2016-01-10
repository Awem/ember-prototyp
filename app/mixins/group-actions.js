import Ember from 'ember';

export default Ember.Mixin.create({
  isShowingGroupModal: false,
  doomedGroup: null,
  showSave: false,
  actions: {
    saveGroup(group) {
      group.save().then(
        (response) => {
          this.set('showSave', false);
          return this.send('actionSucceeded', response, 'saved Group');
        },
        (response) => {
          this.set('showSave', false);
          group.rollbackAttributes();
          return this.send('actionFailed', response, 'saving');
        }
      );
    },
    join(group) {
      const membership = this.store.createRecord('membership', {group: group});
      membership.save().then(
        () => {
          group.reload().then(() => {
            return this.send('actionSucceeded', group, 'joined Group');
          });
        },
        (response) => {
          return this.send('actionFailed', response, 'joining');
        }
      );
    },
    leave(group) {
      this.store.findRecord('membership', group.get('membership_with')).then((membership) => {
        membership.destroyRecord().then(
          () => {
            group.reload().then(() => {
              return this.send('actionSucceeded', group, 'left group');
            });
          },
          (response) => {
            return this.send('actionFailed', response, 'leaving');
          }
        );
      });
    },
    destroyDemanded(group) {
      this.set('isShowingGroupModal', true);
      this.set('doomedGroup', group);
    },
    destroyAborted() {
      this.set('isShowingGroupModal', false);
      this.set('doomedGroup', null);
    },
    destroyConfirmed() {
      const group = this.get('doomedGroup');
      this.set('isShowingGroupModal', false);
      this.set('doomedGroup', null);
      this.send('destroyGroup', group);
    },
    destroyGroup(group) {
      group.destroyRecord().then(
        (response) => {
          this.send('actionSucceeded', response, 'destroyed group');
          return this.transitionToRoute('groups');
        },
        (response) => {
          group.rollbackAttributes();
          return this.send('actionFailed', response, 'destroying');
        }
      );
    }
  }
});
