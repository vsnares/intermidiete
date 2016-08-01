Template.SetDailyTicket.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes');
  });
});

Template.SetDailyTicket.rendered = function() {
  Meteor.typeahead.inject();
  $('#my-datepicker').datepicker({
    language: 'en'
  });
};


Template.SetDailyTicket.helpers({
  machine: function() {
    return Machines.find().fetch().map(function(it){ return it.name; });
  }
});

Template.SetDailyTicket.events({
  'submit form': function(event, template) {
      event.preventDefault();
      var machineNameVar = event.target.machineName.value;
      var moneyCollectedVar = event.target.moneyCollected.value;
      var dateInputVar = event.target.dateInput.value;
      var flattenedName = machineNameVar.replace(/,/g,"");

      Machines.findAndModify({
        query: { name: flattenedNameb },
        update: { $push: { daily_tickets: {amount: moneyCollectedVar, createdAt: new Date(dateInputVar)}}},
        upsert: true
      });
      template.find("form").reset();
  }

  // 'click .save' : function (event) {
  //     FlowRouter.go('/set_schedule');
  // }
});

Template.SetDailyTicket.rendered= function(){
    var machineNames = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: [{name:"Target"}, {name:"Backyard"}, {name:"Drinks"}]
    });
    machineNames.initialize();

    $('.suggest').tagsinput({
      typeaheadjs: {
        name: 'machinenames',
        displayKey: 'name',
        valueKey: 'name',
        source: machineNames.ttAdapter()
      }
    });
  }
