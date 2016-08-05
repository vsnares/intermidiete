Template.Machine.helpers({
  updateMachineId: function () {
    return this._id;
  }
});

Template.Machine.events({
  'click .toggle-menu' : function () {
    Meteor.call('toggleMenuItem', this._id, this.cheked);
  },
  'click .fa-trash' : function () {
    Meteor.call('deleteMachine', this._id);
  },
  'click .fa-pencil' : function () {
    Session.set('editMode', !Session.get('editMode'));
  }
});
