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
      var machineDescrVar = event.target.machineDescr.value;
      var machineAddressVar = event.target.machineAddress.value;
      var arrayOfTags = machineNameVar.split(',');
      var nameWithNoCommas = machineNameVar.replace(/,/g,"");
      var insertedMachineId = Machines.insert({
        name:    nameWithNoCommas,
        address: machineAddressVar,
        desc:    machineDescrVar,
        tags:    arrayOfTags
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
  }
