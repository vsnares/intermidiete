Template.NewMachineName.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes')
  });
});

Template.NewMachineName.helpers({
  machines: ()=> {
    return Machines.find({});
  },
  routes: ()=> {
    return Routes.find({});
  }
});

Template.NewMachineName.events({
  'submit form': function(event, template) {
      event.preventDefault();
      var selected = template.findAll( "input[type=checkbox]:checked");
      var array = _.map(selected, function(item) {
        return item.defaultValue;
      });
      var machineNameVar = event.target.machineName.value;
      var arrayOfTags = machineNameVar.split(',');
      var nameWithNoCommas = machineNameVar.replace(/,/g,"");
      var insertedMachineId = Machines.insert({
        name: nameWithNoCommas
      });

      array.forEach(function(itemId, i, arr) {
        Routes.update(itemId, {
          $push: { machines: insertedMachineId },
        });
      });
      template.find("form").reset();
      $(".tag.label.label-info").remove();
  },

  'click .done' : function (event) {
      FlowRouter.go('/set_schedule');
  },

  'click .asign_to_route' : function (event) {
    Session.set('AsignToRouteMode', !Session.get('AsignToRouteMode'));
  }
});


Template.NewMachineName.rendered= function(){
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
