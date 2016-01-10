import Ember from 'ember';
const { $, Component, run } = Ember;

export default Component.extend({
  didInsertElement() {
    if(this.get('type') === 'input'){
      $('body').on('focusout', "#"+this.get("elementId")+" input", () => {
        this.send('doneEditing');
      });
    }else{
      $('body').on('focusout', "#"+this.get("elementId")+" textarea", () => {
        this.send('doneEditing');
      });
    }
    this.focus();
  },

  keyPress(event) {
    if(event.keyCode === 13){
      this.toggleProperty('isEditing');
      this.sendAction();
    }
  },

  mouseEnter() {
    $("#"+this.get("elementId")+" .edit").removeClass('hide');
  },

  mouseLeave() {
    $("#"+this.get("elementId")+" .edit").addClass('hide');
  },

  height: null,

  focus: function() {
    var _this = this;
    run.scheduleOnce('afterRender', this, function(){
      if(_this.get('isEditing')){
        if(_this.get('type') === 'input'){
          $("#"+_this.get("elementId")+" input").focus();
        }else{
          $("#"+_this.get("elementId")+" textarea").css('height', _this.get('height'));
          $("#"+this.get("elementId")+" textarea").focus();
        }
      }else{
        // Set height of editable div
        _this.set('height', $("#"+_this.get("elementId")).parent().css('height'));
      }
    });
  }.observes('isEditing'),

  isTypeInput: function(){
    return this.get('type') === "input";
  }.property('type'),

  displayPlaceholder: function(){
    var text = this.get('text');
    return text === undefined || text === null || text === "";
  }.property('text'),

  actions: {
    toggleEditing() {
      this.toggleProperty('isEditing');
    },
    doneEditing() {
      if(this.get('isEditing') === true){
        this.toggleProperty('isEditing');
        this.sendAction();
      }
    }
  }
});
