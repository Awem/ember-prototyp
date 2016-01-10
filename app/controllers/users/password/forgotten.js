import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingModal: false,
  actions: {
    toggleModal() {
      this.set('isShowingModal', false);
      return this.transitionToRoute('index');
    }
  }
});
