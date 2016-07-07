Template.NewWriter.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('writers')
  });
});

Template.NewWriter.helpers({
  machines: ()=> {
    return Machines.find({});
  }
});

Template.NewWriter.events({
  'submit form': function(event, template) {
      event.preventDefault();
      var selected = template.findAll( "input[type=checkbox]:checked");
      var array = _.map(selected, function(item) {
        return item.defaultValue;
      });
      var writerNameVar = event.target.writerName.value;
      Writers.insert({
        name: writerNameVar,
        machines: array
      });
      template.find("form").reset();
    }
});

Template.Writers.helpers({
  writerMachines: function(writerId) {
    return Machines.find({
      rmachines: {
        $in: [ writerId ]
      }
    });
  }
});
