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

  // var arrayOfAllTags = []
  // Machines.find().forEach(function(m) { m.tags.forEach(function(item, i, arr) { result.push(item) }); });

  arrayOfAllTags = _.reduce(_.map(Machines.find({}).fetch(),
    function(doc) {
      return doc.tags
    }),
    function(array1, array2){
      array1 = array1.concat(array2)
      return array1;
    });

  var machineNames = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: arrayOfAllTags
  });
  machineNames.initialize();

  $('.suggest').tagsinput({
    typeaheadjs: {
      name: 'machinenames',
      source: machineNames.ttAdapter()
    }
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
  },
  'click .save' : function (event) {
      FlowRouter.go('/set_schedule');
  }
});
